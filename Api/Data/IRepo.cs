using TravelPlannerApp.Models;

namespace TravelPlannerApp.Data
{
    public interface IRepo
    {
        Task<Plan> GetPlanbyIdAsync(int id);
        Task<IEnumerable<Plan>> GetPlanAsync();

        Task<Country> GetCountrybyIdAsync(int id);
        Task<IEnumerable<Country>> GetCountryAsync();
        Task<Country> PostCountryAsync(Country country);

    }
}
