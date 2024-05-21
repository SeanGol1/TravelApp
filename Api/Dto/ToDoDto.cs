namespace TravelPlannerApp.Dto
{
    public class CreateToDoDto
    {
        public string Name { get; set; }
        public int PlanId { get; set; }
        public int CountryId { get; set; }
        public int CityId { get; set; }
        public int SortOrder { get; set; }
    }

    public class UpdateToDoDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        //public int PlanId { get; set; }
        //public int CountryId { get; set; }
        public int CityId { get; set; }
        public int SortOrder { get; set; }
    }
}
