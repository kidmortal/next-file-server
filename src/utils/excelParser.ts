"use server";
import * as ExcelJS from "exceljs";

export type ExcelStockProduct = {
  sku: string;
  stock: number;
};

export async function parseExcelToStockArray(excelFile: ExcelJS.Workbook) {
  const stockDump: ExcelStockProduct[] = [];
  const sheet = excelFile.getWorksheet(1);
  const rows = sheet?.getRows(2, sheet.rowCount);
  rows?.forEach((row) => {
    const stock = parseInt(row.getCell(3).value?.toString() ?? "");
    const sku = row.getCell(5).value?.toString() ?? "";
    const rowData = {
      sku,
      stock,
    };

    if (stock && sku) {
      console.log(rowData);
      stockDump.push(rowData);
    }
  });
  return stockDump;
}
