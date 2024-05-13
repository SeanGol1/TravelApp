using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TravelPlannerApp.Migrations
{
    /// <inheritdoc />
    public partial class readonlyuser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsAdmin",
                table: "UserPlan",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsAdmin",
                table: "UserPlan");
        }
    }
}
