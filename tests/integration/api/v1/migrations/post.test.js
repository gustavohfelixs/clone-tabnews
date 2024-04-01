import database from "infra/database";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("Deve acionar a migration up", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  const responseBody1 = await response1.json();

  expect(response1.status).toBe(201);

  expect(Array.isArray(responseBody1)).toBe(true);

  expect(responseBody1.length).toBeGreaterThan(0);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  const responseBody2 = await response2.json();

  expect(response2.status).toBe(200);

  expect(Array.isArray(responseBody2)).toBe(true);

  expect(responseBody2.length).toBe(0);
});

// test("Deve acionar a migration up", async () => {
//   const response = await fetch("http://localhost:3000/api/v1/migrations", {
//     method: "POST",
//   });
//   const responseBody = await response.json();

//   expect(response.status).toBe(200);

//   expect(Array.isArray(responseBody)).toBe(true);

//   const runnedMigrations = await database.query("SELECT * FROM pgmigrations;");
//   expect(runnedMigrations.rowCount).toBeGreaterThan(0);

//   const tablesInDatabase = await database.query(
//     "SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema';",
//   );
//   expect(tablesInDatabase.rows[1].tablename).toBe("test");
//   expect(tablesInDatabase.rowCount).toBeGreaterThan(1);
// });
