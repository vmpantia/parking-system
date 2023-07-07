using PS.DAL.Contractors;
using PS.DAL.CustomExceptions;
using PS.DAL.Database;
using PS.DAL.Database.Entities;

namespace PS.DAL.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly PSDbContext _context;
        private IGenericRepository<Customer> _customerRepo;
        private IGenericRepository<Car> _carRepo;
        public UnitOfWork(PSDbContext context) => _context = context;

        public IGenericRepository<Customer> CustomerRepository
        {
            get
            {
                if (_customerRepo == null)
                    _customerRepo = new GenericRepository<Customer>(_context);

                return _customerRepo;
            }
        }

        public IGenericRepository<Car> CarRepository
        {
            get
            {
                if (_carRepo == null)
                    _carRepo = new GenericRepository<Car>(_context);

                return _carRepo;
            }
        }

        public async Task SaveChangesAsync()
        {
            var result = await _context.SaveChangesAsync();
            if (result <= 0)
                throw new DALException("Error in saving your transaction. Please try again.");
        }
    }
}
