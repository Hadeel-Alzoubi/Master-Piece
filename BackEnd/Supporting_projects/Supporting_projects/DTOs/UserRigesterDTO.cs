namespace Supporting_projects.DTOs
{
    public class UserRigesterDTO
    {
        public string UserName { get; set; } = null!;

        public string? Phone { get; set; }

        public string? Address { get; set; }

        public string? ConfirmPassword { get; set; }

        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;

    }
}
