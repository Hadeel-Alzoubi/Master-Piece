using Supporting_projects.Models;

namespace Supporting_projects.DTOs
{
    public class OrderDTO
    {

        public string? Status { get; set; }

        public int? Quantity { get; set; }

        public double? TotalAmount { get; set; }

        public int? UserId { get; set; }

    }
}
