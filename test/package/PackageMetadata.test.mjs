import test from "node:test";
import assert from "node:assert/strict";
import packageJson from "../../package.json" with { type: "json" };

test("Package metadata should be correct", () => {
  assert.equal(packageJson.name, "@vngamemini/examination");
  assert.equal(packageJson.version, "0.1.0");
  assert.equal(packageJson.type, "module");
  assert.equal(packageJson.main, "./src/index.js");
  assert.equal(packageJson.module, "./src/index.js");
});

test("Package should expose import entry", () => {
  assert.ok(packageJson.exports);
  assert.ok(packageJson.exports["."]);
  assert.equal(
    packageJson.exports["."].import,
    "./src/index.js"
  );
});

test("Package should include required files", () => {
  assert.deepEqual(
    packageJson.files,
    [
      "src",
      "README.md",
      "LICENSE",
    ]
  );
});
