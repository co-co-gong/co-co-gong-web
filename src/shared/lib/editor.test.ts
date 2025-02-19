import { getLanguageFromFileName } from "./editor";

describe("editor", () => {
  describe("getLanguageFromFileName", () => {
    it("확장자 py", () => {
      expect(getLanguageFromFileName("test.py")).toBe("python");
    });
    it("확장자 ts", () => {
      expect(getLanguageFromFileName("test.ts")).toBe("typescript");
    });
    it("확장자 tsx", () => {
      expect(getLanguageFromFileName("test.tsx")).toBe("typescript");
    });
    it("확장자 js", () => {
      expect(getLanguageFromFileName("test.js")).toBe("javascript");
    });
    it("확장자 jsx", () => {
      expect(getLanguageFromFileName("test.jsx")).toBe("javascript");
    });
    it("확장자 json", () => {
      expect(getLanguageFromFileName("test.json")).toBe("json");
    });
    it("확장자 html", () => {
      expect(getLanguageFromFileName("test.html")).toBe("html");
    });
    it("확장자 css", () => {
      expect(getLanguageFromFileName("test.css")).toBe("css");
    });
    it("확장자 md", () => {
      expect(getLanguageFromFileName("test.md")).toBe("markdown");
    });
    it("확장자 java", () => {
      expect(getLanguageFromFileName("test.java")).toBe("java");
    });
    it("확장자 csharp", () => {
      expect(getLanguageFromFileName("test.cs")).toBe("csharp");
    });
    it("확장자 go", () => {
      expect(getLanguageFromFileName("test.go")).toBe("go");
    });
    it("확장자 rb", () => {
      expect(getLanguageFromFileName("test.rb")).toBe("ruby");
    });
    it("존재하지 않는 확장자", () => {
      expect(getLanguageFromFileName("test")).toBe("plaintext");
    });
  });
});
