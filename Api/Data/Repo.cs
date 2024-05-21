using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Nancy.Json;
using NuGet.Protocol;
using System;
using System.Diagnostics;
using System.Diagnostics.Metrics;
using System.Net;
using System.Numerics;
using System.Runtime.InteropServices;
using System.Text;
using TravelPlannerApp.Dto;
using TravelPlannerApp.Models;
using static System.Net.Mime.MediaTypeNames;

namespace TravelPlannerApp.Data
{
    public class Repo : IRepo
    {
        private readonly TravelPlannerAppContext context;
        private readonly IUserRepo userRepo;
        private readonly IConfiguration config;

        public Repo(TravelPlannerAppContext _DbContext, IUserRepo _userRepo, IConfiguration _config)
        {
            this.context = _DbContext;
            userRepo = _userRepo;
            config = _config;
        }

        public async Task<IEnumerable<City>> GetCityAsync()
        {
            return await context.City.ToListAsync();
        }

        public async Task<City> GetCitybyIdAsync(int? id)
        {
            return await context.City.FindAsync(id);
        }

        public async Task<IEnumerable<Country>> GetCountryAsync()
        {
            return await context.Country.Include(c => c.Cities).ToListAsync();
        }

        public async Task<Country> GetCountrybyIdAsync(int id)
        {
            return await context.Country.FindAsync(id);
        }

        public async Task<IEnumerable<Plan>> GetPlanAsync()
        {
            return await context.Plan.ToListAsync();
        }

        public async Task<IEnumerable<Plan>> GetPlansbyUserAsync(string username)
        {
            //Get all Campaign info by user id
            var query = from p in context.Plan
                        join up in context.UserPlan on p.Id equals up.Plan.Id
                        join u in context.User on up.User.Id equals u.Id
                        where u.UserName.ToLower() == username.ToLower()
                        select p;

            return await query.ToListAsync();
        }

        public async Task<IEnumerable<User>> GetUserbyPlanAsync(int id)
        {
            //Get all Campaign info by user id
            var query = from p in context.Plan
                        join up in context.UserPlan on p.Id equals up.Plan.Id
                        join u in context.User on up.User.Id equals u.Id
                        where p.Id == id
                        select u;

            return await query.ToListAsync();
        }

        public async Task<bool> IsAdminCheck(int planId, string username)
        {
            //Get all Campaign info by user id
            var query = from p in context.Plan
                        join up in context.UserPlan on p.Id equals up.Plan.Id
                        join u in context.User on up.User.Id equals u.Id
                        where p.Id == planId && u.UserName.ToLower() == username.ToLower()
                        select up.IsAdmin;
            try
            {
                return Convert.ToBoolean(await query.FirstAsync());
            }
            catch (Exception ex)
            {
                throw new Exception("Not Found");
            }
            
        }

        public async Task<Plan> GetPlanbyIdAsync(int id)
        {
            Plan plan = await context.Plan.FindAsync(id);
            plan.Countries = await context.Country.Where(c => c.Plan.Id == id).OrderByDescending(c => c.StartDate.HasValue).ThenBy(c => c.StartDate).ToListAsync();
            foreach (var country in plan.Countries)
            {
                country.Name = country.Name.Trim();
                var x = country.StartDate;
                country.Cities = await context.City.Where(c => c.Country.Id == country.Id).OrderBy(c => c.SortOrder).ToListAsync();
                foreach (var cities in country.Cities)
                {
                    cities.Name = cities.Name.Trim();
                    cities.ToDos = await context.ToDo.Where(c => c.City.Id == cities.Id).OrderBy(t => t.SortOrder).ToListAsync();
                }
            }

            return plan;
        }

        public async Task<Plan> CreatePlanAsync(CreatePlanDto dto)
        {
            int id = GenerateId();
            while (PlanCodeExists(id))
            {
                id = GenerateId();
            }
            Plan plan = new Plan() { PlanName = dto.Name, JoinCode = id };
            plan = context.Plan.Add(plan).Entity;
            await context.SaveChangesAsync();
            UserPlan userPlan = new UserPlan() { Plan = plan, User = await userRepo.GetUserByUsernameAsync(dto.Username), IsAdmin = true };
            context.UserPlan.Add(userPlan);

            await context.SaveChangesAsync();

            return plan;
        }

