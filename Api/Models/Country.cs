using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;

namespace TravelPlannerApp.Models
{
    public class Country
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public Plan Plan { get; set; }
        public List<City> Cities { get; set; }
        public DateOnly? StartDate { get; set; }
        public DateOnly? EndDate { get; set; }
        [DefaultValue(0)]
        public int SortOrder { get; set; } = 0;
        //public string? CountryCode { get; set; }
    }
}
