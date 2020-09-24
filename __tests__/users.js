const supertest = require("supertest")
const server = require("../server")
const db = require("../data/dbConfig")

beforeEach(async () => {
    await db.seed.run
})

afterAll(async () => {
    await db.destroy()
})

describe("users integration tests", () => {
    it("GET /users", async () => {
        const res = await supertest(server).get("/users")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body[0].name).toBe("Hedvig Mouland")
    })
    it("GET /users/:id", async () => {
        const res = await supertest(server).get("/users/3")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.name).toBe("Coleman Raistrick")
    })
    it("POST /issues", async () => {
        const res = await supertest(server)
        .post("/issues")
        .send({ name: "This is a test", city: "this is a city", state: "this is a state", email: "email@email.com", password: "d41d8cd98f00b204e9800998ecf8427e"})
        expect(res.statusCode).toBe(201)
        expect(res.body.title).toBe("This is a test")
    })
    it("PUT /issues/:id", async () => {
        const res = await supertest(server)
        .put("issues/3")
        .send({ name: "This is a test", city: "Altoona", state: "this is a state", email: "email@email.com", password: "d41d8cd98f00b204e9800998ecf8427e"})
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.city).toBe("Altoona")
    })
})