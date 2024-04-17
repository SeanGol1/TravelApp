using TravelPlannerApp.Models;

namespace TravelPlannerApp.Dto
{
    public class CreateTravelDto
    {
        public TravelType TravelType { get; set; }
        public DateTime Date { get; set; }
        public int FromCity { get; set; }
        public int ToCity { get; set; }
    }
}
