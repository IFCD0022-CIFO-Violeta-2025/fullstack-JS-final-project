import request from "supertest";
import app from "../server"; // Express server

describe("Backend API", () => {
  let token;

  // Тест логіну
  it("POST /auth/login → should return the token", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "admin@test.com", password: "123456" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  // User acquisition test
  it("GET /users → should return a list of users", async () => {
    const res = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Event reception test
  it("GET /events → should return a list of events", async () => {
    const res = await request(app)
      .get("/events")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Statistics test
  it("GET /stats/events → should return event statistics", async () => {
    const res = await request(app)
      .get("/stats/events")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("totalEvents");
  });
});
