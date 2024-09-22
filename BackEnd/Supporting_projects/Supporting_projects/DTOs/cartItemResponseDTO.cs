namespace Supporting_projects.DTOs
{
    public class cartItemResponseDTO
    {
        public int CartItemId { get; set; }

        public int? CartId { get; set; }

        public productDTO? Product { get; set; }

        public int? Quantity { get; set; }
    }

    public class productDTO
    {
        public int ProductId { get; set; }

        public string? ProductName { get; set; }

        public string? ImageUrl { get; set; }

        public decimal? Price { get; set; }

        public decimal? PriceWithDiscount { get; set; }


    }
}
