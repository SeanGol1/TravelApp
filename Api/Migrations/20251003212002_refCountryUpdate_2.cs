using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TravelPlannerApp.Migrations
{
    /// <inheritdoc />
    public partial class refCountryUpdate_2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Capital",
                table: "RefCountry",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CurrencyName",
                table: "RefCountry",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CurrencySymbol",
                table: "RefCountry",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GoogleMapsLink",
                table: "RefCountry",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Lat",
                table: "RefCountry",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Lng",
                table: "RefCountry",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Subregion",
                table: "RefCountry",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Timezones",
                table: "RefCountry",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Capital",
                table: "RefCountry");

            migrationBuilder.DropColumn(
                name: "CurrencyName",
                table: "RefCountry");

            migrationBuilder.DropColumn(
                name: "CurrencySymbol",
                table: "RefCountry");

            migrationBuilder.DropColumn(
                name: "GoogleMapsLink",
                table: "RefCountry");

            migrationBuilder.DropColumn(
                name: "Lat",
                table: "RefCountry");

            migrationBuilder.DropColumn(
                name: "Lng",
                table: "RefCountry");

            migrationBuilder.DropColumn(
                name: "Subregion",
                table: "RefCountry");

            migrationBuilder.DropColumn(
                name: "Timezones",
                table: "RefCountry");
        }
    }
}
