using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using TravelPlannerApp.Dto;
using TravelPlannerApp.Models;

namespace TravelPlannerApp.Data
{
    public class UserRepo : IUserRepo
    {
        private readonly TravelPlannerAppContext context;

        public UserRepo(TravelPlannerAppContext _DbContext)
        {
            this.context = _DbContext;
        }
        public async Task<IEnumerable<User>> GetUserAsync()
        {
            return await context.User.ToListAsync();
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await context.User.FindAsync(id);
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await context.User.Where(u => u.UserName==username).FirstOrDefaultAsync();
        }

        public async Task<User> Register(RegisterDto registerDTO)
        {
            using var hmac = new HMACSHA512();

            var user = new User
            {
                UserName = registerDTO.Username,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password)),
                PasswordSalt = hmac.Key
            };

            context.User.Add(user);
            await context.SaveChangesAsync();

            await CreateDemoPlan(user);
            return user;
            //return new UserDto
            //{
            //    Username = user.UserName,
            //    Token = tokenService.CreateToken(user)
            //};
        }

        public async Task<Plan> CreateDemoPlan(User user)
        {
            var plan = new Plan
            {
                PlanName = "Demo Southeast Asia",
                JoinCode = new Random().Next(100000, 999999),
                Countries = new List<Country>
        {
            new Country
            {
                Name = "Thailand",
                Cities = new List<City>
                {
                    new City
                    {
                        Name = "Bangkok",
                        ToDos = new List<ToDo>
                        {
                            new ToDo { Name = "Wat Arun Viewing Point" },
                            new ToDo { Name = "Bangkok Hangover Tour" },
                            new ToDo { Name = "SKY SCAPE" }
                        }
                    },
                    new City
                    {
                        Name = "Chiang Mai",
                        ToDos = new List<ToDo>
                        {
                            new ToDo { Name = "Elephant Parade House" },
                            new ToDo { Name = "Wang Bua Ban Pha Ngoep" },
                            new ToDo { Name = "Huge old tree" }
                        }
                    }
                }
            },
            new Country
            {
                Name = "Lao People'S Democratic Republic",
                Cities = new List<City>
                {
                    new City
                    {
                        Name = "Vientiane",
                        ToDos = new List<ToDo>
                        {
                            new ToDo { Name = "Chao Anouvong Park" },
                            new ToDo { Name = "Statue of Chao Anouvong" }
                        }
                    },
                    new City
                    {
                        Name = "Vang vieng",
                        ToDos = new List<ToDo>
                        {
                            new ToDo { Name = "Pha Ngern Silver Cliff View Point" },
                            new ToDo { Name = "Nam Xong viewpoint" }
                        }
                    }
                }
            },
            new Country
            {
                Name = "Cambodia",
                Cities = new List<City>
                {
                    new City { Name = "Siem reap" }
                }
            },
            new Country
            {
                Name = "Vietnam",
                Cities = new List<City>()
            }
        }
            };

            context.Plan.Add(plan);

            var userPlan = new UserPlan
            {
                User = user,
                Plan = plan,
                IsAdmin = true
            };
            context.UserPlan.Add(userPlan);

            await context.SaveChangesAsync();

            return plan;
        }

        public void Update(User user)
        {
            throw new NotImplementedException();
        }
    }
}
