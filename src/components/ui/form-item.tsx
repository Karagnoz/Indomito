import { FormItemContext, useFormItemContext } from "@/context/form-item-context";
import { cn } from "@/lib/utils";
import React from "react";

interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  invalid?: boolean;
}

export const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, invalid = false, ...props }, ref) => {
    return (
      <FormItemContext.Provider value={{ invalid }}>
        <div ref={ref} className={cn("space-y-1", className)} {...props} />
      </FormItemContext.Provider>
    );
  }
);

export const FormItemMessage = ({ children }: { children: string | React.ReactNode }) => {
  const { invalid } = useFormItemContext();

  return (
    <span className={cn("relative flex items-center tracking-wide text-xs", invalid && "text-destructive")}>
      {children}
    </span>
  );
};
