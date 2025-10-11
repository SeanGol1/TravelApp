namespace TravelPlannerApp.Data
{
    public interface IFunctionRepo
    {
        public bool PlanCodeExists(int id);
        public int GenerateId();
    }
}
