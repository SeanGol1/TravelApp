using Microsoft.EntityFrameworkCore;
using System;
using System.Diagnostics.Metrics;
using TravelPlannerApp.Models;

namespace TravelPlannerApp.Data
{
    public class Repo : IRepo
    {
        private readonly TravelPlannerAppContext context;

        public Repo(TravelPlannerAppContext _DbContext)
        {
            this.context = _DbContext;
        }

        public async Task<IEnumerable<City>> GetCityAsync()
        {
            return await context.City.ToListAsync();
        }

        public async Task<City> GetCitybyIdAsync(int id)
        {
            return await context.City.FindAsync(id);
        }

        public async Task<IEnumerable<Country>> GetCountryAsync()
        {
            return await context.Country.Include(c=> c.Cities).ToListAsync();
        }

        public async Task<Country> GetCountrybyIdAsync(int id)
        {
            return await context.Country.FindAsync(id);
        }

        public async Task<IEnumerable<Plan>> GetPlanAsync()
        {
            return await context.Plan.ToListAsync();
        }

        public async Task<Plan> GetPlanbyIdAsync(int id)
        {
            Plan plan = await context.Plan.FindAsync(id);
            plan.Countries = await context.Country.Where(c => c.Plan.Id == id).OrderByDescending(c => c.StartDate.HasValue).ThenBy(c => c.StartDate).ToListAsync();
            foreach (var country in plan.Countries)
            {
                var x = country.StartDate;
                country.Cities = await context.City.Where(c => c.Country.Id == country.Id).OrderByDescending(c => c.StartDate.HasValue).ThenBy(c => c.StartDate).ToListAsync();
                foreach (var cities in country.Cities)
                {
                    cities.ToDos = await context.ToDo.Where(c => c.City.Id == cities.Id).OrderBy(t=> t.SortOrder).ToListAsync();
                }
            }
                       
            return plan;

        }

        public async Task<Plan> UpdatePlanAsync(Plan plan)
        {
            context.Plan.Add(plan);
            await context.SaveChangesAsync();
            return plan;
        }


        public async Task<IEnumerable<ToDo>> GetToDoAsync()
        {
            return await context.ToDo.ToListAsync();
        }

        public async Task<ToDo> GetToDobyIdAsync(int id)
        {
            return await context.ToDo.FindAsync(id);
        }

        public async Task<City> PostCityAsync(City city)
        {
            context.City.Add(city);
            await context.SaveChangesAsync();
            return city;
        }

        public async Task<Country> PostCountryAsync(Country country)
        {
            
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
            foreach (ToDo t in context.ToDo.Where(x=>x.City.Id == todo.City.Id).OrderByDescending(x=>x.SortOrder).ToList())
            {
                if(todo.SortOrder == t.SortOrder)
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
            try{
                
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
    }
}
