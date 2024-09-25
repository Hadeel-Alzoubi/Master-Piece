using Supporting_projects.Models;

namespace Supporting_projects.DTOs
{
    public class OrderUserDTO
    {
        public int OrderId { get; set; }

        public DateTime? OrderDate { get; set; }

        public string? Status { get; set; }

        public double? TotalAmount { get; set; }


    }
}
