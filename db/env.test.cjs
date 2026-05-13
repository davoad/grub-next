const assert = require("node:assert/strict");
const { describe, it } = require("node:test");

require("sucrase/register");

const { getPostgresUrl } = require("./env.ts");

describe("getPostgresUrl", () => {
  it("returns POSTGRES_URL when it is configured", () => {
    const postgresUrl = "postgresql://default:secret@example.neon.tech/neondb";

    assert.equal(getPostgresUrl({ POSTGRES_URL: postgresUrl }), postgresUrl);
  });

  it("throws a clear error when POSTGRES_URL is missing", () => {
    assert.throws(() => getPostgresUrl({}), /POSTGRES_URL is required/);
  });
});
