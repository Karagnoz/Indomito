import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStepContext } from "@/context/step-context";
import { Controller, useForm } from "react-hook-form";
import { FormItem, FormItemMessage } from "@/components/ui/form-item";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { kayakExperienceOptions, tripModeOptions, experiencesOptions } from "@/lib/utils";
import { useFormFieldsContext } from "@/context/form-context";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { DatePicker } from "@/components/ui/date-picker";

const formSchema = yup.object({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  experience: yup.string().required("Por favor, selecciona una opción"),
  trip_mode: yup.string().required(),
  trip_date: yup.string().required(),
  travel_alone: yup.string().required(),
  aditional_people: yup.string(),
  kayak_experience: yup.string().required(),
});

export default function StepOne() {
  const urlParams = new URLSearchParams(window.location.search);
  const experience = urlParams.get("experiencia") || "";
  const tripMode = urlParams.get("modo_de_viaje") || "";

  const {
    handleSubmit,
    register,
    control,
    watch,
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

  const travelAlone = watch("travel_alone");

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <p className="text-center font-bold">Experiencia</p>

      <div className="flex max-sm:flex-col gap-4">
        <FormItem className="flex-1" invalid={!!errors.first_name}>
          <Label>
            Nombres <span className="text-primary">*</span>
          </Label>
          <Input placeholder="Carla" {...register("first_name")} />
          {errors.first_name && <FormItemMessage>{errors.first_name.message}</FormItemMessage>}
        </FormItem>
        <FormItem className="flex-1" invalid={!!errors.last_name}>
          <Label>
            Apellidos <span className="text-primary">*</span>
          </Label>
          <Input placeholder="Montero Silva" {...register("last_name")} />
          {errors.last_name && <FormItemMessage>{errors.last_name.message}</FormItemMessage>}
        </FormItem>
      </div>
      <FormItem className="flex-1 space-y-2" invalid={!!errors.experience}>
        <Label>
          ¿Qué experiencia deseas reservar? <span className="text-primary">*</span>
        </Label>
        <Controller
          control={control}
          name="experience"
          render={({ field }) => (
            <RadioGroup
              defaultValue={experience}
              onValueChange={field.onChange}
              className="grid sm:grid-cols-2 gap-y-2"
            >
              {experiencesOptions.map((option) => (
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
        {errors.experience && <FormItemMessage>{errors.experience.message}</FormItemMessage>}
      </FormItem>

      <FormItem className="flex-1 space-y-2" invalid={!!errors.trip_mode}>
        <Label>
          ¿Qué modalidad te interesa? <span className="text-primary">*</span>
        </Label>
        <Controller
          control={control}
          name="trip_mode"
          render={({ field }) => (
            <RadioGroup defaultValue={tripMode} onValueChange={field.onChange} className="grid grid-cols-2 gap-y-2">
              {tripModeOptions.map((option) => (
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
        {errors.trip_mode && <FormItemMessage>{errors.trip_mode.message}</FormItemMessage>}
      </FormItem>

      <FormItem invalid={!!errors.trip_date}>
        <Label>
          ¿En qué fecha deseas viajar?
          <span className="text-primary ml-0.5">*</span>
        </Label>
        <Controller
          control={control}
          name="trip_date"
          render={({ field }) => (
            // @ts-ignore
            <DatePicker onChange={field.onChange} value={field.value} />
          )}
        />
        {errors.trip_date && <FormItemMessage>{errors.trip_date.message}</FormItemMessage>}
      </FormItem>

      <FormItem className="flex-1 space-y-2" invalid={!!errors.travel_alone}>
        <Label>
          ¿Viajas solo? <span className="text-primary">*</span>
        </Label>
        <Controller
          control={control}
          name="travel_alone"
          render={({ field }) => (
            <RadioGroup onValueChange={field.onChange} className="grid grid-cols-2 gap-y-2">
              <div className="flex items-center gap-2">
                <RadioGroupItem id={"Sí"} value={"Sí"} />
                <Label className="cursor-pointer" htmlFor={"Sí"}>
                  Sí
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem id={"No"} value={"No"} />
                <Label className="cursor-pointer" htmlFor={"No"}>
                  No
                </Label>
              </div>
            </RadioGroup>
          )}
        />
        {errors.travel_alone && <FormItemMessage>{errors.travel_alone.message}</FormItemMessage>}
      </FormItem>

      {travelAlone === "No" && (
        <FormItem invalid={!!errors.aditional_people}>
          <Label>
            ¿Con cuántas personas viajas?
            <span className="text-primary ml-0.5">*</span>
          </Label>
          <Input type="number" min={1} defaultValue={1} {...register("aditional_people")} />
          {errors.aditional_people && <FormItemMessage>{errors.aditional_people.message}</FormItemMessage>}
        </FormItem>
      )}

      <FormItem className="flex-1 space-y-2" invalid={!!errors.kayak_experience}>
        <Label>
          ¿Cuánto de experiencia tienes haciendo Kayak? <span className="text-primary">*</span>
        </Label>
        <Controller
          control={control}
          name="kayak_experience"
          render={({ field }) => (
            <RadioGroup onValueChange={field.onChange}>
              {kayakExperienceOptions.map((option) => (
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
        {errors.kayak_experience && <FormItemMessage>{errors.kayak_experience.message}</FormItemMessage>}
      </FormItem>

      <Button className="w-full" type="submit">
        Siguiente
      </Button>
    </form>
  );
}
