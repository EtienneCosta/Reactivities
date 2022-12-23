using MediatR;
using Reactivities.Persistence;

namespace Reactivities.Application.Activities
{
    public class Delete
    {

        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly ReactivitiesContext _context;

            public Handler(ReactivitiesContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);

                if (activity != null)
                {
                    _context.Activities.Remove(activity);
                    await _context.SaveChangesAsync();  
                }

                return Unit.Value;
            }
        }
    }
}
