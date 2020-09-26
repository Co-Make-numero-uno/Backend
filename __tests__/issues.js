const supertest = require("supertest")
const server = require("../server")
const db = require("../data/dbConfig")

beforeEach(async () => {
    await db.seed.run
})

afterAll(async () => {
    await db.destroy()
})

describe("issue integration tests", () => {
    it("GET /issues", async () => {
        const res = await supertest(server).get("/issues")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body[0].title).toBe("Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.")
    })
    it("GET /issues/:id", async () => {
        const res = await supertest(server).get("/issues/3")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.title).toBe("Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.")
    })
    it("POST /issues", async () => {
        const res = await supertest(server)
        .post("/issues")
        .send({ title: "This is a test", description: "this is a description", city: "this is a city", state: "this is a state"})
        expect(res.statusCode).toBe(201)
        expect(res.body.title).toBe("This is a test")
    })
    it("PUT /issues/:id", async () => {
        const res = await supertest(server)
        .put("issues/3")
        .send({ title: "Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.", description: "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.", city: "Des Moines", state: "IA"})
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.city).toBe("Des Moines")
    })
})