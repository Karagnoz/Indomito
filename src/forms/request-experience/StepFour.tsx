import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { FormItem, FormItemMessage } from "@/components/ui/form-item";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormFieldsContext } from "@/context/form-context";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { createFormData, saveForm } from "@/lib/utils";

const formSchema = yup.object({
  is_first_trip: yup.string().required(),
  discovery_source: yup.array().min(1, "Selecciona al menos una opción").of(yup.string()),
  terms_accepted: yup.string().required("Por favor acepta los términos y condiciones"),
});

const discoverySourceOptions = [
  { label: "Alguien me lo recomendó", value: "recommendation" },
  { label: "Búsqueda en Google", value: "google_search" },
  { label: "Agencia", value: "agency" },
  { label: "Instagram", value: "instagram" },
  { label: "Facebook", value: "facebook" },
  { label: "Tiktok", value: "tiktok" },
  { label: "Soy cliente frecuente", value: "frequent_client" },
  { label: "Otro medio", value: "other" },
];

export default function StepFour() {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(formSchema),
    mode: "onSubmit",
  });

  const { fields } = useFormFieldsContext();

  const onSubmit = handleSubmit((values) => {
    const formData = createFormData({ ...fields, ...values });
    formData.append("your-email", fields.email);
    formData.append("your-name", fields.full_name);
    formData.append("your-subject", "Nueva solicitud");

    return saveForm("request", formData).then(() => {
      window.location.href = "https://www.indomito360.com/gracias-por-tu-solicitud";
    });
  });

  const selectedSources = watch("discovery_source") || [];

  const handleCheckboxChange = (isChecked: CheckedState, value: string) => {
    const updatedSources = isChecked ? [...selectedSources, value] : selectedSources.filter((item) => item !== value);

    setValue("discovery_source", updatedSources, { shouldValidate: true });
  };

  return (
    <form className="space-y-10" onSubmit={onSubmit}>
      <p className="text-center">Gracias por llegar hasta aquí! Solo dos preguntas más</p>

      <FormItem invalid={!!errors.is_first_trip} className="flex flex-col space-y-4">
        <Label className="font-semibold">
          ¿Es tu primer viaje con indómito? <span className="text-primary">*</span>
        </Label>
        <Controller
          control={control}
          name="is_first_trip"
          render={({ field }) => (
            <RadioGroup onValueChange={field.onChange} className="flex max-xs:flex-col sm:gap-10 gap-4">
              <div className="flex items-center gap-2">
                <RadioGroupItem id="yes" value="yes" />
                <Label className="cursor-pointer" htmlFor="yes">
                  Sí, es mi primer viaje
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem id="no" value="no" />
                <Label className="cursor-pointer" htmlFor="no">
                  No, ya he viajado antes
                </Label>
              </div>
            </RadioGroup>
          )}
        />
        {errors.is_first_trip && <FormItemMessage>{errors.is_first_trip.message}</FormItemMessage>}
      </FormItem>

      <FormItem invalid={!!errors.is_first_trip} className="flex flex-col space-y-4">
        <Label className="font-semibold">
          ¿Dónde te enteraste de nosotros? <span className="text-primary">*</span>
        </Label>

        <div className="grid xs:grid-cols-2 gap-5">
          {discoverySourceOptions.map((option) => (
            <div key={option.value} className="flex items-center gap-2">
              <Checkbox
                id={option.value}
                checked={selectedSources.includes(option.value)}
                onCheckedChange={(checked) => handleCheckboxChange(checked, option.value)}
              />
              <Label className="cursor-pointer" htmlFor={option.value}>
                {option.label}
              </Label>
            </div>
          ))}
        </div>
        {errors.is_first_trip && <FormItemMessage>{errors.is_first_trip.message}</FormItemMessage>}
      </FormItem>

      <FormItem invalid={!!errors.terms_accepted} className="space-y-4">
        <Controller
          control={control}
          name="terms_accepted"
          render={({ field }) => (
            <div className="flex items-center gap-2">
              <Checkbox id="terms_accepted" checked={!!field.value} onCheckedChange={field.onChange} />
              <Label htmlFor="terms_accepted" className="cursor-pointer">
                Acepto los{" "}
                <a
                  href="https://www.indomito360.com/terminos-y-condiciones/"
                  target="_blank"
                  className="underline hover:opacity-80"
                >
                  términos y condiciones
                </a>
              </Label>
            </div>
          )}
        />
        {errors.terms_accepted && <FormItemMessage>{errors.terms_accepted.message}</FormItemMessage>}
      </FormItem>

      <Button className="w-full" type="submit" loading={isSubmitting}>
        Finalizar
      </Button>
    </form>
  );
}
