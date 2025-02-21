import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { FormItem, FormItemMessage } from "@/components/ui/form-item";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormFieldsContext } from "@/context/form-context";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DatePicker } from "@/components/ui/date-picker";
import { Separator } from "@/components/ui/separator";
import { useStepContext } from "@/context/step-context";

const formSchema = yup.object({
  arrival_date: yup.string().required(),
  arrival_airport: yup.string().required(),
  departure_date: yup.string().required(),
  departure_airport: yup.string().required(),
});

const airportOptions = [
  { label: "La Paz (LPZ)", value: "LPZ" },
  { label: "San José del Cabo (SJD)", value: "SJD" },
  { label: "Loreto (LTO)", value: "LTO" },
  { label: "Todavía no sé", value: "unknown" },
  { label: "Otro", value: "other" },
];

export default function StepFour() {
  const form = useForm({
    resolver: yupResolver(formSchema),
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const { addFields } = useFormFieldsContext();
  const { goToNextStep } = useStepContext();

  const onSubmit = handleSubmit((values) => {
    addFields(values);
    goToNextStep();
  });

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <p className="text-center font-bold">Datos del viaje</p>

      <FormProvider {...form}>
        <div className="flex gap-2">
          <FormItem invalid={!!errors.arrival_date}>
            <Label>
              Fecha de llegada <span className="text-primary">*</span>
            </Label>
            <Controller
              control={control}
              name="arrival_date"
              render={({ field }) => (
                // @ts-ignore
                <DatePicker onChange={field.onChange} value={field.value} />
              )}
            />
            {errors.arrival_date && <FormItemMessage>{errors.arrival_date.message}</FormItemMessage>}
          </FormItem>
        </div>

        <FormItem invalid={!!errors.arrival_airport} className="space-y-2">
          <Label>
            Aeropuerto de llegada <span className="text-primary">*</span>
          </Label>
          <Controller
            control={control}
            name="arrival_airport"
            render={({ field }) => (
              <RadioGroup onValueChange={field.onChange} className="grid">
                {airportOptions.map((option) => (
                  <div key={option.value} className="flex items-center gap-2">
                    <RadioGroupItem id={option.value} value={option.value} />
                    <Label className="cursor-pointer" htmlFor={option.value}>
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />
          {errors.arrival_airport && <FormItemMessage>{errors.arrival_airport.message}</FormItemMessage>}
        </FormItem>

        <Separator className="my-10" />

        <div className="flex gap-2">
          <FormItem invalid={!!errors.departure_date}>
            <Label>
              Fecha de salida <span className="text-primary">*</span>
            </Label>
            <Controller
              control={control}
              name="departure_date"
              render={({ field }) => (
                // @ts-ignore
                <DatePicker onChange={field.onChange} value={field.value} />
              )}
            />
            {errors.departure_date && <FormItemMessage>{errors.departure_date.message}</FormItemMessage>}
          </FormItem>
        </div>

        <FormItem invalid={!!errors.departure_airport} className="space-y-2">
          <Label>
            Aeropuerto de salida <span className="text-primary">*</span>
          </Label>
          <Controller
            control={control}
            name="departure_airport"
            render={({ field }) => (
              <RadioGroup onValueChange={field.onChange} className="grid">
                {airportOptions.map((option) => (
                  <div key={option.value} className="flex items-center gap-2">
                    <RadioGroupItem id={`dep_${option.value}`} value={option.value} />
                    <Label className="cursor-pointer" htmlFor={`dep_${option.value}`}>
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />
          {errors.departure_airport && <FormItemMessage>{errors.departure_airport.message}</FormItemMessage>}
        </FormItem>

        <Button className="w-full" type="submit">
          Siguiente
        </Button>
      </FormProvider>
    </form>
  );
}
