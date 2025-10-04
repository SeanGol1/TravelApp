using TravelPlannerApp.Dto;
using TravelPlannerApp.Models;

namespace TravelPlannerApp.Data
{
    public interface IUserRepo
    {
        void Update(User user);

        //Task<bool> SaveAllAsync();
        Task<IEnumerable<User>> GetUserAsync();
        Task<User> GetUserByIdAsync(int id);
        Task<User> GetUserByUsernameAsync(string username);
        Task<User> Register(RegisterDto registerDTO);
        Task<Plan> CreateDemoPlan(User user);
    }
}
