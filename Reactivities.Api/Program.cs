using Reactivities.Persistence;
using Microsoft.EntityFrameworkCore;
using Reactivities.Api.Extensions;

var builder = WebApplication.CreateBuilder(args);



// Application Services Wrapper
builder.Services.AddApplicationServices(builder.Configuration);



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("CorsPolicy");
app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<ReactivitiesContext>();
    context.Database.Migrate();
    await Seed.SeedData(context);
}

catch(Exception e)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(e, "An error ocurred");

}

app.Run();
