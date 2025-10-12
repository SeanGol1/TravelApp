using TravelPlannerApp.Models;

namespace TravelPlannerApp.Dto
{
    public class CreateCityDto
    {
        public string Name { get; set; }
        public int CountryId { get; set; }
        public DateOnly? StartDate { get; set; }
        public DateOnly? EndDate { get; set; }
        public int SortOrder { get; set; }
    }
    public class UpdateCityDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CountryId { get; set; }
        public DateOnly? StartDate { get; set; }
        public DateOnly? EndDate { get; set; }
        public int SortOrder { get; set; }

    }

    public class GooglePhotoResult
    {
        public Stream Stream { get; set; }
        public string ContentType { get; set; }
    }

    public class CityDetailsDto
    {
        public RefCity RefCity { get; set; }
        public IEnumerable<RefCityAttractions> RefCityAttractions { get; set; }

    }
}
