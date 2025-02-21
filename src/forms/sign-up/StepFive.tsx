import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { FormItem, FormItemMessage } from "@/components/ui/form-item";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormFieldsContext } from "@/context/form-context";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useStepContext } from "@/context/step-context";

const formSchema = yup.object({
  equipment_lent: yup.array().of(yup.string()),
  equipment_share: yup.string(),
  equipment_rent: yup.array().of(yup.string()),
  kayak_preferences: yup.string().required(),
});

const equipmentLentOptions = ["Bolsa seca", "Colchoneta de camping", "Casa de campaña"];
const equipmentRentOptions = [
  "Casa de campaña individual (6 días o menos: $20 USD, más de 7 días: $30 USD).",
  "Sleeping bag (6 días o menos: $25 USD, más de 7 días: $30 USD).",
  "Equipo de snorkel – aletas, mascara y snorkel – (6 días o menos: $20 USD, más de 7 días: $30 USD).",
  "Traje de neopreno (6 días o menos: $30 USD, más de 7 días: $40 USD).",
];

export default function StepFive() {
  const {
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
    mode: "onSubmit",
  });

  const { addFields } = useFormFieldsContext();
  const { goToNextStep } = useStepContext();

  const onSubmit = handleSubmit((values) => {
    addFields(values);
    goToNextStep();
  });

  const equipment_lent = watch("equipment_lent") || [];
  const equipment_rent = watch("equipment_rent") || [];

  return (
    <form className="space-y-8" onSubmit={onSubmit}>
      <p className="text-center font-bold">Equipamiento</p>

      <FormItem invalid={!!errors.equipment_lent} className="space-y-4">
        <Label className="font-semibold">Selecciona el equipo que deseas que te proporcionemos</Label>

        {equipmentLentOptions.map((option) => (
          <div key={option} className="flex gap-2">
            <Checkbox
              id={option}
              checked={equipment_lent.includes(option)}
              onCheckedChange={(checked) => {
                const updatedValue = checked
                  ? [...equipment_lent, option]
                  : equipment_lent.filter((item) => item !== option);

                setValue("equipment_lent", updatedValue, { shouldValidate: true });
              }}
            />
            <Label className="cursor-pointer" htmlFor={option}>
              {option}
            </Label>
          </div>
        ))}
      </FormItem>

      <Separator />

      <FormItem invalid={!!errors.equipment_rent} className="space-y-4">
        <Label className="font-semibold">Selecciona el equipo que deseas rentar</Label>

        {equipmentRentOptions.map((option) => (
          <div key={option} className="flex gap-2">
            <Checkbox
              id={option}
              checked={equipment_rent.includes(option)}
              onCheckedChange={(checked) => {
                const updatedValue = checked
                  ? [...equipment_rent, option]
                  : equipment_rent.filter((item) => item !== option);

                setValue("equipment_rent", updatedValue, { shouldValidate: true });
              }}
            />
            <Label className="cursor-pointer leading-4" htmlFor={option}>
              {option}
            </Label>
          </div>
        ))}
      </FormItem>

      <Separator />

      <FormItem invalid={!!errors.kayak_preferences} className="flex flex-col space-y-4">
        <Label className="font-semibold">
          Preferencia de Kayak* <span className="text-primary">*</span>
        </Label>
        <Controller
          control={control}
          name="kayak_preferences"
          render={({ field }) => (
            <RadioGroup onValueChange={field.onChange} className="gap-4">
              <div className="flex items-center gap-2">
                <RadioGroupItem id="individual." value="individual." />
                <Label className="cursor-pointer" htmlFor="individual.">
                  Prefiero un Kayak individual.
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem id="doble" value="doble" />
                <Label className="cursor-pointer" htmlFor="doble">
                  Prefiero Kayak doble.
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem id="cualquiera" value="cualquiera" />
                <Label className="cursor-pointer" htmlFor="cualquiera">
                  Cualquiera de los dos está bien.
                </Label>
              </div>
            </RadioGroup>
          )}
        />
        {errors.kayak_preferences && <FormItemMessage>{errors.kayak_preferences.message}</FormItemMessage>}
      </FormItem>

      <Button className="w-full" type="submit">
        Siguiente
      </Button>
    </form>
  );
}
