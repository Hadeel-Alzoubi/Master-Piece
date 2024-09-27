using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Supporting_projects.DTOs;
using Supporting_projects.Models;

namespace Supporting_projects.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactUsController : ControllerBase
    {
        private readonly MyDbContext _db;
        public ContactUsController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult GetContactInfo()
        {
            var contact = _db.ContactForms.ToList();
            return Ok(contact);
        }

        [HttpPost]
        public IActionResult SetContact([FromForm] ContactDTO contact)
        {
            if (contact.Email == null)
            {
                return BadRequest("اتلرجاء ادخال البريد الالكترزوني");
            }

            var data = new ContactForm
            {
                Email = contact.Email,
                Name = contact.Name,
                Message = contact.Message,
            };

            _db.ContactForms.Add(data);
            _db.SaveChanges();
            return Ok(data);
        }
    }
}
