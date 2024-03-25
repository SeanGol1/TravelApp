using TravelPlannerApp.Models;

namespace TravelPlannerApp.Dto
{
    public class CreateCountryDto
    {
        public string Name { get; set; } = string.Empty;
        public int PlanId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
