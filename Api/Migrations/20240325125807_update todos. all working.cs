using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TravelPlannerApp.Migrations
{
    /// <inheritdoc />
    public partial class updatetodosallworking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_ToDo_CountryId",
                table: "ToDo",
                column: "CountryId");

            migrationBuilder.AddForeignKey(
                name: "FK_ToDo_Country_CountryId",
                table: "ToDo",
                column: "CountryId",
                principalTable: "Country",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ToDo_Country_CountryId",
                table: "ToDo");

            migrationBuilder.DropIndex(
                name: "IX_ToDo_CountryId",
                table: "ToDo");
        }
    }
}
