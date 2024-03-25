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
