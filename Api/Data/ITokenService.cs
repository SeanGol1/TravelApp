using TravelPlannerApp.Models;

namespace TravelPlannerApp.Data
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}
