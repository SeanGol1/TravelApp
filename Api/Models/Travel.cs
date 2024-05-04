namespace TravelPlannerApp.Models
{
    public enum TravelType
    {
        Flight,
        Bus,
        Train,
        Boat,
        Scooter,
        Walk,
        Taxi
    }
    public class Travel
    {
        public int Id { get; set; }
        public TravelType TravelType { get; set; }
        public DateTime Date { get; set; }
        public City FromCity { get; set; }
        public City? ToCity { get; set; }
    }
}
