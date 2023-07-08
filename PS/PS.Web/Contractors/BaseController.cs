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

        public IActionResult OkResult(string message, object data)
        {
            _logger.LogInformation(message);
            return Ok(new { Message = message, Data = data });
        }

        public IActionResult OkResult(string message)
        {
            _logger.LogInformation(message);
            return Ok(new { Message = message });
        }

        public IActionResult ErrorResult(Exception exception)
        {
            _logger.LogError(exception.StackTrace);
            return BadRequest(exception.Message);
        }
    }
}
