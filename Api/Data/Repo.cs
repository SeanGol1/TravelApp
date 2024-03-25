using Microsoft.EntityFrameworkCore;
using System;
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

        public async Task<IEnumerable<Country>> GetCountryAsync()
        {
            return await context.Country.ToListAsync();
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

        public async Task<Country> PostCountryAsync(Country country)
        {
            context.Country.Add(country);
            await context.SaveChangesAsync();
            return country;
        }
    }
}
