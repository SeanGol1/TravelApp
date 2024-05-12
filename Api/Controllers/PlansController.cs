using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravelPlannerApp.Data;
using TravelPlannerApp.Dto;
using TravelPlannerApp.Models;

namespace TravelPlannerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlansController : ControllerBase
    {
        private readonly TravelPlannerAppContext _context;
        private readonly IRepo _repo;

        public PlansController(TravelPlannerAppContext context, IRepo repo)
        {
            _context = context;
            _repo = repo;
        }

        // GET: api/Plans
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Plan>>> GetPlan()
        {
            //Plan plan = await _context.Plan.ToListAsync();
            return await _context.Plan.Include(c=>c.Countries).ToListAsync();
        }

        // GET: api/Plans/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Plan>> GetPlan(int id)
        {
            Plan plan;
            try{
               plan  = await _repo.GetPlanbyIdAsync(id);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            if (plan == null)
            {
                return NotFound();
            }

            return plan;
        }


        [HttpGet("userplanlist/{username}")]
        public async Task<ActionResult<IEnumerable<Plan>>> GetPlanByUser(string username)
        {
            try
            {
                return Ok(await _repo.GetPlansbyUserAsync(username));
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpGet("userlist/{id}")]
        public async Task<ActionResult<IEnumerable<Plan>>> GetUserByPlan(int id)
        {
            List<User> userlist = new List<User>();
            try
            {
                return Ok(await _repo.GetUserbyPlanAsync(id));
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }



        // PUT: api/Plans/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlan(int id, Plan plan)
        {
            if (id != plan.Id)
            {
                return BadRequest();
            }

            _context.Entry(plan).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlanExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Plans
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Plan>> PostPlan(CreatePlanDto dto)
        {
            try
            {
                Plan plan = await _repo.CreatePlanAsync(dto);
                return CreatedAtAction("GetPlan", new { id = plan.Id }, plan);
            }
            catch
            {
                return BadRequest();
            }
            
        }

        [Route("update")]
        [HttpPost]
        public async Task<ActionResult<Plan>> UpdatePlan(Plan plan)
        {           
            if (PlanExists(plan.Id))
            {
                await _repo.UpdatePlanAsync(plan);
            }
            else { return BadRequest(); }

            return CreatedAtAction("GetPlan", new { id = plan.Id }, plan);
        }

        [Route("adduser")]
        [HttpPost]
        public async Task<ActionResult<HttpStatusCode>> AddUserToPlan(AddUserPlanDto dto)
        {
            if (PlanExists(dto.PlanId))
            {                
                return await _repo.AddUserPlanAsync(dto);
            }
            else { return BadRequest(); }

            
        }

        // DELETE: api/Plans/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlan(int id)
        {
            var plan = await _context.Plan.FindAsync(id);
            if (plan == null)
            {
                return NotFound();
            }

            _context.Plan.Remove(plan);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PlanExists(int id)
        {
            return _context.Plan.Any(e => e.Id == id);
        }
    }
}
