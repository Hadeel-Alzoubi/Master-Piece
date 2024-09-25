using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Supporting_projects.DTOs;
using Supporting_projects.Models;

namespace Supporting_projects.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        MyDbContext _db;
        public CategoriesController(MyDbContext db)
        {
            _db = db;
        }

        [Route("GetAllCategory")]
        [HttpGet]
        public IActionResult GetAll()
        {
            var category = _db.Categories.ToList();
            return Ok(category);
        }

        [Route("GetCategoryByID")]
        [HttpGet]
        public IActionResult GetById(int id)
        {
            var category = _db.Categories.FirstOrDefault(c => c.CategoryId == id);
            return Ok(category);
        }



        //this API for the Supper Admin 
        [Route("AddCategory")]
        [HttpPost]
        public IActionResult AddCategory([FromForm] CategoryRequestDTO categoryDTO)
        {
            var data = new Category
            {
                CategoryName = categoryDTO.CategoryName,
                Description = categoryDTO.Description,

            };

            _db.Categories.Add(data);
            _db.SaveChanges();
            return Ok(categoryDTO);
        }

        //this API for the Supper Admin 
        [Route("Edit")]
        [HttpPut]
        public  IActionResult EditCategory(int id, [FromForm] CategoryRequestDTO categoryDTO)
        {
            var uploadImageFolder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
            if (!Directory.Exists(uploadImageFolder))
            {
                Directory.CreateDirectory(uploadImageFolder);
            }
            var imageFile = Path.Combine(uploadImageFolder, categoryDTO.CategoryImg.FileName);

            var category = _db.Categories.FirstOrDefault(c => c.CategoryId == id);

            category.CategoryName = categoryDTO.CategoryName;
            category.Description = categoryDTO.Description;
            category.CategoryImg = categoryDTO.CategoryImg.FileName;
            _db.SaveChanges();
            return Ok();
        }

        [HttpDelete("DeleteCategory")]
        public IActionResult DeleteCategory(int id)
        {
            var category = _db.Categories.FirstOrDefault(x => x.CategoryId == id);
            _db.Categories.Remove(category);
            _db.SaveChanges();
            return Ok();
        }
    }
}
