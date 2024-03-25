using TravelPlannerApp.Models;

namespace TravelPlannerApp.Data
{
    public interface IRepo
    {
        //Plan
        Task<Plan> GetPlanbyIdAsync(int id);
        Task<IEnumerable<Plan>> GetPlanAsync();

        //Country
        Task<Country> GetCountrybyIdAsync(int id);
        Task<IEnumerable<Country>> GetCountryAsync();
        Task<Country> PostCountryAsync(Country country);

        //City
        Task<City> GetCitybyIdAsync(int id);
        Task<IEnumerable<City>> GetCityAsync();
        Task<City> PostCityAsync(City city);


        //ToDo
        Task<ToDo> GetToDobyIdAsync(int id);
        Task<IEnumerable<ToDo>> GetToDoAsync();
        Task<ToDo> PostToDoAsync(ToDo todo);

    }
}
