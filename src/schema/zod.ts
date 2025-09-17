import { object, string, number } from "zod";
import { z } from "zod";

export const signInSchema = object({
  email: string({ error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be more than 5 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const ingredientSchema = object({
  name: string().min(1, "Обязательный параметр"),
  category: z.enum([
    "VEGETABLES",
    "FRUITS",
    "MEAT",
    "DAIRY",
    "SPICES",
    "OTHER",
  ]),
  unit: z.enum(["GRAMS", "KILOGRAMS", "LITERS", "MILLILITERS", "PIECES"]),
  pricePerUnit: number({ error: "Цена должна быть числом" })
    .min(0, "Цена должна быть положительной")
    .nullable(),
  description: z.string().optional(),
});
