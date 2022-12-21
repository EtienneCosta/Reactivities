using Reactivities.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reactivities.Persistence
{
    public class Seed
    {
        public static async Task SeedData(ReactivitiesContext context)
        {
            if (!context.Activities.Any())
            {
               List<Activity> activities = new List<Activity>()
               {
                   new Activity() {
                    Id= Guid.NewGuid(),
                    Title="Play Football",
                    Date= DateTime.UtcNow.AddDays(1), 
                    Description="Have fun playing football",
                    Category = "Sport",
                    City = "Lisbon",
                    Venue="Estádio da Luz"
                   },
                   new Activity() {
                    Id= Guid.NewGuid(),
                    Title="Play Football",
                    Date= DateTime.Now,
                    Description="Have fun playing football",
                    Category = "Sport",
                    City = "Lisbon",
                    Venue="Cidadela"
                   },
                   new Activity() {
                       Id = Guid.NewGuid(), 
                       Title = "Play Football", 
                       Date = DateTime.UtcNow.AddDays(10), 
                       Description = "Have fun playing football", 
                       Category = "Sport", 
                       City = "Lisbon",
                       Venue = "Estádio da Luz"}, 
                   new Activity() {
                       Id = Guid.NewGuid(), 
                       Title = "Play Football", 
                       Date = DateTime.UtcNow.AddMonths(13), 
                       Description = "Have fun playing football", 
                       Category = "Sport", 
                       City = "Porto", 
                       Venue = "Estádio do Dragão"}

               };
                await context.AddRangeAsync(activities);
                await context.SaveChangesAsync();



            }
        }
    }
}
