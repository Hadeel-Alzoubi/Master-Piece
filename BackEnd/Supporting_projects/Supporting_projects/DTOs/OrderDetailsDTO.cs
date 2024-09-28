using Supporting_projects.Models;

namespace Supporting_projects.DTOs
{

    public class OrdersDTO
    {
        public int? CartId { get; set; }

        public int UserId { get; set; }

        public decimal TotalAmount { get; set; }

        public int Quantity { get; set; }

    }


}
