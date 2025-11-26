import request from "supertest";
import app from "../server"; // Express 

describe("User & Event Controllers", () => {
  let token;
  let userId;
  let eventId;

  // Логін перед тестами
  beforeAll(async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "admin@test.com", password: "123456" });

    token = res.body.token;
  });

  // Тест створення користувача
  it("POST /users → створює нового користувача", async () => {
    const res = await request(app)
      .post("/users")
      .set("Authorization", `Bearer ${token}`)
      .send({ username: "testuser", email: "test@test.com" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.username).toBe("testuser");
    userId = res.body.id;
  });

  // Тест отримання користувачів
  it("GET /users → повертає список користувачів", async () => {
    const res = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Тест створення події
  it("POST /events → створює нову подію", async () => {
    const res = await request(app)
      .post("/events")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Event",
        description: "Demo event",
        date: new Date(),
        userId: userId,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toBe("Test Event");
    eventId = res.body.id;
  });

  // Тест отримання подій
  it("GET /events → повертає список подій", async () => {
    const res = await request(app)
      .get("/events")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Тест отримання події з користувачем
  it("GET /events/:id → повертає подію з користувачем", async () => {
    const res = await request(app)
      .get(`/events/${eventId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("User");
    expect(res.body.User.id).toBe(userId);
  });
});
