test("Deve retornar 405 para caso uma request não seja POST ou GET", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "PUT",
  });
  const responseBody1 = await response1.json();

  expect(response1.status).toBe(405);
});
