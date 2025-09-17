"use server";

import { signOut } from "@/auth/auth";

export async function signOutFunc() {
  try {
    await signOut({ redirect: false });

    return;
  } catch (error) {
    console.error("Ошибка авторизации!", error);
    throw error;
  }
}
