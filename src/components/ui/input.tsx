import * as React from "react";

import { cn } from "@/lib/utils";
import { useFormItemContext } from "@/context/form-item-context";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  const { invalid } = useFormItemContext();

  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:border-primary focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        invalid && "border-destructive",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
