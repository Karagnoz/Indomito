import React, { createContext, useContext, useState } from "react";
import "@/lib/yup.locale";

type FormFields = {
  [key: string]: any;
};

type FormFieldsContextProps = FormFields & {
  addFields(fields: FormFields): void;
};

export const FormFieldsContext = createContext<FormFieldsContextProps>({
  addFields: () => {},
});

export const FormFieldsProvider = ({ children }: { children: React.ReactNode }) => {
  const [fields, setFields] = useState<FormFields>({});

  const addFields = (newFields: FormFields) => {
    setFields((prevFields) => ({ ...prevFields, ...newFields }));
  };

  return (
    <FormFieldsContext.Provider
      value={{
        fields,
        addFields,
      }}
    >
      {children}
    </FormFieldsContext.Provider>
  );
};

export const useFormFieldsContext = () => useContext(FormFieldsContext);
