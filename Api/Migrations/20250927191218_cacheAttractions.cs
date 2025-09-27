using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TravelPlannerApp.Migrations
{
    /// <inheritdoc />
    public partial class cacheAttractions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Location",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Lat = table.Column<double>(type: "float", nullable: false),
                    Lng = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Location", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OpeningHours",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OpenNow = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OpeningHours", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Geometry",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LocationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Geometry", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Geometry_Location_LocationId",
                        column: x => x.LocationId,
                        principalTable: "Location",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "refCityAttractions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PlaceId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CityName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Formatted_Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GeometryId = table.Column<int>(type: "int", nullable: false),
                    Rating = table.Column<double>(type: "float", nullable: false),
                    Opening_HoursId = table.Column<int>(type: "int", nullable: false),
                    Website = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastUpdateDate = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_refCityAttractions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_refCityAttractions_Geometry_GeometryId",
                        column: x => x.GeometryId,
                        principalTable: "Geometry",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_refCityAttractions_OpeningHours_Opening_HoursId",
                        column: x => x.Opening_HoursId,
                        principalTable: "OpeningHours",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AttractionPhoto",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Height = table.Column<int>(type: "int", nullable: false),
                    Width = table.Column<int>(type: "int", nullable: false),
                    Photo_Reference = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Html_Attributions = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RefCityAttractionsId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AttractionPhoto", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AttractionPhoto_refCityAttractions_RefCityAttractionsId",
                        column: x => x.RefCityAttractionsId,
                        principalTable: "refCityAttractions",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AttractionPhoto_RefCityAttractionsId",
                table: "AttractionPhoto",
                column: "RefCityAttractionsId");

            migrationBuilder.CreateIndex(
                name: "IX_Geometry_LocationId",
                table: "Geometry",
                column: "LocationId");

            migrationBuilder.CreateIndex(
                name: "IX_refCityAttractions_GeometryId",
                table: "refCityAttractions",
                column: "GeometryId");

            migrationBuilder.CreateIndex(
                name: "IX_refCityAttractions_Opening_HoursId",
                table: "refCityAttractions",
                column: "Opening_HoursId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AttractionPhoto");

            migrationBuilder.DropTable(
                name: "refCityAttractions");

            migrationBuilder.DropTable(
                name: "Geometry");

            migrationBuilder.DropTable(
                name: "OpeningHours");

            migrationBuilder.DropTable(
                name: "Location");
        }
    }
}
