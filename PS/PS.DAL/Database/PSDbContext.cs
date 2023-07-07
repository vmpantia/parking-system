using Microsoft.EntityFrameworkCore;
using PS.DAL.Database.Entities;

namespace PS.DAL.Database
{
    public class PSDbContext : DbContext
    {
        public PSDbContext(DbContextOptions options) : base(options)
        { }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Car> Cars { get; set; }
    }
}
