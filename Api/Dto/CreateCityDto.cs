using TravelPlannerApp.Models;

namespace TravelPlannerApp.Dto
{
    public class CreateCityDto
    {
        public string Name { get; set; }
        public int CountryId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
