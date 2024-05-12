using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TravelPlannerApp.Models;

namespace TravelPlannerApp.Data
{
    public class TravelPlannerAppContext : DbContext
    {
        public TravelPlannerAppContext (DbContextOptions<TravelPlannerAppContext> options)
            : base(options)
        {
        }

        public DbSet<Plan> Plan { get; set; } = default!;
        public DbSet<Country> Country { get; set; }
        public DbSet<City> City { get; set; }
        public DbSet<ToDo> ToDo { get; set; }
        public DbSet<Travel> Travel { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<UserPlan> UserPlan { get; set; }


    }
}
