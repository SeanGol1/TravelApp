using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Humanizer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravelPlannerApp.Data;
using TravelPlannerApp.Dto;
using TravelPlannerApp.Models;

namespace TravelPlannerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : ControllerBase
    {
        private readonly TravelPlannerAppContext _context;
        private readonly IRepo _repo;

        public CitiesController(TravelPlannerAppContext context, IRepo repo)
        {
            _context = context;
            this._repo = repo;
        }

        // GET: api/Cities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<City>>> GetCity()
        {
            return await _context.City.ToListAsync();
        }

        // GET: api/Cities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<City>> GetCity(int id)
        {
            var city = await _context.City.FindAsync(id);

            if (city == null)
            {
                return NotFound();
            }

            return city;
        }

        // PUT: api/Cities/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCity(int id, City city)
        {
            if (id != city.Id)
            {
                return BadRequest();
            }

            _context.Entry(city).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CityExists(id))
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
        
        // POST: api/Cities
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<City>> PostCity(CreateCityDto dto)
        {
            City city = new City();
            city.Name = dto.Name;
            city.StartDate = dto.StartDate;
            city.EndDate = dto.EndDate;
            city.Country = await _repo.GetCountrybyIdAsync(dto.CountryId);
            city = await _repo.PostCityAsync(city);

            return CreatedAtAction("GetCity", new { id = city.Id }, city);
        }

        [Route("update")]
        [HttpPost]
        public async Task<ActionResult<City>> UpdateCity(UpdateCityDto dto)
        {
            City city = await _repo.GetCitybyIdAsync(dto.Id);
            city.StartDate = dto.StartDate != null ? dto.StartDate : null;
            city.EndDate = dto.EndDate != null ? dto.EndDate: null;
            city.Name = dto.Name;
            city.SortOrder = dto.SortOrder;
            city.Country = await _repo.GetCountrybyIdAsync(dto.CountryId);

            if (CityExists(dto.Id))
            {
                await _repo.UpdateCityAsync(city);
            }
            else { return BadRequest(); }

            return CreatedAtAction("GetCity",new { id = city.Id }, city);
        }

        [Route("updatesort")]
        [HttpPost]
        public async Task<ActionResult<HttpStatusCode>> UpdateCitySort(UpdateCityDto[] cities)
        {
            foreach (UpdateCityDto _city in cities)
            {
                City city = await _repo.GetCitybyIdAsync(_city.Id);
                city.SortOrder = _city.SortOrder;
                if (CityExists(_city.Id))
                {
                    await _repo.UpdateCityAsync(city);
                }
                else
                    return BadRequest(); 
            }

            return HttpStatusCode.OK;
        }

        // DELETE: api/Cities/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            var city = await _context.City.FindAsync(id);
            if (city == null)
            {
                return NotFound();
            }

            _context.City.Remove(city);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CityExists(int id)
        {
            return _context.City.Any(e => e.Id == id);
        }
    }
}
