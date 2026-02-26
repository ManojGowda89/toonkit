import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/docs:
 *   get:
 *     tags: [Meta]
 *     summary: OpenAPI specification
 *     description: Returns the full OpenAPI 3.0 JSON spec for this API.
 *     responses:
 *       200:
 *         description: OpenAPI spec JSON
 */

// Full OpenAPI 3.0 specification for the toonkit API
const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "toonkit Employee API",
    version: "1.0.0",
    description:
      "REST API built with toonkit — uses **TOON (Typed Object Oriented Notation)** as the data transport format instead of JSON. All request and response bodies are `text/plain` TOON strings.",
    contact: {
      name: "Manoj Gowda",
      url: "https://manojgowda.in",
    },
    license: {
      name: "MIT",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local development",
    },
  ],
  tags: [
    {
      name: "Employees",
      description: "Employee CRUD operations using TOON format",
    },
    {
      name: "Utility",
      description: "TOON ↔ JSON conversion helpers",
    },
    {
      name: "Meta",
      description: "API documentation and health",
    },
  ],
  paths: {
    "/api/employees": {
      post: {
        tags: ["Employees"],
        summary: "Add employees",
        description:
          "Accepts a TOON-formatted plain text body. Parses the employee records and appends them to the in-memory store. Returns the full updated list as TOON.",
        operationId: "addEmployees",
        requestBody: {
          required: true,
          content: {
            "text/plain": {
              schema: {
                type: "string",
                description: "TOON-formatted employee data",
              },
              examples: {
                single: {
                  summary: "Add one employee",
                  value:
                    "employees[1]{id:n,name:s,salary:n,active:b}:\n1,Riya,90000,true",
                },
                multiple: {
                  summary: "Add multiple employees",
                  value:
                    "employees[2]{id:n,name:s,salary:n,active:b}:\n1,Riya,90000,true\n2,John,80000,false",
                },
                withDepartment: {
                  summary: "Employees + department meta",
                  value:
                    "meta{dept:s,location:s}:\nEngineering,Bangalore\n\nemployees[2]{id:n,name:s,salary:n,active:b}:\n1,Riya,90000,true\n2,John,80000,false",
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Updated employee list in TOON format",
            content: {
              "text/plain": {
                schema: { type: "string" },
                example:
                  "employees[2]{id:n,name:s,salary:n,active:b}:\n1,Riya,90000,true\n2,John,80000,false",
              },
            },
          },
          400: {
            description: "Invalid or malformed TOON input",
            content: {
              "text/plain": {
                schema: { type: "string" },
                example: "status=error;message=invalid toon",
              },
            },
          },
        },
      },
      get: {
        tags: ["Employees"],
        summary: "Get all employees",
        description:
          "Returns all stored employees as a TOON-formatted plain text response. Returns 204 if no records exist.",
        operationId: "getEmployees",
        responses: {
          200: {
            description: "All employees in TOON format",
            content: {
              "text/plain": {
                schema: { type: "string" },
                example:
                  "employees[3]{id:n,name:s,salary:n,active:b}:\n1,Riya,90000,true\n2,John,80000,false\n3,Alex,95000,true",
              },
            },
          },
          204: {
            description: "No employees found",
          },
        },
      },
    },
    "/api/convert": {
      post: {
        tags: ["Utility"],
        summary: "Convert TOON → JSON",
        description:
          "Accepts a raw TOON string and returns the parsed JavaScript object as JSON. Useful for frontend debugging and testing.",
        operationId: "convertToonToJson",
        requestBody: {
          required: true,
          content: {
            "text/plain": {
              schema: { type: "string" },
              examples: {
                basic: {
                  summary: "Basic conversion",
                  value:
                    "employees[2]{id:n,name:s,salary:n,active:b}:\n1,Riya,90000,true\n2,John,80000,false",
                },
                allTypes: {
                  summary: "All TOON types",
                  value:
                    "sample[1]{age:n,name:s,active:b,data:j,tags:a,value:nl}:\n25,Manoj,true,{\"x\":1},[\"a\",\"b\"],null",
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Parsed JSON object",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    employees: [
                      { id: 1, name: "Riya", salary: 90000, active: true },
                      { id: 2, name: "John", salary: 80000, active: false },
                    ],
                  },
                },
              },
            },
          },
          400: {
            description: "Failed to parse TOON",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: { type: "string" },
                  },
                  example: { error: "Failed to parse TOON" },
                },
              },
            },
          },
        },
      },
    },
    "/api/docs": {
      get: {
        tags: ["Meta"],
        summary: "OpenAPI specification",
        description: "Returns the full OpenAPI 3.0 JSON spec for this API.",
        operationId: "getSwaggerSpec",
        responses: {
          200: {
            description: "OpenAPI JSON spec",
            content: {
              "application/json": {
                schema: { type: "object" },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      ToonString: {
        type: "string",
        description:
          "A TOON-formatted plain text string. Format: `resourceName[count]{field:type,...}:\\nval1,val2,...`",
        example:
          "employees[2]{id:n,name:s,salary:n,active:b}:\n1,Riya,90000,true\n2,John,80000,false",
      },
      Employee: {
        type: "object",
        properties: {
          id: { type: "number", example: 1 },
          name: { type: "string", example: "Riya" },
          salary: { type: "number", example: 90000 },
          active: { type: "boolean", example: true },
        },
        required: ["id", "name", "salary", "active"],
      },
      ToonTypes: {
        type: "object",
        description: "TOON type code reference",
        properties: {
          n: { type: "string", example: "number — 25, 3.14, -7" },
          s: { type: "string", example: "string — Manoj, hello" },
          b: { type: "string", example: "boolean — true, false" },
          nl: { type: "string", example: "null — null" },
          j: { type: "string", example: 'JSON object — {"x":1}' },
          a: { type: "string", example: 'array — ["a","b"]' },
        },
      },
    },
  },
};

export async function GET() {
  return NextResponse.json(swaggerSpec);
}