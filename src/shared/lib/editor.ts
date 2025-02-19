import { EXTENSION_LANGUAGE_MAPPER } from "@/shared/constants/editor";

export const getLanguageFromFileName = (fileName: string): string => {
  const extension = fileName.split(".").pop()?.toLowerCase();

  if (!!extension && extension in EXTENSION_LANGUAGE_MAPPER) {
    return EXTENSION_LANGUAGE_MAPPER[extension as keyof typeof EXTENSION_LANGUAGE_MAPPER];
  }
  return "plaintext";
};
