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
    public class ChecklistItemsController : ControllerBase
    {
        private readonly TravelPlannerAppContext _context;
        private readonly IRepo _repo;
        public ChecklistItemsController(TravelPlannerAppContext context, IRepo repo)
        {
            _context = context;
            _repo = repo;
        }

        // GET: api/ChecklistItems
        [HttpGet]
        public async Task<IEnumerable<ChecklistItem>> GetChecklistItem()
        {
            return await _repo.GetChecklistItemAsync();
        }

        // GET: api/ChecklistItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ChecklistItem>> GetChecklistItem(int id)
        {
            var checklistItem = await _repo.GetChecklistItembyIdAsync(id);

            if (checklistItem == null)
            {
                return NotFound();
            }

            return checklistItem;
        }

        // GET: api/ChecklistItems/5
        [HttpGet("list/{id}")]
        public async Task<IEnumerable<ChecklistItem>> GetChecklistItemByCountyId(int id)
        {
            return await _repo.GetChecklistItemByCountryAsync(id); 
        }



        // PUT: api/ChecklistItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChecklistItem(int id, ChecklistItem checklistItem)
        {
            if (id != checklistItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(checklistItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChecklistItemExists(id))
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

        // POST: api/ChecklistItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ChecklistItem>> PostChecklistItem(CreateChecklistItemDto dto)
        {
            ChecklistItem checklistItem = new ChecklistItem();
            checklistItem.Name = dto.Name;
            checklistItem.Country = await _repo.GetCountrybyIdAsync(dto.CountryId);
            checklistItem.Completed = false;
            checklistItem = await _repo.PostChecklistItemAsync(checklistItem);

            return CreatedAtAction("GetChecklistItem", new { id = checklistItem.Id }, checklistItem);
        }

        [Route("update")]
        [HttpPost]
        public async Task<ActionResult<ChecklistItem>> UpdateChecklistItem(UpdateChecklistItemDto dto)
        {
            ChecklistItem checklistItem = await _repo.GetChecklistItembyIdAsync(dto.Id);
            checklistItem.Name = dto.Name;
            checklistItem.Country = await _repo.GetCountrybyIdAsync(dto.CountryId);
            checklistItem.Completed = dto.Completed;
            checklistItem = await _repo.UpdateChecklistItemAsync(checklistItem);

            return CreatedAtAction("GetChecklistItem", new { id = checklistItem.Id }, checklistItem);
        }

        // DELETE: api/ChecklistItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteChecklistItem(int id)
        {
            var checklistItem = await _context.ChecklistItem.FindAsync(id);
            if (checklistItem == null)
            {
                return NotFound();
            }

            _context.ChecklistItem.Remove(checklistItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ChecklistItemExists(int id)
        {
            return _context.ChecklistItem.Any(e => e.Id == id);
        }
    }
}
