using Microsoft.AspNetCore.Mvc;
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
        Task<HttpStatusCode> RemoveUserPlanAsync(UserPlanDto up);
        Task<HttpStatusCode> SetAdminUserPlanAsync(UserPlanDto up);
        Task<Plan> CreatePlanAsync(CreatePlanDto dto);
        Task<HttpStatusCode> DeletePlanAsync(int id);
        Task<Plan> JoinPlanByCodeAsync(JoinByCodeDto dto);
        Task<IEnumerable<Plan>> GetPlansbyUserAsync(string username);
        Task<IEnumerable<AddUserPlanDto>> GetUserbyPlanAsync(int id);
        Task<bool> IsAdminCheck(int planId, string username);
        Task<Plan> GenerateAiPlan(AiPlanDto dto);

        //public bool PlanCodeExists(int id);
        //public int GenerateId();
        #endregion


        //Country
        #region Country

        Task<Country> GetCountrybyIdAsync(int id);
        Task<IEnumerable<Country>> GetCountryAsync();
        Task<IEnumerable<RefCountry>> GetRefCountryAsync();
        Task<RefCountry> GetRefCountryByIdAsync(int id);
        Task<RefCountry> GetRefCountryByNameAsync(string name);
        Task<IEnumerable<RefCountry>> GetRefCountryByPlanAsync(int id);
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
        Task<RefCity> GetRefCityByName(string city,string country);
        Task<IEnumerable<RefCity>> GetRefCityListByPlanIdAsync(int id);
        Task<IEnumerable<RefCityAttractions>> GetCityAttractionsAsync(string city);
        Task<RefCityAttractions> GetPlaceDetailsAsync(string placeId,string city);
        Task<GooglePhotoResult?> GetGooglePhotoAsync(string photoReference);

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


        //ToDo
        #region ChecklistItem


        Task<ChecklistItem> GetChecklistItembyIdAsync(int id);
        Task<IEnumerable<ChecklistItem>> GetChecklistItemAsync();
        Task<IEnumerable<ChecklistItem>> GetChecklistItemByCountryAsync(int id);
        Task<ChecklistItem> PostChecklistItemAsync(ChecklistItem item);
        Task<ChecklistItem> UpdateChecklistItemAsync(ChecklistItem item);
        Task<bool> DeleteChecklistItem(int id);
        #endregion
    }
}
