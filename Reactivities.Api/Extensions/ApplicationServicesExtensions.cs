using MediatR;
using Microsoft.EntityFrameworkCore;
using Reactivities.Application.Activities;
using Reactivities.Application.Core;
using Reactivities.Persistence;

namespace Reactivities.Api.Extensions
{
    public static class ApplicationServicesExtensions
    {

        public static IServiceCollection AddApplicationServices(this IServiceCollection services,IConfiguration configuration)
        {

            // Add services to the container.

            services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddDbContext<ReactivitiesContext>(opt =>
            {

                opt.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
            });


            // Registering Cors Policy
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                });
            });

            // Registering Mediator
            services.AddMediatR(typeof(List.Handler));
            // Registering AutoMapper
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);


            return services;
        }
    }
}
