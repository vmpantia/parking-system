using Microsoft.AspNetCore.Mvc;

namespace PS.Web.Contractors
{
    public class BaseController : ControllerBase
    {
        protected readonly ILogger<BaseController> _logger;
        public BaseController(ILogger<BaseController> logger)
        {
            _logger = logger;
        }

        public IActionResult OkResult(object data)
        {
            _logger.LogInformation("Request has been processed successfully");
            return Ok(data);
        }

        public IActionResult OkResult(string message)
        {
            _logger.LogInformation("Request has been processed successfully");
            return Ok(message);
        }

        public IActionResult ErrorResult(Exception exception)
        {
            _logger.LogError(exception.StackTrace);
            return BadRequest(exception.Message);
        }
    }
}
