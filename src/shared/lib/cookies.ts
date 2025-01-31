"use server";

import { cookies } from "next/headers";

export const getCookie = async (key: string) => {
  const cookieStore = await cookies();
  return cookieStore.get(key)?.value;
};

export const setCookie = async (key: string, value: string) => {
  const cookieStore = await cookies();
  cookieStore.set(key, value);
};

export const setCookies = async (cookieObject: Record<string, string>) => {
  const cookieStore = await cookies();
  Object.entries(cookieObject).forEach(([key, value]) => {
    cookieStore.set(key, value);
  });
};

export const removeCookie = async (key: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(key);
};

export const removeCookies = async (keys: string[]) => {
  const cookieStore = await cookies();
  keys.forEach((key) => {
    cookieStore.delete(key);
  });
};
