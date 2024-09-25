using Supporting_projects.Models;

namespace Supporting_projects.DTOs
{
    public class CategoryRequestDTO
    {

        public string CategoryName { get; set; } = null!;

        public string? Description { get; set; }

        public IFormFile? CategoryImg { get; set; }


    }
}
