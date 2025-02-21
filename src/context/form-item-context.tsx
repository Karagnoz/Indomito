import { createContext, useContext } from "react";

export const FormItemContext = createContext<{ invalid?: boolean }>({});

export const useFormItemContext = () => useContext(FormItemContext);
