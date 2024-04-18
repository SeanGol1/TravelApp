using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using TravelPlannerApp.Data;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<TravelPlannerAppContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("TravelPlannerAppContext") ?? throw new InvalidOperationException("Connection string 'TravelPlannerAppContext' not found.")));

builder.Services.AddScoped<IRepo, Repo>();

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddControllersWithViews().AddNewtonsoftJson(options =>
            options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



var app = builder.Build();

app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());//.WithOrigins("https://localhost:4200", "http://localhost:4200", "http://192.168.15.216:4200", "http://85.134.166.37:4200")


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
