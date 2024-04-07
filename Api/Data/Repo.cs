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
            return await context.Plan.FindAsync(id);

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

        public async Task<bool> CountryExists(int id)
        {
            return context.Country.Any(e => e.Id == id);
        }
    }
}
