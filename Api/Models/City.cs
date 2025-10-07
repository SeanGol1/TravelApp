using System.ComponentModel;

namespace TravelPlannerApp.Models
{
    public class City
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public Country Country{ get; set; }
        public List<ToDo> ToDos { get; set; }
        public DateOnly? StartDate { get; set; }
        public DateOnly? EndDate { get; set; }
        [DefaultValue(0)]
        public int SortOrder { get; set; } = 0;
    }
}
