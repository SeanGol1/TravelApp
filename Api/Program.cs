using DnDCompanion.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using TravelPlannerApp.Data;

var builder = WebApplication.CreateBuilder(args);
//builder.Services.AddDbContext<TravelPlannerAppContext>(options =>
//    //options.UseSqlServer(builder.Configuration.GetConnectionString("TravelPlannerAppContext") ?? throw new InvalidOperationException("Connection string 'TravelPlannerAppContext' not found.")));
//    options.UseSqlite(builder.Configuration.GetConnectionString("TravelPlannerAppContext") ?? throw new InvalidOperationException("Connection string 'TravelPlannerAppContext' not found.")));

builder.Services.AddDbContext<TravelPlannerAppContext>(options =>
{
    //var connectionString = Environment.GetEnvironmentVariable("TRAVEL_PLANNER_AZ_CONNECTION");
    //var connectionString = builder.Configuration.GetConnectionString("TravelPlannerAppContext");
    var connectionString = "Server=tcp:travelplannerapp.database.windows.net,1433;Initial Catalog=TravelPlannerDB;Persist Security Info=False;User ID=seangol1;Password=KitkatChunky!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=True;Connection Timeout=30;";
    //var connectionString = "Data Source=TravelPlannerAppContext-b92c459d-4a09-42f2-83af-48841da9d3f1.db";
    //if (string.IsNullOrEmpty(connectionString))
    //{
    //    throw new InvalidOperationException("Connection string is not set.");
    //}

    //options.UseSqlite(connectionString);
    options.UseSqlServer(connectionString ?? throw new InvalidOperationException("Connection string 'TravelPlannerAppContext' not found."));

});

//builder.Services.AddHealthChecks().AddDbContextCheck<TravelPlannerAppContext>();
builder.Services.AddHttpClient();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IRepo, Repo>();
builder.Services.AddScoped<IUserRepo, UserRepo>();


// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddIdentityServices(builder.Configuration);

builder.Services.AddControllersWithViews().AddNewtonsoftJson(options =>
            options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();





var app = builder.Build();

app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());//.WithOrigins("https://localhost:4200", "http://localhost:4200", "http://192.168.15.216:4200", "http://85.134.166.37:4200")

//app.MapHealthChecks("/health");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//using (var scope = app.Services.CreateScope())
//{
//    var db = scope.ServiceProvider.GetRequiredService<TravelPlannerAppContext>();
//    db.Database.Migrate();
//}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
