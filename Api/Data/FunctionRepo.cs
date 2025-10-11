using TravelPlannerApp.Models;

namespace TravelPlannerApp.Data
{
    public class FunctionRepo : IFunctionRepo
    {
        private readonly TravelPlannerAppContext context;

        public FunctionRepo(TravelPlannerAppContext _DbContext)
        {
            this.context = _DbContext;
        }
        public bool PlanCodeExists(int id)
        {
            Plan plan = context.Plan.Where(p => p.JoinCode == id).FirstOrDefault();

            return plan == null ? false : true;
        }

        public int GenerateId()
        {
            int id = 0;
            Random r = new Random();
            id = r.Next(100000, 999999);
            return id;
        }
    }
}
