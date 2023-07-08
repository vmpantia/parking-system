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
        private readonly IService<CustomerDTO> _customer;
        public CustomerController(ILogger<BaseController> logger, IService<CustomerDTO> customer) : base(logger)
        {
            _customer = customer;
        }

        [HttpGet("GetCustomers")]
        public IActionResult GetCustomers()
        {
            try
            {
                var result = _customer.GetAll();
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
                var result = _customer.GetByQuery(query);
                return OkResult(result);
            }
            catch (Exception ex)
            {
                return ErrorResult(ex);
            }
        }

        [HttpGet("GetCustomerByID")]
        public IActionResult GetCustomersByQuery([FromQuery] Guid internalID)
        {
            try
            {
                var result = _customer.GetByID(internalID);
                return OkResult(result);
            }
            catch (Exception ex)
            {
                return ErrorResult(ex);
            }
        }

        [HttpPost("SaveCustomer")]
        public async Task<IActionResult> SaveCustomerAsync([FromForm] CustomerDTO inputCustomer)
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
        public async Task<IActionResult> DeleteCustomerAsync([FromForm] CustomerDTO inputCustomer)
        {
            try
            {
                await _customer.DeleteDataAsync(inputCustomer);
                return OkResult("Your request has been process successfully!");
            }
            catch (Exception ex)
            {
                return ErrorResult(ex);
            }
        }
    }
}
