using Microsoft.EntityFrameworkCore;
using Reactivities.Domain;

namespace Reactivities.Persistence
{
    public class ReactivitiesContext : DbContext
    {
        public ReactivitiesContext(DbContextOptions options) : base(options)
        {

        }

        // Represents the table inside our database
        public DbSet<Activity> Activities { get; set; }
    }
}
