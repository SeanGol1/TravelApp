using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TravelPlannerApp.Migrations
{
    /// <inheritdoc />
    public partial class removeOpeningtime : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_refCityAttractions_OpeningHours_Opening_HoursId",
                table: "refCityAttractions");

            migrationBuilder.DropTable(
                name: "OpeningHours");

            migrationBuilder.DropIndex(
                name: "IX_refCityAttractions_Opening_HoursId",
                table: "refCityAttractions");

            migrationBuilder.DropColumn(
                name: "Opening_HoursId",
                table: "refCityAttractions");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Opening_HoursId",
                table: "refCityAttractions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "OpeningHours",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OpenNow = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OpeningHours", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_refCityAttractions_Opening_HoursId",
                table: "refCityAttractions",
                column: "Opening_HoursId");

            migrationBuilder.AddForeignKey(
                name: "FK_refCityAttractions_OpeningHours_Opening_HoursId",
                table: "refCityAttractions",
                column: "Opening_HoursId",
                principalTable: "OpeningHours",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
