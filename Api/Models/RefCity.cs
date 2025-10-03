using Newtonsoft.Json.Linq;
using System.Diagnostics;
using System.Security.Claims;

namespace TravelPlannerApp.Models
{
    public class RefCity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public int CountryId { get; set; }
        //public RefCountry Country { get; set; }

        public RefCity() { }

        public RefCity(string json)
        {
            JObject jObject = JObject.Parse(json);
            JToken data = jObject;
            Name = (string)data["Name"];
            Lat = (double)data["Lat"];
            Lng = (double)data["Lng"];

        }
    }

   
}
