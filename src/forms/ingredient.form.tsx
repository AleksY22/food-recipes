"use client";

import { CATEGORY_OPTIONS, UNIT_OPTIONS } from "@/constants/select-options";
import { useIngredientStore } from "@/store/ingredient.store";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/react";
import { Select, SelectItem } from "@heroui/select";
import { useState, useTransition } from "react";

const initialState = {
  name: "",
  category: "",
  unit: "",
  pricePerUnit: null as number | null,
  description: "",
};

const IngredientForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState(initialState);
  const { addIngredient } = useIngredientStore();

  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      await addIngredient(formData);
      const storeError = useIngredientStore.getState().error;

      if (storeError) {
        setError("Ошибка создания ингредиента!");
      } else {
        setError(null);
        setFormData(initialState);
      }
    });
  };
  return (
    <Form className="w-full" action={handleSubmit}>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <Input
        isRequired
        name="name"
        placeholder="Введите название ингредиента"
        type="text"
        value={formData.name}
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm focus:outline-none",
        }}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        validate={(value) => {
          if (!value) return "Обязательный параметр";
          return null;
        }}
      />
      <div className="flex gap-2 w-full">
        <div className="w-1/3">
          <Select
            isRequired
            name="category"
            label="Категория"
            labelPlacement="inside"
            selectedKeys={formData.category ? [formData.category] : []}
            classNames={{
              trigger: "bg-default-100 w-full",
              innerWrapper: "text-sm",
              value: "truncate",
              selectorIcon: "text-black",
            }}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            {CATEGORY_OPTIONS.map((option) => (
              <SelectItem key={option.value} className="text-black">
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="w-1/3">
          <Select
            isRequired
            name="unit"
            label="Ед. изм."
            labelPlacement="inside"
            selectedKeys={formData.unit ? [formData.unit] : []}
            classNames={{
              trigger: "bg-default-100 w-full",
              innerWrapper: "text-sm",
              value: "truncate",
              selectorIcon: "text-black",
            }}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
          >
            {UNIT_OPTIONS.map((option) => (
              <SelectItem key={option.value} className="text-black">
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="w-1/3">
          <Input
            isRequired
            name="pricePerUnit"
            label="Цена, RUB"
            labelPlacement="inside"
            type="number"
            value={
              formData.pricePerUnit !== null
                ? formData.pricePerUnit.toString()
                : ""
            }
            classNames={{
              inputWrapper: "bg-default-100",
              input: "text-sm focus:outline-none",
            }}
            onChange={(e) => {
              const value = e.target.value ? parseFloat(e.target.value) : null;
              setFormData({ ...formData, pricePerUnit: value });
            }}
            validate={(value) => {
              if (!value) return "Обязательный параметр";
              const num = parseFloat(value);
              if (isNaN(num) || num < 0)
                return "Цена должна быть положительной";
              return null;
            }}
          />
        </div>
      </div>
      <Input
        name="description"
        placeholder="Введите описание (необязательно)"
        type="text"
        value={formData.description}
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm focud:outline-none",
        }}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
      <div className="flex w-full items-center justify-end">
        <Button color="primary" type="submit" isLoading={isPending}>
          Добавить ингредиент
        </Button>
      </div>
    </Form>
  );
};

export default IngredientForm;
