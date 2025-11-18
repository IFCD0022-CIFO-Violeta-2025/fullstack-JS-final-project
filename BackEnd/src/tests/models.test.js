const dotenv = require("dotenv");
dotenv.config();

const { Sequelize, DataTypes } = require("sequelize");
const UserModel = require("../models/User.js");
const EventModel = require("../models/Event.js");

describe("Sequelize Models", () => {
  let sequelize;
  let User;
  let Event;

  beforeAll(async () => {
    sequelize = new Sequelize("sqlite::memory:", { logging: false });

    User = UserModel(sequelize, DataTypes);
    Event = EventModel(sequelize, DataTypes);

    // We define relationships
    User.hasMany(Event, { foreignKey: "userId" });
    Event.belongsTo(User, { foreignKey: "userId" });

    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("User has the correct fields", async () => {
    const user = await User.create({
      username: "testuser",
      email: "test@test.com",
    });
    expect(user.username).toBe("testuser");
    expect(user.email).toBe("test@test.com");
  });

  it("Event has the correct fields", async () => {
    const event = await Event.create({
      title: "Test Event",
      description: "Demo",
      date: new Date(),
    });
    expect(event.title).toBe("Test Event");
    expect(event.description).toBe("Demo");
  });

  it("Event is associated with User", async () => {
    const user = await User.create({
      username: "owner",
      email: "owner@test.com",
    });
    const event = await Event.create({ title: "Owned Event", userId: userId });

    const fetchedEvent = await Event.findOne({
      where: { id: event.id },
      include: User,
    });
    expect(fetchedEvent.User.username).toBe("owner");
  });
});
