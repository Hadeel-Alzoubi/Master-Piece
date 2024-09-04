namespace Supporting_projects.DTOs
{
    public class FavoriteDTO
    {
        public int FavoriteId { get; set; }

        public int? UserId { get; set; }

        public productFDTO Product { get; set; }

    }

    public class productFDTO
    {
        public int ProductId { get; set; }

        public string? ProductName { get; set; }

        public string? ImageUrl { get; set; }

        public decimal? Price { get; set; }
    }

}
