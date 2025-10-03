namespace TravelPlannerApp.Models
{
    public class PlaceDetailsGoogle
    {
    }

    public class PlaceDetailsResponse
    {
        public string Status { get; set; }
        public RefCityAttractions Result { get; set; }
    }

    public class RefCityAttractions
    {
        public int Id { get; set; }
        public string PlaceId { get; set; }
        public string Name { get; set; }
        public string CityName { get; set; }
        public string? Formatted_Address { get; set; }
        public Geometry Geometry { get; set; }
        public double? Rating { get; set; }
        //public OpeningHours Opening_Hours { get; set; }
        public string? Website { get; set; }
        public List<Photo> Photos { get; set; }
        public List<string> Types { get; set; }   // <-- added
        public string? Icon { get; set; }          // <-- added (main icon URL)
        public string? IconMaskBaseUri { get; set; }  // <-- optional, for vector-based icons
        public string? IconBackgroundColor { get; set; } // <-- optional, styling hint
        public DateTimeOffset LastUpdateDate { get; set; }
    }

    public class Geometry
    {
        public int Id { get; set; }

        public Location Location { get; set; }
    }

    public class Location
    {
        public int Id { get; set; }

        public double Lat { get; set; }
        public double Lng { get; set; }
    }

    //public class OpeningHours
    //{
    //    public int Id { get; set; }

    //    public bool? OpenNow { get; set; }
    //}
    public class Photo
    {
        public int Id { get; set; }

        public int Height { get; set; }
        public int Width { get; set; }
        public string Photo_Reference { get; set; }
        public List<string> Html_Attributions { get; set; }
    }

    public class CachedGooglePhoto
    {
        public int Id { get; set; }
        public string PhotoReference { get; set; }
        public string ContentType { get; set; }
        public byte[] Data { get; set; }
        public DateTimeOffset LastFetched { get; set; }
    }
}
