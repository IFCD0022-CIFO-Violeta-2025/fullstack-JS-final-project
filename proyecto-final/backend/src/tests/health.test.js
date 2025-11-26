import request from "supertest";
import app from "../src/app.js"; // імпортуємо app, а не server.js

describe("Health check", () => {
  it("GET /health → повертає статус ok", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});
