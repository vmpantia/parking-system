using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PS.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddRelationshipInTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "InternalID",
                table: "Customers",
                newName: "ID");

            migrationBuilder.RenameColumn(
                name: "Customer_InternalID",
                table: "Cars",
                newName: "CustomerID");

            migrationBuilder.RenameColumn(
                name: "InternalID",
                table: "Cars",
                newName: "ID");

            migrationBuilder.CreateIndex(
                name: "IX_Cars_CustomerID",
                table: "Cars",
                column: "CustomerID");

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_Customers_CustomerID",
                table: "Cars",
                column: "CustomerID",
                principalTable: "Customers",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cars_Customers_CustomerID",
                table: "Cars");

            migrationBuilder.DropIndex(
                name: "IX_Cars_CustomerID",
                table: "Cars");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "Customers",
                newName: "InternalID");

            migrationBuilder.RenameColumn(
                name: "CustomerID",
                table: "Cars",
                newName: "Customer_InternalID");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "Cars",
                newName: "InternalID");
        }
    }
}
