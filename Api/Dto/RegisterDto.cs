using System.ComponentModel.DataAnnotations;

namespace TravelPlannerApp.Dto
{
    public class RegisterDto
    {
        [Required]
        public string Username { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
    }
}
