namespace TravelPlannerApp.Models
{
    public class ToDo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Country Country { get; set; }
        public City City { get; set; }
    }
}
