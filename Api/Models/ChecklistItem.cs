namespace TravelPlannerApp.Models
{
    public class ChecklistItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Completed { get; set; }
        public Country Country { get; set; }

    }
}
