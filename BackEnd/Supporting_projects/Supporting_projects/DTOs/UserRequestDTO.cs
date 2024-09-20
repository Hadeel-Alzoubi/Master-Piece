using Supporting_projects.Models;

namespace Supporting_projects.DTOs
{
    //هاي للتسجيل الاشتراك
    public class UserRequestDTO
    {
        public string UserName { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string? Phone { get; set; }

        public string? Address { get; set; }

        public string? ConfirmPassword { get; set; }


    }
}
