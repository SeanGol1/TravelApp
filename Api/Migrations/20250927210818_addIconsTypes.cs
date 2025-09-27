using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TravelPlannerApp.Migrations
{
    /// <inheritdoc />
    public partial class addIconsTypes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Icon",
                table: "refCityAttractions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "IconBackgroundColor",
                table: "refCityAttractions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "IconMaskBaseUri",
                table: "refCityAttractions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Types",
                table: "refCityAttractions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "[]");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Icon",
                table: "refCityAttractions");

            migrationBuilder.DropColumn(
                name: "IconBackgroundColor",
                table: "refCityAttractions");

            migrationBuilder.DropColumn(
                name: "IconMaskBaseUri",
                table: "refCityAttractions");

            migrationBuilder.DropColumn(
                name: "Types",
                table: "refCityAttractions");
        }
    }
}
