import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { experiencesOptions, monthsOptions } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function Searchbar() {
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  return (
    <div className="flex max-md:flex-col bg-gray-950/50 backdrop-blur-sm max-md:gap-y-2 items-center px-4 py-2">
      <Select onValueChange={(value) => setSelectedExperience(value)}>
        <SelectTrigger className="border-none px-0 focus:ring-0 bg-transparent text-accent-foreground">
          <SelectValue placeholder="Selecciona una experiencia" />
        </SelectTrigger>
        <SelectContent>
          {experiencesOptions.map((experience) => (
            <SelectItem key={experience.value} value={experience.label}>
              {experience.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Divider />

      <Select onValueChange={(value) => setSelectedMonth(value)}>
        <SelectTrigger className="border-none px-0 focus:ring-0 bg-transparent text-accent-foreground">
          <SelectValue placeholder="¿En que més quieres vivirla?" />
        </SelectTrigger>
        <SelectContent>
          {monthsOptions.map((month, index) => (
            <SelectItem key={index} value={index.toString()}>
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Divider />
      <Button
        onClick={() => {
          const params = new URLSearchParams();

          if (selectedExperience) params.append("experiencia", selectedExperience);
          if (selectedMonth) params.append("mes", selectedMonth);

          const url = "https://indomito360.com/calendario-experiencias?" + params.toString();

          window.location.href = url;
        }}
      >
        Encontrar
      </Button>
    </div>
  );
}

function Divider() {
  return <div className="bg-white opacity-30 md:w-1 md:h-5 w-full h-px mx-4" />;
}

export default Searchbar;
