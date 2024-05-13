namespace TravelPlannerApp.Models
{
    public class Plan
    {
        public int Id { get; set; }
        public string PlanName { get; set; } = string.Empty;
        public List<Country> Countries { get; set; }
        public int JoinCode { get; set; }
    }
}
