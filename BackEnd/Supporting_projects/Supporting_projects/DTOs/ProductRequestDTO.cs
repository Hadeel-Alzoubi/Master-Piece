using Supporting_projects.Models;

namespace Supporting_projects.DTOs
{
    public class ProductRequestDTO
    {
        public int? AdminProduct { get; set; }

        public string? ProductName { get; set; } = null!;

        public int? CategoryId { get; set; }

        public decimal? Price { get; set; }

        public int? StockQuantity { get; set; }

        public string? Description { get; set; }

        public IFormFile? ImageUrl { get; set; }



    }

    //public class user
    //{
    //    public int? Id { get; set; }
    //}

}
