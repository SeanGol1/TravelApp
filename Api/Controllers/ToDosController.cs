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
    public class ToDosController : ControllerBase
    {
        private readonly TravelPlannerAppContext _context;
        private readonly IRepo _repo;

        public ToDosController(TravelPlannerAppContext context, IRepo repo)
        {
            _context = context;
            _repo = repo;
        }

        // GET: api/ToDos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ToDo>>> GetToDo()
        {
            return await _context.ToDo.ToListAsync();
        }

        // GET: api/ToDos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ToDo>> GetToDo(int id)
        {
            var toDo = await _context.ToDo.FindAsync(id);

            if (toDo == null)
            {
                return NotFound();
            }

            return toDo;
        }

        // PUT: api/ToDos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutToDo(int id, ToDo toDo)
        {
            if (id != toDo.Id)
            {
                return BadRequest();
            }

            _context.Entry(toDo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ToDoExists(id))
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

        // POST: api/ToDos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ToDo>> PostToDo(CreateToDoDto dto)
        {
            ToDo todo = new ToDo();
            todo.Name = dto.Name;
            todo.Country = await _repo.GetCountrybyIdAsync(dto.CountryId);
            todo.City = await _repo.GetCitybyIdAsync(dto.CityId);
            _repo.PostToDoAsync(todo);

            return CreatedAtAction("GetToDo", new { id = todo.Id }, todo);
        }

        [Route("update")]
        [HttpPost]
        public async Task<ActionResult<ToDo>> UpdateToDo(UpdateToDoDto dto)
        {
            ToDo todo = await _repo.GetToDobyIdAsync(dto.Id);
            todo.Name = dto.Name;
            todo.SortOrder = dto.SortOrder;
            todo.City = await _repo.GetCitybyIdAsync(dto.CityId);
            todo.Country = await _repo.GetCountrybyIdAsync(dto.CountryId);
            if (ToDoExists(dto.Id))
            {
                await _repo.UpdateToDoAsync(todo);
            }
            else { return BadRequest(); }

            return CreatedAtAction("GetTodo", new { id = todo.Id }, todo);
        }

        // DELETE: api/ToDos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteToDo(int id)
        {
            var toDo = await _context.ToDo.FindAsync(id);
            if (toDo == null)
            {
                return NotFound();
            }

            _context.ToDo.Remove(toDo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ToDoExists(int id)
        {
            return _context.ToDo.Any(e => e.Id == id);
        }
    }
}
