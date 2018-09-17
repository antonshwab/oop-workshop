import { pipeline } from "../src";

describe("Pipeline", async () => {

  it("", async () => {

    const files = [".file", "text.txt", "foo", "boo", ".bashrc", ".profile", ".achacha", ".xxx", ".xxx2"];

    const piped = pipeline(files);

    expect(piped).toBe(".PROFILES");
  });
});
