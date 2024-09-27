using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Supporting_projects.DTOs;
using Supporting_projects.Models;

namespace Supporting_projects.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TraineeController : ControllerBase
    {
        private readonly MyDbContext _db;
        public TraineeController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult categoryByID(int id)
        {
            var category = _db.Trainees.Where(x => x.Course == id).ToList();
            return Ok(category);
        }


        [HttpPost]
        public IActionResult Trainee([FromForm] traineeDTO trainee)
        {

            var data = new Trainee
            {
                Email = trainee.Email,
                Name = trainee.Name,
                Phone = trainee.Phone,
                Course = trainee.Course,
            };


            _db.Trainees.Add(data);
            _db.SaveChanges();
            return Ok(data);
        }

        //[HttpPost("ApproveTrainee")]


        [HttpDelete]
        public IActionResult deleteTrainee(int id)
        {
            var trainee = _db.Trainees.FirstOrDefault(x =>x.TraineeId == id);
            if (trainee == null)
            {
                return NotFound();
            }

            else
            {
                _db.Trainees.Remove(trainee);
                return Ok(trainee);
            }
        }
    }
}
