using PS.DAL.Database.Entities;

namespace PS.DAL.Contractors
{
    public interface IUnitOfWork
    {
        IGenericRepository<Customer> CustomerRepository { get; }
        IGenericRepository<Car> CarRepository { get; }
        Task SaveChangesAsync();
    }
}