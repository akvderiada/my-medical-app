import { pool } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Requirement: Use SQL Join to show UOM Name and Category Name [cite: 35-37]
    const query = `
      SELECT mt.name, tc.name AS category, u.name AS unit, mt.normalmin, mt.normalmax
      FROM medicaltests mt
      JOIN testcategories tc ON mt.idcategory = tc.id
      JOIN uom u ON mt.iduom = u.id;
    `; 
    
    const result = await pool.query(query);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
