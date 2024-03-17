const { createKey } = require("next/dist/shared/lib/router/router");

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();

  expect(response.status).toBe(200);

  const parsedUpdatedAt = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toBeDefined();
  expect(responseBody.update_at).toBe(parsedUpdatedAt);

  expect(responseBody.dependencies.database.max_connections).toBeDefined();
  expect(responseBody.dependencies.database.max_connections).not.toBeNull();
  expect(typeof responseBody.dependencies.database.max_connections).toBe(
    "number",
  );

  expect(responseBody.dependencies.database.opened_connections).toEqual(1);

  expect(responseBody.dependencies.database.version).toEqual("16.0");
  expect(responseBody.dependencies.database.version).toBeDefined();
});
