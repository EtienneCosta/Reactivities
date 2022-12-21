using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Reactivities.Domain;
using Reactivities.Persistence;

namespace Reactivities.Api.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly ReactivitiesContext _context;

        public ActivitiesController(ReactivitiesContext context)
        {
            _context = context; 
        }


        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await _context.Activities.ToListAsync();

        }


    }
}
