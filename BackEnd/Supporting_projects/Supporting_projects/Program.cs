using DinkToPdf.Contracts;
using DinkToPdf;
using Microsoft.EntityFrameworkCore;
using Supporting_projects.Models;

namespace Supporting_projects
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
                });

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Configure CORS policy
            builder.Services.AddCors(options =>
                options.AddPolicy("Development", corsBuilder =>
                {
                    corsBuilder.AllowAnyOrigin()
                               .AllowAnyMethod()
                               .AllowAnyHeader();
                })
            );

            // Configure the DbContext with the connection string
            builder.Services.AddDbContext<MyDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("YourConnectionString"))); // Replace 'YourConnectionString' with the actual name from appsettings.json

            builder.Services.AddSingleton<IConverter, SynchronizedConverter>(provider =>
            new SynchronizedConverter(new PdfTools()));

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            // Use CORS policy
            app.UseCors("Development");

            app.MapControllers();

            app.Run();
        }
    }
}
