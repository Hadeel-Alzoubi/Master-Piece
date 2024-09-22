using Supporting_projects.Models;

namespace Supporting_projects.DTOs
{
    public class CustomOrderDTO
    {
        //public int RequestId { get; set; }

        public string ProductDescription { get; set; } = null!;

        public string? Status { get; set; }

        public UserDTO? User { get; set; }

    }

    public class UserDTO
    {
        public string UserName { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string? Phone { get; set; }

        public string? Address { get; set; }

    }
}
