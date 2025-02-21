import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStepContext } from "@/context/step-context";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { FormItem, FormItemMessage } from "@/components/ui/form-item";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { tripModeOptions, experiencesOptions } from "@/lib/utils";
import { useFormFieldsContext } from "@/context/form-context";

const formSchema = yup.object({
  experience: yup.string().required(),
  trip_mode: yup.string().required(),
  people_number: yup.string().required(),
  trip_date: yup.string().required(),
});

export default function StepTwo() {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
    mode: "onSubmit",
  });

  const { goToNextStep } = useStepContext();
  const { addFields } = useFormFieldsContext();

  const onSubmit = handleSubmit((values) => {
    addFields(values);
    goToNextStep();
  });

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <p className="text-center">¡Queremos conocerte!</p>

      <FormItem invalid={!!errors.experience}>
        <Label>
          ¿En qué experiencia deseas participar?
          <span className="text-primary ml-0.5">*</span>
        </Label>
        <Controller
          control={control}
          name="experience"
          render={({ field: { onChange } }) => (
            <Select onValueChange={onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una experiencia" />
              </SelectTrigger>
              <SelectContent>
                {experiencesOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.experience && <FormItemMessage>{errors.experience.message}</FormItemMessage>}
      </FormItem>
      <FormItem invalid={!!errors.trip_mode}>
        <Label>
          Modo de viaje
          <span className="text-primary ml-0.5">*</span>
        </Label>
        <Controller
          control={control}
          name="trip_mode"
          render={({ field: { onChange } }) => (
            <Select onValueChange={onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una opción" />
              </SelectTrigger>
              <SelectContent>
                {tripModeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.trip_mode && <FormItemMessage>{errors.trip_mode.message}</FormItemMessage>}
      </FormItem>
      <FormItem invalid={!!errors.people_number}>
        <Label>
          ¿Cuántas personas en total vienen a este viaje?
          <span className="text-primary ml-0.5">*</span>
        </Label>
        <Input type="number" min={1} {...register("people_number")} />
        {errors.people_number && <FormItemMessage>{errors.people_number.message}</FormItemMessage>}
      </FormItem>
      <FormItem invalid={!!errors.trip_date}>
        <Label>
          ¿En qué fecha deseas viajar?
          <span className="text-primary ml-0.5">*</span>
        </Label>
        <Controller
          control={control}
          name="trip_date"
          render={({ field }) => <DatePicker onChange={field.onChange} value={field.value} />}
        />
        {errors.trip_date && <FormItemMessage>{errors.trip_date.message}</FormItemMessage>}
      </FormItem>
      <Button className="w-full">Siguiente</Button>
    </form>
  );
}
