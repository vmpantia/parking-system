using Microsoft.EntityFrameworkCore;
using PS.BAL.Contractors;
using PS.BAL.Helpers;
using PS.BAL.Models;
using PS.BAL.Services;
using PS.DAL.Database;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

#region Database Configuration
builder.Services.AddDbContext<PSDbContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("MigrationDB")));
#endregion

#region AutoMapper Configuration
builder.Services.AddAutoMapper(typeof(AutoMapperProfile));
#endregion

#region Services
builder.Services.AddScoped<IService<CustomerDTO>, CustomerService>();
#endregion

builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
