import { useState } from "react";

export const HooksFormOfProducts = (product) => {
  const [inputsForm, setInputsForm] = useState(product);
  const onChangeInputsForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputsForm({ ...inputsForm, [name]: value });
  };
  return {
    inputsForm,
    setInputsForm,
    onChangeInputsForm,
  };
};
