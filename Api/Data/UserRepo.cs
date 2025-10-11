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
        private readonly IFunctionRepo _frepo;
        public UserRepo(TravelPlannerAppContext _DbContext, IFunctionRepo frepo)
        {
            this.context = _DbContext;
            _frepo = frepo;
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

            var user = new User();
            if (registerDTO.Password == null)
            {
                user.Email = registerDTO.Email;
                user.UserName = registerDTO.Username;
            }
            else
            {
                using var hmac = new HMACSHA512();


                user.UserName = registerDTO.Username;
                    user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password));
                    user.PasswordSalt = hmac.Key;
            }

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
            int rndId = _frepo.GenerateId();
            while (_frepo.PlanCodeExists(rndId))
            {
                rndId = _frepo.GenerateId();
            }
            var plan = new Plan
            {
                PlanName = "Demo Southeast Asia",
                JoinCode = rndId,
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
