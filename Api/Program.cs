using DnDCompanion.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using TravelPlannerApp.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<TravelPlannerAppContext>(options =>
{
    //var connectionString = Environment.GetEnvironmentVariable("TRAVEL_PLANNER_AZ_CONNECTION");
    var connectionString = builder.Configuration.GetConnectionString("TravelPlannerAppContext");
    options.UseSqlServer(connectionString ?? throw new InvalidOperationException("Connection string not found."));

});

builder.Services.AddCors(options =>
{
    options.AddPolicy("DevCors", policy =>
    {
        policy.AllowAnyOrigin()//.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });

    options.AddPolicy("ProdCors", policy =>
    {
        policy.WithOrigins("https://backpackererapp.web.app")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

//builder.Services.AddHealthChecks().AddDbContextCheck<TravelPlannerAppContext>();
builder.Services.AddHttpClient();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IRepo, Repo>();
builder.Services.AddScoped<IUserRepo, UserRepo>();
builder.Services.AddScoped<IFunctionRepo, FunctionRepo>();


// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddIdentityServices(builder.Configuration);

builder.Services.AddControllersWithViews().AddNewtonsoftJson(options =>
            options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();





var app = builder.Build();

//app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());//.WithOrigins("https://localhost:4200", "http://localhost:4200", "http://192.168.15.216:4200", "http://85.134.166.37:4200")
if (app.Environment.IsDevelopment())
{
    app.UseCors("DevCors");
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseCors("ProdCors");
}

//app.MapHealthChecks("/health");

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

app.UseHttpsRedirection();

//app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
