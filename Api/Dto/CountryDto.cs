namespace TravelPlannerApp.Dto
{

    public class CreateCountryDto
    {
        public string Name { get; set; } = string.Empty;
        public int PlanId { get; set; }
        public DateTime? StartDate { get; set; } = null;
        public DateTime? EndDate { get; set; } = null;
        public int SortOrder { get; set; }
    }

    public class UpdateCountryDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int SortOrder { get; set; }
    }
}
