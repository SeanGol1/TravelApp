using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TravelPlannerApp.Migrations
{
    /// <inheritdoc />
    public partial class refCountryUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Iso2",
                table: "RefCountry");

            migrationBuilder.RenameColumn(
                name: "Iso3",
                table: "RefCountry",
                newName: "Code");

            migrationBuilder.AlterColumn<string>(
                name: "Region",
                table: "RefCountry",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Code",
                table: "RefCountry",
                newName: "Iso3");

            migrationBuilder.AlterColumn<string>(
                name: "Region",
                table: "RefCountry",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Iso2",
                table: "RefCountry",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
