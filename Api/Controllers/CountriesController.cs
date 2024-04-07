using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Humanizer;
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
    public class CountriesController : ControllerBase
    {
        private readonly IRepo _repo;

        public CountriesController( IRepo repo)
        {
            _repo = repo;
        }

        // GET: api/Countries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Country>>> GetCountry()
        {
            return Ok( await _repo.GetCountryAsync());
        }

        // GET: api/Countries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Country>> GetCountry(int id)
        {
            var country = await _repo.GetCountrybyIdAsync(id);

            if (country == null)
            {
                return NotFound();
            }

            return country;
        }

        // PUT: api/Countries/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCountry(int id, Country country)
        {
            if (id != country.Id)
            {
                return BadRequest();
            }

            

            try
            {
                await _repo.UpdateCountryAsync(country);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await CountryExists(id))
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

        // POST: api/Countries
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Country>> PostCountry(CreateCountryDto dto)
        {
            Country country = new Country();
            country.Name = dto.Name;
            country.StartDate = dto.StartDate;
            country.EndDate = dto.EndDate;
            country.Plan = await _repo.GetPlanbyIdAsync(dto.PlanId);
            await _repo.PostCountryAsync(country);

            return CreatedAtAction("GetCountry", new { id = country.Id }, country);
        }


        [Route("update")]
        [HttpPost]
        public async Task<ActionResult<Country>> UpdateCountry(UpdateCountryDto dto)
        {
            Country country = await _repo.GetCountrybyIdAsync(dto.Id);
            country.StartDate = dto.StartDate;
            country.EndDate = dto.EndDate;
            country.Name = dto.Name;
            if(await CountryExists(dto.Id))
            {
                await _repo.UpdateCountryAsync(country);
            }
            else { return BadRequest(); }

            return CreatedAtAction("GetCountry", new { id = country.Id }, country);
        }

        // DELETE: api/Countries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCountry(int id)
        {
            //var country = await _context.Country.FindAsync(id);
            //if (country == null)
            //{
            //    return NotFound();
            //}

            //_context.Country.Remove(country);
            //await _context.SaveChangesAsync();

            return NoContent();
        }

        private async Task<bool> CountryExists(int id)
        {
            return await _repo.CountryExists(id);
        }
    }
}
