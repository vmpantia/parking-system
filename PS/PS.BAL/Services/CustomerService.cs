using AutoMapper;
using PS.BAL.Contractors;
using PS.BAL.CustomExceptions;
using PS.BAL.Models;
using PS.DAL.Contractors;
using PS.DAL.Database.Entities;

namespace PS.BAL.Services
{
    public class CustomerService : IService<CustomerDTO>
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        public CustomerService(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        public IEnumerable<CustomerDTO> GetAll()
        {
            var result = _uow.CustomerRepository.GetAll().OrderBy(data => data.LastName);
            return _mapper.Map<IEnumerable<CustomerDTO>>(result);
        }

        public IEnumerable<CustomerDTO> GetByQuery(string query)
        {
            var result = _uow.CustomerRepository.GetByExpression(data => data.FirstName == query ||
                                                                         data.MiddleName == query ||
                                                                         data.LastName == query ||
                                                                         data.ContactNo == query ||
                                                                         data.Email == query);
            return _mapper.Map<IEnumerable<CustomerDTO>>(result);
        }

        public CustomerDTO GetByID(Guid internalID)
        {
            var result = _uow.CustomerRepository.GetByID(internalID);
            return _mapper.Map<CustomerDTO>(result);
        }

        public async Task SaveDataAsync(CustomerDTO inputCustomer)
        {
            if (inputCustomer == null)
                throw new BALException("Customer must have values, Please try again.");

            var isAdd = inputCustomer.InternalID == Guid.Empty;
            var customer = _mapper.Map<Customer>(inputCustomer);

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

        public async Task DeleteDataAsync(CustomerDTO inputCustomer)
        {
            var customer = _mapper.Map<Customer>(inputCustomer);
            _uow.CustomerRepository.Delete(customer);
            await _uow.SaveChangesAsync();
        }
    }
}
