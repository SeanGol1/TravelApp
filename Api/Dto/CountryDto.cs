namespace TravelPlannerApp.Dto
{

    public class CreateCountryDto
    {
        public string Name { get; set; } = string.Empty;
        public int PlanId { get; set; }
        public DateOnly? StartDate { get; set; } = null;
        public DateOnly? EndDate { get; set; } = null;
        public int SortOrder { get; set; }
    }

    public class UpdateCountryDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public DateOnly? StartDate { get; set; }
        public DateOnly? EndDate { get; set; }
        public int SortOrder { get; set; }
    }
}
