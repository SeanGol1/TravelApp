using System;
using System.Collections.Generic;
using System.Linq;
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
    public class TravelsController : ControllerBase
    {
        private readonly TravelPlannerAppContext _context;
        private readonly IRepo _repo;

        public TravelsController(TravelPlannerAppContext context, IRepo repo)
        {
            _context = context;
            _repo = repo;
        }

        // GET: api/Travels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Travel>>> GetTravel()
        {
            return Ok(await _repo.GetTravelAsync());
        }

        // GET: api/Travels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Travel>> GetTravel(int id)
        {
            var travel = await _repo.GetTravelbyCityIdAsync(id);

            if (travel == null)
            {
                return NotFound();
            }

            return travel;
        }

        // PUT: api/Travels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTravel(int id, Travel travel)
        {
            if (id != travel.Id)
            {
                return BadRequest();
            }

            _context.Entry(travel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TravelExists(id))
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

        // POST: api/Travels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Travel>> PostTravel(CreateTravelDto dto)
        {
            Travel travel = new Travel() {
                Date = dto.Date,
                TravelType = dto.TravelType,
                FromCity = await _repo.GetCitybyIdAsync(dto.FromCity),
                ToCity = await _repo.GetCitybyIdAsync(dto.ToCity)
            };

            await _repo.PostTravelAsync(travel);

            return CreatedAtAction("GetTravel", new { id = travel.Id }, travel);
        }

        // DELETE: api/Travels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTravel(int id)
        {
            var travel = await _repo.GetTravelbyIdAsync(id);
            if (travel == null)
            {
                return NotFound();
            }

            await _repo.DeleteTravel(id);

            return NoContent();
        }

        private bool TravelExists(int id)
        {
            return _context.Travel.Any(e => e.Id == id);
        }
    }
}
