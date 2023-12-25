import { NextResponse, NextRequest } from "next/server";
import * as ExcelJS from "exceljs";
import { parseExcelToStockArray } from "@/utils/excelParser";
import { createProductDump } from "@/services/database/stock";

export async function GET() {
  return NextResponse.json({ name: "Anuj Singh" });
}

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const workbook = new ExcelJS.Workbook();
  const excelFile = await workbook.xlsx.load(buffer);
  const worksheetsNames: string[] = [];

  console.log(workbook.created);
  excelFile.worksheets.forEach((worksheet) =>
    worksheetsNames.push(worksheet.name)
  );
  const stockproducts = await parseExcelToStockArray(excelFile);
  const createNewDump = await createProductDump(stockproducts, "Allan");

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  // const path = `home/kidmortal/codigos/${file.name}`;
  // await writeFile(path, buffer);
  // console.log(`open ${path} to see the uploaded file`);

  return NextResponse.json({ result: createNewDump });
}
