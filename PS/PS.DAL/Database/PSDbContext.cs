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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Car>()
                .HasOne<Customer>(o => o.Customer)
                .WithMany(c => c.Cars)
                .HasForeignKey(o => o.CustomerID);
        }
    }
}
