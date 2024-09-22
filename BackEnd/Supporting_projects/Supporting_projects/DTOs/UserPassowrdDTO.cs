namespace Supporting_projects.DTOs
{
    public class UserPassowrdDTO
    {
        public string? OldPassword { get; set; }

        public string? Password { get; set; } = null!;

        public string? ConfirmPassword { get; set; }
    }
}
