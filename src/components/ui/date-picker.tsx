"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { SelectSingleEventHandler } from "react-day-picker";
import { useFormItemContext } from "@/context/form-item-context";

type DatePickerProps = {
  placeholder?: string;
  value?: string | undefined;
  onChange: (date: string | undefined) => void;
};

export function DatePicker({ placeholder = "Escoge una fecha", value, onChange }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const { invalid } = useFormItemContext();

  const handleSelect: SelectSingleEventHandler = (date) => {
    onChange(date?.toDateString());
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal hover:bg-inherit hover:text-inherit",
            !value && "text-muted hover:text-muted",
            invalid && "border-destructive"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "dd/MM/yyyy") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={new Date(value || "")} onSelect={handleSelect} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
