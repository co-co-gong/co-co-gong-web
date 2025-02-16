import { getRootStyles, getSemanticColor } from "./styles";

describe("styles lib", () => {
  beforeEach(() => {
    document.documentElement.style.setProperty("--c-primary", "red");
    document.documentElement.style.setProperty("--c-secondary", "blue");
  });

  afterEach(() => {
    document.documentElement.style.removeProperty("--c-primary");
    document.documentElement.style.removeProperty("--c-secondary");
  });

  describe("getRootStyles", () => {
    it("root styles을 반환해야 함", () => {
      const styles = getRootStyles();
      expect(styles).toBeInstanceOf(CSSStyleDeclaration);
    });
  });

  describe("getSemanticColor", () => {
    it("CSS 변수의 값을 반환해야 함", () => {
      const color = getSemanticColor("--c-primary");
      expect(color).toBe("red");
    });

    it("CSS 변수가 없는 경우 빈 문자열을 반환해야 함", () => {
      const color = getSemanticColor("--c-unknown");
      expect(color).toBe("");
    });
  });
});