        public async Task<HttpStatusCode> DeletePlanAsync(int id)
        {
            try
            {
                Plan plan = await GetPlanbyIdAsync(id);
                context.Plan.Remove(plan);
                List<UserPlan> users = context.UserPlan.Where(x => x.Plan.Id == id).ToList();
                foreach (UserPlan up in users)
                {
                    context.UserPlan.Remove(up);
                }

                await context.SaveChangesAsync();

                return HttpStatusCode.OK;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Plan> JoinPlanByCodeAsync(JoinByCodeDto dto)
        {
            if (PlanCodeExists(dto.JoinCode))
            {
                Plan plan = await context.Plan.Where(p => p.JoinCode == dto.JoinCode).FirstOrDefaultAsync();
                UserPlan userPlan = new UserPlan() { Plan = plan, User = await userRepo.GetUserByUsernameAsync(dto.Username), IsAdmin = false };
                var up = context.UserPlan.Where(p => p.Plan.Id == plan.Id && p.User.Id == userPlan.User.Id).FirstOrDefault();
                if (up == null)
                    context.UserPlan.Add(userPlan);
                else
                    return null;
                await context.SaveChangesAsync();

                return plan;
            }
            else
                return null;

        }

        private bool PlanCodeExists(int id)
        {
            Plan plan = context.Plan.Where(p => p.JoinCode == id).FirstOrDefault();

            return plan == null ? false : true;
        }

        private int GenerateId()
        {
            int id = 0;
            Random r = new Random();
            id = r.Next(100000, 999999);
            return id;
        }

        public async Task<Plan> UpdatePlanAsync(Plan plan)
        {
            context.Plan.Add(plan);
            await context.SaveChangesAsync();
            return plan;
        }

        public async Task<HttpStatusCode> AddUserPlanAsync(AddUserPlanDto dto)
        {
            UserPlan up = new UserPlan()
            {
                Plan = await GetPlanbyIdAsync(dto.PlanId),
                User = await userRepo.GetUserByUsernameAsync(dto.Username),
                IsAdmin = dto.IsAdmin
            };
            UserPlan ups = null;
            try
            {
                ups = await context.UserPlan.Where(u => u.Plan.Id == up.Plan.Id && u.User.UserName == up.User.UserName).FirstAsync();
            }
            catch (Exception ex)
            {
                string m = ex.Message;
            }
            if (ups == null)
            {
                context.UserPlan.Add(up);
                await context.SaveChangesAsync();
                return HttpStatusCode.OK;
            }
            else
                return HttpStatusCode.BadRequest;
        }


        public async Task<IEnumerable<ToDo>> GetToDoAsync()
        {
            return await context.ToDo.ToListAsync();
        }

        public async Task<ToDo> GetToDobyIdAsync(int id)
        {
            return await context.ToDo.FindAsync(id);
        }

        private int GetSortOrder(int id)
        {
            List<City> cities = context.City.Where(c => c.Country.Id == id).ToList();
            if (cities.Count() > 0)
                return context.City.Where(c => c.Country.Id == id).OrderByDescending(c => c.SortOrder).First().SortOrder;
            else
            {
                return 0;
            }
        }

        public async Task<RefCity> GetRefCityByName(string city, string country)
        {
            ProcessStartInfo start = new ProcessStartInfo();
            start.FileName = config["Python"];
            //var obj = new { city=city, country=country};
            start.Arguments = string.Format("{0} \"{1}\" \"{2}\"  ", config["PythonScript"], city, country);
            start.UseShellExecute = false;
            start.RedirectStandardOutput = true;
            using (Process process = Process.Start(start))
            {
                using (StreamReader reader = process.StandardOutput)
                {
                    string result = reader.ReadToEnd();
                    if (result != string.Empty)
                    {
                        RefCity refCity = new RefCity(result);
                        return refCity;
                    }
                    else
                    {
                        return null;
                    }
                }
            }
        }

        private bool RefCityExists(string city)
        {
            return context.RefCity.Where(c => c.Name == city).Count() > 0;
        }

        public async Task<IEnumerable<City>> GetCitiesByPlan(int id)
        {
            return await context.City.Where(c => c.Country.Plan.Id == id).ToListAsync();
        }

        public async Task<IEnumerable<RefCity>> GetRefCityListByPlanIdAsync(int id)
        {
            Plan p = await GetPlanbyIdAsync(id);
            List<RefCity> list = new List<RefCity>();
            string[] errList = [];
            foreach (City city in await GetCitiesByPlan(id))
            {
                try
                {
                    RefCity refCity = await context.RefCity.Where(c => c.Name == city.Name).FirstOrDefaultAsync();
                    if (refCity != null)
                        list.Add(refCity);
                    else
                    {
                        //refCity = await GetRefCityByName(city.Name, city.Country.Name);
                        //if (refCity != null)
                        //{
                        //    list.Add(refCity);
                        //    context.RefCity.Add(refCity);
                        //    await context.SaveChangesAsync();
                        //}
                        //else
                        //{
                        //    errList.Append(city.Name);
                        //}
                    }
                    // Console.WriteLine(list.Count);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }

            }
            LogError(errList);
            return list;
        }

        private void LogError(string[] error)
        {
            string fileName = @"C:\home\log.txt";

            try
            {
                // Check if file already exists. If yes, delete it.
                if (File.Exists(fileName))
                {
                    File.Delete(fileName);
                }

                // Create a new file
                using (FileStream fs = File.Create(fileName))
                {
                    foreach (var item in error)
                    {
                        Byte[] errorstring = new UTF8Encoding(true).GetBytes(item);
                        fs.Write(errorstring, 0, errorstring.Length);
                    }
                }
            }
            catch (Exception Ex)
            {
                Console.WriteLine(Ex.ToString());
            }
        }

        public async Task<City> PostCityAsync(City city)
        {
            city.Name = city.Name.Trim();
            city.SortOrder = GetSortOrder(city.Country.Id);
            if (!RefCityExists(city.Name))
            {
                try
                {
                    RefCity refcity = await GetRefCityByName(city.Name, city.Country.Name);
                    context.RefCity.Add(refcity);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
            context.City.Add(city);
            await context.SaveChangesAsync();
            return city;
        }

        public async Task<Country> PostCountryAsync(Country country)
        {
            country.Name = country.Name.Trim();
            context.Country.Add(country);
            await context.SaveChangesAsync();
            return country;
        }

        public async Task<ToDo> PostToDoAsync(ToDo todo)
        {
            context.ToDo.Add(todo);
            await context.SaveChangesAsync();
            return todo;
        }

        public async Task<Country> UpdateCountryAsync(Country country)
        {
            context.Entry(country).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return country;
        }


        public async Task<City> UpdateCityAsync(City city)
        {
            context.Entry(city).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return city;
        }

        public async Task<ToDo> UpdateToDoAsync(ToDo todo)
        {
            context.Entry(todo).State = EntityState.Modified;
            if (todo.SortOrder != Convert.ToInt32(context.ToDo.Where(t => t.Id == todo.Id).Select(t => t.SortOrder).ToString()))
            {
                UpdateSortOrder(todo);
            }
            await context.SaveChangesAsync();
            return todo;
        }

        private void UpdateSortOrder(ToDo todo)
        {
            foreach (ToDo t in context.ToDo.Where(x => x.City.Id == todo.City.Id).OrderByDescending(x => x.SortOrder).ToList())
            {
                if (todo.SortOrder == t.SortOrder)
                {

                }
            }
        }


        public async Task<bool> CountryExists(int id)
        {
            return context.Country.Any(e => e.Id == id);
        }

        public async Task<bool> DeleteCountry(int id)
        {
            var country = await context.Country.FindAsync(id);
            if (country == null)
            {
                return false;
            }
            try
            {

                context.Country.Remove(country);
                await context.SaveChangesAsync();
            }
            catch
            {
                return false;
            }


            return true;
        }

        public async Task<bool> DeleteCity(int id)
        {
            var city = await context.City.FindAsync(id);
            if (city == null)
            {
                return false;
            }
            try
            {
                context.City.Remove(city);
                await context.SaveChangesAsync();
            }
            catch
            {
                return false;
            }


            return true;
        }

        public async Task<bool> DeleteToDo(int id)
        {
            var todo = await context.ToDo.FindAsync(id);
            if (todo == null)
            {
                return false;
            }
            try
            {
                context.ToDo.Remove(todo);
                await context.SaveChangesAsync();
            }
            catch
            {
                return false;
            }


            return true;
        }

        #region Travel


        public async Task<Travel> GetTravelbyIdAsync(int id)
        {
            return await context.Travel.FindAsync(id);
        }

        public async Task<Travel> GetTravelbyCityIdAsync(int id)
        {
            return await context.Travel.Where(x => x.FromCity.Id == id).Include(x => x.FromCity).Include(x => x.ToCity).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Travel>> GetTravelAsync()
        {
            return await context.Travel.ToListAsync();
        }

        public async Task<Travel> PostTravelAsync(Travel travel)
        {
            context.Travel.Add(travel);
            await context.SaveChangesAsync();
            return travel;
        }

        public async Task<Travel> UpdateTravelAsync(Travel travel)
        {
            context.Entry(travel).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return travel;
        }

        public async Task<bool> DeleteTravel(int id)
        {
            var travel = await context.Travel.FindAsync(id);
            if (travel == null)
            {
                return false;
            }
            try
            {
                context.Travel.Remove(travel);
                await context.SaveChangesAsync();
            }
            catch
            {
                return false;
            }


            return true;
        }

        public async Task<ChecklistItem> GetChecklistItembyIdAsync(int id)
        {
            return await context.ChecklistItem.FindAsync(id);
        }

        public async Task<IEnumerable<ChecklistItem>> GetChecklistItemAsync()
        {
            return await context.ChecklistItem.ToListAsync();
        }

        public async Task<IEnumerable<ChecklistItem>> GetChecklistItemByCountryAsync(int id)
        {
            return await context.ChecklistItem.Where(c => c.Country.Id == id).ToListAsync();
        }

        public async Task<ChecklistItem> PostChecklistItemAsync(ChecklistItem item)
        {
            context.ChecklistItem.Add(item);
            await context.SaveChangesAsync();
            return item;
        }

        public async Task<ChecklistItem> UpdateChecklistItemAsync(ChecklistItem item)
        {
            context.Entry(item).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return item;
        }

        public Task<bool> DeleteChecklistItem(int id)
        {
            throw new NotImplementedException();
        }

        #endregion
    }
}
