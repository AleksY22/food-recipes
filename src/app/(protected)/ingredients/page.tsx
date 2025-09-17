"use client";

import IngredientsTable from "@/components/ui/tables/ingredients.table";
import IngredientForm from "@/forms/ingredient.form";
import { useAuthStore } from "@/store/auth.store";

const IngredientsPage = () => {
  const { isAuth } = useAuthStore();
  return isAuth ? (
    <>
      <IngredientForm />
      <IngredientsTable />
    </>
  ) : (
    <p className="flex justify-center mt-4">Авторизуйтесь!</p>
  );
};
export default IngredientsPage;
