using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Reactivities.Api.Controllers
{
    [ApiController]
    [Route("reactivities/api/[controller]/[action]")]
    public class BaseApiController : ControllerBase
    {
        private IMediator _mediator;
        protected IMediator Mediator => _mediator ?? HttpContext.RequestServices.GetService<IMediator>();


    }
}
