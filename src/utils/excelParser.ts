"use server";
import * as ExcelJS from "exceljs";

export type ExcelStockProduct = {
  sku: string;
  stock: number;
  type: string;
};

export type ExcelStockRuleProduct = {
  sku: string;
  publishCode: string;
  stockRule: number;
  price: number;
  category: string;
};

export async function parseExcelToStockRuleArray(excelFile: ExcelJS.Workbook) {
  const products: ExcelStockRuleProduct[] = [];
  excelFile.worksheets.forEach((worksheet) => {
    const category = worksheet.name;
    const rows = worksheet.getRows(1, worksheet.rowCount);
    rows?.forEach((row) => {
      const sku = row.getCell(1).toString();
      const publishCode = row.getCell(2).toString();
      const stockRule = parseInt(row.getCell(3).toString());
      const price = parseFloat(row.getCell(4).toString());
      if (stockRule && price) {
        products.push({
          sku,
          publishCode,
          stockRule,
          price,
          category,
        });
      }
    });
  });
  return products;
}

export async function parseExcelToStockArray(excelFile: ExcelJS.Workbook) {
  const stockDump: ExcelStockProduct[] = [];
  const sheet = excelFile.getWorksheet(1);
  const rows = sheet?.getRows(2, sheet.rowCount);
  rows?.forEach((row) => {
    const stock = parseInt(row.getCell(3).value?.toString() ?? "");
    const sku = row.getCell(5).value?.toString() ?? "";
    const type = row.getCell(2).value?.toString() ?? "";

    const rowData = {
      sku,
      stock,
      type,
    };

    if (stock && sku) {
      console.log(rowData);
      stockDump.push(rowData);
    }
  });
  return stockDump;
}
