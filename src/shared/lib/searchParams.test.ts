import { getSearchParams } from "./searchParams";

describe("getSearchParams", () => {
  it("만약 params가 없다면, 빈문자열 반환해야한다.", () => {
    expect(getSearchParams()).toBe("");
  });

  it("object를 string으로 반환해야한다.", () => {
    expect(getSearchParams({ a: "1", b: "2", c: true, d: 2 })).toBe("a=1&b=2&c=true&d=2");
  });

  it("question mark를 포함한 string으로 반환해야 한다.", () => {
    expect(getSearchParams({ a: "1", b: "2", c: true, d: 2 }, true)).toBe("?a=1&b=2&c=true&d=2");
  });

  it("값이 배열일 경우, 콤마를 구분자로 하여 string으로 반환해야한다.", () => {
    expect(getSearchParams({ a: ["1", "2"], b: [1, 2], c: true, d: 2 })).toBe("a=1%2C2&b=1%2C2&c=true&d=2");
  });
});
