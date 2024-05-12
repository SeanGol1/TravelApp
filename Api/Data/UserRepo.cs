using Microsoft.EntityFrameworkCore;
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

        public Task<User> GetUserByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<User> GetUserByUsernameAsync(string username)
        {
            throw new NotImplementedException();
        }

        public void Update(User user)
        {
            throw new NotImplementedException();
        }
    }
}
