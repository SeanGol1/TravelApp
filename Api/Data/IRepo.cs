using System.Net;
using TravelPlannerApp.Dto;
using TravelPlannerApp.Models;

namespace TravelPlannerApp.Data
{
    public interface IRepo
    {
        //Plan
        #region Plan        
        Task<Plan> GetPlanbyIdAsync(int id);
        Task<IEnumerable<Plan>> GetPlanAsync();
        Task<Plan> UpdatePlanAsync(Plan plan);
        Task<HttpStatusCode> AddUserPlanAsync(AddUserPlanDto userplan);
        Task<Plan> CreatePlanAsync(CreatePlanDto dto);
        Task<IEnumerable<Plan>> GetPlansbyUserAsync(string username);
        Task<IEnumerable<User>> GetUserbyPlanAsync(int id);
        #endregion


        //Country
        #region Country

        Task<Country> GetCountrybyIdAsync(int id);
        Task<IEnumerable<Country>> GetCountryAsync();
        Task<Country> PostCountryAsync(Country country);
        Task<Country> UpdateCountryAsync(Country country);
        Task<bool> CountryExists(int id);
        Task<bool> DeleteCountry(int id);

        #endregion

        //City
        #region City

        Task<City> GetCitybyIdAsync(int? id);
        Task<IEnumerable<City>> GetCityAsync();
        Task<City> PostCityAsync(City city);
        Task<City> UpdateCityAsync(City city);
        Task<bool> DeleteCity(int id);

        #endregion

        //ToDo
        #region ToDo


        Task<ToDo> GetToDobyIdAsync(int id);
        Task<IEnumerable<ToDo>> GetToDoAsync();
        Task<ToDo> PostToDoAsync(ToDo todo);
        Task<ToDo> UpdateToDoAsync(ToDo todo);
        Task<bool> DeleteToDo(int id);
        #endregion


        //Travel
        #region Travel

        Task<Travel> GetTravelbyIdAsync(int id);
        Task<Travel> GetTravelbyCityIdAsync(int id);
        Task<IEnumerable<Travel>> GetTravelAsync();
        Task<Travel> PostTravelAsync(Travel travel);
        Task<Travel> UpdateTravelAsync(Travel travel);
        Task<bool> DeleteTravel(int id);
        #endregion
    }
}
