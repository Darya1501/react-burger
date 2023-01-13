import { ChangeEvent, useState } from "react";

type TUseFormProps = {
  [name: string]: any
}

export function useForm(inputValues: TUseFormProps) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };
  return {values, handleChange, setValues};
}