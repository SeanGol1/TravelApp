using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TravelPlannerApp.Migrations
{
    /// <inheritdoc />
    public partial class joincode : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "JoinCode",
                table: "Plan",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "JoinCode",
                table: "Plan");
        }
    }
}
