import { isValidIP, fetchJson } from '../ip_reputation.js';

describe("Regex tests", () => {
  it("returns truthy if valid IP", () => {
    expect(isValidIP("1.1.1.1")).toBeTruthy();
    expect(isValidIP("11.11.11.11")).toBeTruthy();
    expect(isValidIP("111.111.111.111")).toBeTruthy();
    expect(isValidIP("10.1.10.1")).toBeTruthy();
    expect(isValidIP("1.0.0.1")).toBeTruthy();
  });

  ("returns falsy if not a valid IP", () => {
    expect(isValidIP("1.1.1")).toBeFalsy();
    expect(isValidIP("11.11.11.11.11")).toBeFalsy();
    expect(isValidIP("")).toBeFalsy();
    expect(isValidIP("  ")).toBeFalsy();
    expect(isValidIP("1.1.a.1")).toBeFalsy();
    expect(isValidIP("1.1.1.256")).toBeFalsy();
  });
})

describe("Test json fetch", () => {
  it('works with async/await and resolves', async () => {
    expect(await (fetchJson("1.1.1.1"))).toBeTruthy();
    expect(await (fetchJson("1.0.0.1"))).toBeTruthy();
    expect(await (fetchJson("8.8.8.8"))).toBeTruthy();
    expect(await (fetchJson("8.8.4.4"))).toBeTruthy();
    expect(await (fetchJson("9.9.9.9"))).toBeTruthy();
    expect(await (fetchJson("54.239.28.85"))).toBeTruthy();
    expect(await (fetchJson("23.185.0.253"))).toBeTruthy();
    expect(await (fetchJson("143.166.135.105"))).toBeTruthy();
  });

  it('test IP reputation', async () => {
    expect((await (fetchJson("1.1.1.1"))).data.attributes.reputation).toBe(99);
    expect((await (fetchJson("1.0.0.1"))).data.attributes.reputation).toBe(122);
    expect((await (fetchJson("8.8.8.8"))).data.attributes.reputation).toBe(575);
    expect((await (fetchJson("8.8.4.4"))).data.attributes.reputation).toBe(182);
    expect((await (fetchJson("9.9.9.9"))).data.attributes.reputation).toBe(10);
    expect((await (fetchJson("54.239.28.85"))).data.attributes.reputation).toBe(0);
    expect((await (fetchJson("23.185.0.253"))).data.attributes.reputation).toBe(-1);
    expect((await (fetchJson("143.166.135.105"))).data.attributes.reputation).toBe(0);
  });

  it('test IP owner', async () => {
    expect((await (fetchJson("1.1.1.1"))).data.attributes.as_owner).toBe("CLOUDFLARENET");
    expect((await (fetchJson("1.0.0.1"))).data.attributes.as_owner).toBe("CLOUDFLARENET");
    expect((await (fetchJson("8.8.8.8"))).data.attributes.as_owner).toBe("GOOGLE");
    expect((await (fetchJson("8.8.4.4"))).data.attributes.as_owner).toBe("GOOGLE");
    expect((await (fetchJson("9.9.9.9"))).data.attributes.as_owner).toBe("QUAD9-AS-1");
    expect((await (fetchJson("54.239.28.85"))).data.attributes.as_owner).toBe("AMAZON-02");
    expect((await (fetchJson("23.185.0.253"))).data.attributes.as_owner).toBe("FASTLY");
    expect((await (fetchJson("143.166.135.105"))).data.attributes.as_owner).toBe("DELL-BLK");
  });
})
