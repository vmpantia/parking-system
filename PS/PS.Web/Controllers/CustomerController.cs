using Microsoft.AspNetCore.Mvc;
using PS.BAL.Contractors;
using PS.BAL.Models;
using PS.Web.Contractors;

namespace PS.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : BaseController
    {
        private readonly IService _customer;
        public CustomerController(ILogger<BaseController> logger, IService customer) : base(logger)
        {
            _customer = customer;
        }

        [HttpGet("GetCustomers")]
        public IActionResult GetCustomers()
        {
            try
            {
                var result = _customer.GetAll<CustomerDTO>();
                return OkResult(result);
            }
            catch (Exception ex) {
                return ErrorResult(ex);
            }
        }

        [HttpGet("GetCustomersByQuery")]
        public IActionResult GetCustomersByQuery([FromQuery]string query)
        {
            try
            {
                var result = _customer.GetByQuery<CustomerDTO>(query);
                return OkResult(result);
            }
            catch (Exception ex)
            {
                return ErrorResult(ex);
            }
        }

        [HttpGet("GetCustomerByID")]
        public IActionResult GetCustomerByID([FromQuery] Guid id)
        {
            try
            {
                var result = _customer.GetByID<SaveCustomerDto>(id);
                return OkResult(result);
            }
            catch (Exception ex)
            {
                return ErrorResult(ex);
            }
        }

        [HttpPost("SaveCustomer")]
        public async Task<IActionResult> SaveCustomerAsync(SaveCustomerDto inputCustomer)
        {
            try
            {
                await _customer.SaveDataAsync(inputCustomer);
                return OkResult("Your request has been process successfully!");
            }
            catch (Exception ex)
            {
                return ErrorResult(ex);
            }
        }

        [HttpPost("DeleteCustomer")]
        public async Task<IActionResult> DeleteCustomerAsync([FromQuery] Guid id)
        {
            try
            {
                await _customer.DeleteDataByIDAsync(id);
                return OkResult("Your request has been process successfully!");
            }
            catch (Exception ex)
            {
                return ErrorResult(ex);
            }
        }
    }
}
