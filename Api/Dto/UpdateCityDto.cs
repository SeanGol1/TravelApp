namespace TravelPlannerApp.Dto
{
    public class UpdateCityDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CountryId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int SortOrder { get; set; }

    }
}
