using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using TravelPlannerApp.Data;
using TravelPlannerApp.Dto;
using TravelPlannerApp.Models;

namespace TravelPlannerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepo _userRepo;
        private ITokenService _tokenService;
        private readonly TravelPlannerAppContext _context;

        public UsersController(TravelPlannerAppContext context, IUserRepo userRepo, ITokenService tokenService)
        {
            _context = context;
            _userRepo = userRepo;
            _tokenService = tokenService;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {

            return await _context.User.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.User.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }



        [HttpPost("register")] //Post
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDTO)
        {
            if (!await _context.Database.CanConnectAsync())
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, "Database unavailable");
            }

            if (await UserExists(registerDTO.Username)) return BadRequest("Username is Taken");

            User user = await _userRepo.Register(registerDTO);

            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }


        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            if (!await _context.Database.CanConnectAsync())
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, "Database unavailable");
            }

            var user = new User(); 
            try
            {
                user = await _context.User.SingleOrDefaultAsync(x => x.UserName.ToLower() == loginDto.Username.ToLower());
            }
            catch(Exception ex)
            {
                return NotFound(ex.Message); // Issue connecting to DB
            }

            if (user == null) return Unauthorized("Invalid Username");


            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");
            }
            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private async Task<bool> UserExists(string username)
        {

                return await _context.User.AnyAsync(x => x.UserName.ToLower() == username.ToLower());

        }
    }
}
