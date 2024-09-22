using Supporting_projects.Models;

namespace Supporting_projects.DTOs
{
    public class OrederCustomDTO
    {

        public int? UserId { get; set; }
        public string? ProductDescription { get; set; } = null!;
        public IFormFile? Img { get; set; }


    }
}
