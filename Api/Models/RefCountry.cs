namespace TravelPlannerApp.Models
{
    public class RefCountry
    {

        public int Id { get; set; }
        public string Name { get; set; } // Canada
        public string Code { get; set; } // CA
        public string? Region { get; set; } // North America
        public string? Subregion { get; set; } // Northern America
        public string? GoogleMapsLink { get; set; }
        public string? Capital { get; set; }
        public string? Timezones { get; set; }
        public string? CurrencySymbol { get; set; }
        public string? CurrencyName { get; set; }
        public double? Lat{ get; set; }
        public double? Lng{ get; set; }
        //public ICollection<RefCity> Cities { get; set; } = new List<RefCity>();
    }

}
