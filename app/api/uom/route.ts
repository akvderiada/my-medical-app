import { pool } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // This fetches all data from the units of measure table [cite: 5-9]
    const result = await pool.query('SELECT * FROM uom ORDER BY name ASC');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Database error in UOM API:", error);
    return NextResponse.json({ error: "Failed to fetch UOM data" }, { status: 500 });
  }
}
