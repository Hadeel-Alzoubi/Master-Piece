using Supporting_projects.Models;
using System.ComponentModel.DataAnnotations;

namespace Supporting_projects.DTOs
{
    public class UserRequestDTO
    {  
        [Required]
        public string UserName { get; set; } = null!;

        [Required]
        public string Password { get; set; } = null!;

        public string? ConfirmPassword { get; set; }

        [Required]
        public string Email { get; set; } = null!;

        public string? Phone { get; set; }

        public string? Address { get; set; }

    }
}
