using Supporting_projects.Models;

namespace Supporting_projects.DTOs
{
    //public class OrderDetailsDTO
    //{
    //    //public int OrderId { get; set; }

    //    //public int? ProductId { get; set; }

    //    public int Quantity { get; set; }

    //    //public decimal Price { get; set; }

    //    public productD? product { get; set; }

    //}
    //public class productD
    //{
    //    public int? ProductId { get; set; }

    //    public string? ProductName { get; set; }

    //    //public string? ImageUrl { get; set; }

    //    public decimal? Price { get; set; }

    //    //public decimal? PriceWithDiscount { get; set; }


    //}
    public class OrdersDTO
{
    public int UserId { get; set; }
    public decimal TotalAmount { get; set; }
    public int Quantity { get; set; }
    public List<OrderDetailDTO> OrderDetails { get; set; }
}

public class OrderDetailDTO
{
    public int ProductId { get; set; }
    public int Quantity { get; set; }
}

}
