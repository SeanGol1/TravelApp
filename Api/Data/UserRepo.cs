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

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await context.User.FindAsync(id);
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await context.User.Where(u => u.UserName==username).FirstOrDefaultAsync();
        }

        public void Update(User user)
        {
            throw new NotImplementedException();
        }
    }
}
