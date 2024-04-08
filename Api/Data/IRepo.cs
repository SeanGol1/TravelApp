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
        Task<Country> UpdateCountryAsync(Country country);
        Task<bool> CountryExists(int id);
        Task<bool> DeleteCountry(int id);

        //City
        Task<City> GetCitybyIdAsync(int id);
        Task<IEnumerable<City>> GetCityAsync();
        Task<City> PostCityAsync(City city);
        Task<City> UpdateCityAsync(City city);
        Task<bool> DeleteCity(int id);


        //ToDo
        Task<ToDo> GetToDobyIdAsync(int id);
        Task<IEnumerable<ToDo>> GetToDoAsync();
        Task<ToDo> PostToDoAsync(ToDo todo);
        Task<ToDo> UpdateToDoAsync(ToDo todo);
        Task<bool> DeleteToDo(int id);

    }
}
