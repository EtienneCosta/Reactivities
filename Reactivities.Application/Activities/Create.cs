using MediatR;
using Reactivities.Domain;
using Reactivities.Persistence;

namespace Reactivities.Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly ReactivitiesContext _context;

            public Handler(ReactivitiesContext reactivitiesContext)
            {
                _context = reactivitiesContext;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                request.Activity.Id = Guid.NewGuid();
                request.Activity.Date = DateTime.UtcNow;

                 await _context.Activities.AddAsync(request.Activity);
                 await _context.SaveChangesAsync(); 
                return Unit.Value;    
            }
        }



    }
}


