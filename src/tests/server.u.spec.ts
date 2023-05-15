import request from "supertest";
import server from "../server";

describe("Test the Users API Express Server", () => {
  test("the '/' endpoint with a GET request to get all users", async () => {
    // arrange
    const expectedStatus = 200;
    // act
    const response = await request(server).get("/");
    // assert
    expect(response.status).toEqual(expectedStatus);
  });
  test("the '/create' endpoint with a POST request", async () => {
    // arrange
    const requestObject = {
      email: "jest4@test.com",
      password: "testing",
      confirmPassword: "testing",
    };
    const expectedStatus = 201;
    // act
    const response = await request(server).post("/create").send(requestObject);
    // assert
    expect(response.status).toEqual(expectedStatus);
  });
});
2;
