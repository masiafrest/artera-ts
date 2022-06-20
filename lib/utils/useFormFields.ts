import React, { useState } from "react";

export function useFormFields<T>(
  initialValues: T
): [T, (event: React.ChangeEvent<HTMLInputElement>) => void] {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { name, value } = target;
    setValues({ ...values, [name]: value });
  };
  return [values, handleChange];
}
