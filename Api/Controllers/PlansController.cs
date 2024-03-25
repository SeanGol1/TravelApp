using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravelPlannerApp.Data;
using TravelPlannerApp.Models;

namespace TravelPlannerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlansController : ControllerBase
    {
        private readonly TravelPlannerAppContext _context;

        public PlansController(TravelPlannerAppContext context)
        {
            _context = context;
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
            Plan plan = await _context.Plan.FindAsync(id);
            plan.Countries = await _context.Country.Where(c => c.Plan.Id == id).ToListAsync();
            if (plan == null)
            {
                return NotFound();
            }

            return plan;
        }

        [HttpGet("intPlan/{id}")]
        public async Task<Plan> GetIntPlan(int id)
        {
            var plan = await _context.Plan.FindAsync(id);

            if (plan == null)
            {
                //return NotFound();
            }

            return plan;
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
        public async Task<ActionResult<Plan>> PostPlan(Plan plan)
        {
            _context.Plan.Add(plan);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPlan", new { id = plan.Id }, plan);
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
