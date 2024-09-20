namespace Supporting_projects.DTOs
{
    public interface IEmailService
    {
            void SendEmail(string to, string subject, string body);

    }
}
