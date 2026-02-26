import { NextRequest, NextResponse } from "next/server";
import { reqGetToon, resSendToon } from "toonkit";

/**
 * @swagger
 * tags:
 *   - name: Employees
 *     description: Employee management via TOON format
 */

/**
 * @swagger
 * /api/employees:
 *   post:
 *     tags: [Employees]
 *     summary: Add employees
 *     description: >
 *       Accepts a TOON-formatted plain text body and stores the employee records.
 *       Returns the full updated employee list as a TOON string.
 *     requestBody:
 *       required: true
 *       content:
 *         text/plain:
 *           schema:
 *             type: string
 *           examples:
 *             single:
 *               summary: Add one employee
 *               value: "employees[1]{id:n,name:s,salary:n,active:b}:\n1,Riya,90000,true"
 *             multiple:
 *               summary: Add multiple employees
 *               value: "employees[2]{id:n,name:s,salary:n,active:b}:\n1,Riya,90000,true\n2,John,80000,false"
 *     responses:
 *       200:
 *         description: Updated employee list in TOON format
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *             example: "employees[2]{id:n,name:s,salary:n,active:b}:\n1,Riya,90000,true\n2,John,80000,false"
 *       400:
 *         description: Invalid TOON input
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *             example: "status=error;message=invalid toon"
 */

// In-memory store (replace with DB in production)
let employees: Record<string, unknown>[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();

    // reqGetToon expects an Express-style req, so we adapt it for Next.js
    const parsed = reqGetToon({ body } as never);

    console.log("Received TOON:", body);
    console.log("Parsed TOON:", parsed);

    const records = Array.isArray(parsed.employees)
      ? parsed.employees
      : [parsed.employees];

    employees.push(...records);

    // Build a plain text TOON response manually for Next.js
    const { sendToon } = await import("toonkit");
    const toonResponse = sendToon({ employees: employees as any });

    return new NextResponse(toonResponse, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (err) {
    console.error(err);
    return new NextResponse("status=error;message=invalid toon", {
      status: 400,
      headers: { "Content-Type": "text/plain" },
    });
  }
}

/**
 * @swagger
 * /api/employees:
 *   get:
 *     tags: [Employees]
 *     summary: Get all employees
 *     description: Returns all stored employees as a TOON-formatted plain text response.
 *     responses:
 *       200:
 *         description: Employee list in TOON format
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *             example: "employees[2]{id:n,name:s,salary:n,active:b}:\n1,Riya,90000,true\n2,John,80000,false"
 *       204:
 *         description: No employees stored yet
 */
export async function GET() {
  if (employees.length === 0) {
    return new NextResponse(null, { status: 204 });
  }

  const { sendToon } = await import("toonkit");
  const toonResponse = sendToon({ employees : employees as any });

  return new NextResponse(toonResponse, {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
}