// dotenv
require("dotenv").config();

const mongoose = require("mongoose");

const assert = require("assert");

describe("Database", () => {
  describe("URI length", () => {
    it("should not be equal to 0", () => {
      assert.notEqual(process.env.MONGODB_URI.length, 0);
    });
  });
  describe("Connection", () => {
    it("should work", () => {
      mongoose
        .connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(() => {
          assert.equal(1, 1);
        })
        .catch((err) => {
          assert.equal(0, 1);
        });
    });
  });
});
