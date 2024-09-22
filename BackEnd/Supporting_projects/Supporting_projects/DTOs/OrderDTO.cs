using Supporting_projects.Models;

namespace Supporting_projects.DTOs
{
    public class OrderDTO
    {
        public int? UserId { get; set; }

        public double? TotalAmount { get; set; }

        public string? PaymentMethod { get; set; }

        public string? Status { get; set; }

        public string? ShippingAddress { get; set; }



    }
}
