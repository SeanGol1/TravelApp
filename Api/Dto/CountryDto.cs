using TravelPlannerApp.Models;

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

    public class GetCountryDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public DateOnly? StartDate { get; set; }
        public DateOnly? EndDate { get; set; }
        public List<City> Cities { get; set; }
        public int SortOrder { get; set; }
        public string Code { get; set; } // CA
        public string? Region { get; set; } // North America
        public string? Subregion { get; set; } // Northern America
        public string? GoogleMapsLink { get; set; }
        public string? Capital { get; set; }
        public string? Timezones { get; set; }
        public string? CurrencySymbol { get; set; }
        public string? CurrencyName { get; set; }
        public double? Lat { get; set; }
        public double? Lng { get; set; }

        public GetCountryDto(Country country , RefCountry refCountry)
        {
            Id = country.Id;
            Name = country.Name;
            StartDate = country.StartDate;
            EndDate = country.EndDate;
            Cities = country.Cities ?? [];
            SortOrder = country.SortOrder;
            Code = refCountry.Code;
            Region = refCountry.Region;
            Subregion = refCountry.Subregion;
            GoogleMapsLink = refCountry.GoogleMapsLink;
            Capital = refCountry.Capital;
            Timezones = refCountry.Timezones;
            CurrencySymbol = refCountry.CurrencySymbol;
            CurrencyName = refCountry.CurrencyName;
            Lat = refCountry.Lat;
            Lng = refCountry.Lng;

        }
    }
}
