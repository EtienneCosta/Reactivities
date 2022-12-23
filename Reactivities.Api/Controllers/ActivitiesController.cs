using Microsoft.AspNetCore.Mvc;
using Reactivities.Application.Activities;
using Reactivities.Domain;

namespace Reactivities.Api.Controllers
{
    public class ActivitiesController : BaseApiController
    {



        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List()
        {
            return await Mediator.Send(new List.Query());

        }


        [HttpGet("{Id}")]
        public async Task<ActionResult<Activity>> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });

        }

        [HttpPost]
        public async Task<IActionResult> Create(Activity activity)
        {
            return Ok( await Mediator.Send(new Create.Command { Activity=activity}));
        }


        [HttpPut("{Id}")]
        public async Task<IActionResult> Update(Guid id,Activity activity)
        {
            activity.Id = id;   
            return Ok (await Mediator.Send(new Edit.Command { Activity = activity }));

        }


        [HttpDelete("{Id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));

        }

    }
}
