using TravelPlannerApp.Controllers;
using TravelPlannerApp.Models;

namespace TravelPlannerApp.Dto
{
    public class AiPlanDto
    {
        public string? Name { get; set; }
        public List<string> Countries { get; set; }
        public string Username { get; set; }

    }
}
