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
        public DbSet<RefCountry> RefCountry { get; set; }
        public DbSet<RefCity> RefCity { get; set; }
        public DbSet<ChecklistItem> ChecklistItem { get; set; }
        public DbSet<RefCityAttractions> refCityAttractions { get; set; }
        public DbSet<Geometry> Geometry { get; set; }
        public DbSet<Location> Location { get; set; }
        //public DbSet<OpeningHours> OpeningHours { get; set; }
        public DbSet<Photo> AttractionPhoto { get; set; }
        public DbSet<CachedGooglePhoto> cachedGooglePhotos { get; set; }


    }
}
