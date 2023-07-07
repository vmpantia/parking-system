using AutoMapper;
using PS.BAL.Models;
using PS.DAL.Contractors;

namespace PS.BAL.Services
{
    public class CustomerService
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        public CustomerService(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        public IEnumerable<CustomerDTO> GetCustomers()
        {
            var result = _uow.CustomerRepository.GetAll();
            return _mapper.Map<IEnumerable<CustomerDTO>>(result);
        }
    }
}
