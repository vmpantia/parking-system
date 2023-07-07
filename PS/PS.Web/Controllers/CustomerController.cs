using Microsoft.AspNetCore.Mvc;
using PS.BAL.Services;
using PS.Web.Contractors;

namespace PS.Web.Controllers
{
    public class CustomerController : BaseController
    {
        private readonly CustomerService _customer;
        public CustomerController(ILogger<BaseController> logger, CustomerService customer) : base(logger)
        {
            _customer = customer;
        }

        public IActionResult GetCustomers()
        {
            try
            {
                var result = _customer.GetCustomers();
                return OkResult("Your request has been process successfully!", result);
            }
            catch (Exception ex) {
                return ErrorResult(ex);
            }
        }
    }
}
