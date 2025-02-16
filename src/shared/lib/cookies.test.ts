import { getCookie, removeCookie, removeCookies, setCookie, setCookies } from "./cookies";

const mockCookies = {
  get: jest.fn((key: string) => ({
    name: key,
    value: `mocked-${key}`,
  })),
  set: jest.fn(),
  delete: jest.fn(),
};

jest.mock("next/headers", () => ({
  cookies: jest.fn(() => mockCookies),
}));

describe("Cookies", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("on Server Side", () => {
    it("쿠키를 설정해야 함", async () => {
      await setCookie("testKey", "testValue");
      expect(mockCookies.set).toHaveBeenCalledWith("testKey", "testValue");
    });

    it("여러 쿠키를 설정해야 함", async () => {
      const cookieObject = { key1: "value1", key2: "value2" };
      await setCookies(cookieObject);
      expect(mockCookies.set).toHaveBeenCalledTimes(2);
    });

    it("쿠키를 가져와야 함", async () => {
      const cookie = await getCookie("testKey");
      expect(mockCookies.get).toHaveBeenCalledWith("testKey");
      expect(cookie).toBe("mocked-testKey");
    });

    it("쿠키를 삭제해야 함", async () => {
      await removeCookie("testKey");
      expect(mockCookies.delete).toHaveBeenCalledWith("testKey");
    });

    it("여러 쿠키를 삭제해야 함", async () => {
      const keys = ["key1", "key2"];
      await removeCookies(keys);
      expect(mockCookies.delete).toHaveBeenCalledTimes(2);
    });
  });
});
