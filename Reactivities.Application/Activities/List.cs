using Reactivities.Domain;
using MediatR;
using Reactivities.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Reactivities.Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<Activity>>
        {

        }

        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly ReactivitiesContext _context;


            public Handler(ReactivitiesContext reactivitiesContext)
            {
                _context = reactivitiesContext;
            }

            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities.ToListAsync();
            }
        }
    }
}
