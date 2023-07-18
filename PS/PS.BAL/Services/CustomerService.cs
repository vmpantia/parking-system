using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PS.BAL.Contractors;
using PS.BAL.CustomExceptions;
using PS.DAL.Contractors;
using PS.DAL.Database.Entities;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace PS.BAL.Services
{
    public class CustomerService : IService
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        public CustomerService(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        public IEnumerable<T> GetAll<T>()
        {
            var result = _uow.CustomerRepository.Table
                .Include(data => data.Cars)
                .OrderBy(data => data.LastName);
            return _mapper.Map<IEnumerable<T>>(result);
        }

        public IEnumerable<T> GetByQuery<T>(string query)
        {
            var result = _uow.CustomerRepository.Table
                .Where(data => data.FirstName == query ||  data.MiddleName == query || data.LastName == query ||
                               data.ContactNo == query || data.Email == query)
                .Include(data => data.Cars);
            return _mapper.Map<IEnumerable<T>>(result);
        }

        public T GetByID<T>(Guid id)
        {
            var result = _uow.CustomerRepository.Table
                .Where(data => data.ID == id)
                .Include(data => data.Cars)
                .FirstOrDefault();
            return _mapper.Map<T>(result);
        }

        public async Task SaveDataAsync<T>(T inputData)
        {
            if (inputData == null)
                throw new BALException("Customer must have values, Please try again.");

            var customer = _mapper.Map<Customer>(inputData);
            var isAdd = customer.ID == Guid.Empty;

            if (isAdd) /*Add new information*/
            {
                customer.CreatedBy = Guid.Empty; //TBD
                customer.CreatedDate = DateTime.Now;
                customer.ModifiedBy = null;
                customer.ModifiedDate = null;
                _uow.CustomerRepository.Add(customer);
            }
            else /*Update existing information*/
            {
                customer.ModifiedBy = Guid.Empty; //TBD
                customer.ModifiedDate = DateTime.Now;
                _uow.CustomerRepository.Update(customer);
            }

            await _uow.SaveChangesAsync();
        }

        public async Task DeleteDataByIDAsync(Guid id)
        {
            var customer = _uow.CustomerRepository.GetByID(id);

            //Delete Customer
            _uow.CustomerRepository.Delete(customer);

            //Delete Customer Cars
            var cars = _uow.CarRepository.GetByExpression(data => data.CustomerID == customer.ID);
            foreach(var car in cars)
            {
                _uow.CarRepository.Delete(car);
            }

            await _uow.SaveChangesAsync();
        }
    }
}
