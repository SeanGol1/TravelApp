namespace TravelPlannerApp.Dto
{
    public class UpdateChecklistItemDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CountryId { get; set; }
        public bool Completed { get; set; }
    }
}
