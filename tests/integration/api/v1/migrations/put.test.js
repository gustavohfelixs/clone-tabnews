import database from "infra/database";

test("Deve retornar 405 para caso uma request não seja POST ou GET", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "PUT",
  });
  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "PUT",
  });

  const responseBody1 = await response1.json();
  const responseBody2 = await response2.json();

  const activeConnections = await fetch("http://localhost:3000/api/v1/status");
  const responseConnections = await activeConnections.json();

  expect(response1.status).toBe(405);
  expect(response2.status).toBe(405);

  expect(responseConnections.dependencies.database.opened_connections).toBe(1);
});
