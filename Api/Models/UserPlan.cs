namespace TravelPlannerApp.Models
{
    public class UserPlan
    {
        public int Id { get; set; }
        public User User { get; set; }
        public Plan Plan { get; set; }
        public bool IsAdmin { get; set; } = false;
    }
}
