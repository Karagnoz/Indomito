import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { FormItem, FormItemMessage } from "@/components/ui/form-item";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormFieldsContext } from "@/context/form-context";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { createFormData, saveForm } from "@/lib/utils";

const formSchema = yup.object({
  discovery_source: yup.array().min(1, "Selecciona al menos una opción").of(yup.string()),
  comments: yup.string(),
  terms_accepted: yup.string().required("Por favor acepta los términos y condiciones"),
  responsiveness_accepted: yup.string().required("Por favor marca esta casilla"),
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

export default function StepSix() {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    register,
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
    formData.append("your-name", `${fields.first_name} ${fields.last_name}`);
    formData.append("your-subject", "Nuevo registro");

    return saveForm("register", formData).then(() => {
      window.location.href = "https://www.indomito360.com/gracias-por-tu-registro/";
    });
  });

  const selectedSources = watch("discovery_source") || [];

  const handleCheckboxChange = (isChecked: CheckedState, value: string) => {
    const updatedSources = isChecked ? [...selectedSources, value] : selectedSources.filter((item) => item !== value);

    setValue("discovery_source", updatedSources, { shouldValidate: true });
  };

  return (
    <form className="space-y-8" onSubmit={onSubmit}>
      <p className="text-center">¡Ya casi terminamos! Solo un par de preguntas más</p>

      <FormItem invalid={!!errors.discovery_source} className="flex flex-col space-y-4">
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
        {errors.discovery_source && <FormItemMessage>{errors.discovery_source.message}</FormItemMessage>}
      </FormItem>

      <Separator />

      <FormItem>
        <Label>¿Te gustaría agregar algún comentario o pregunta?</Label>
        <Textarea {...register("comments")} />
      </FormItem>

      <FormItem invalid={!!errors.terms_accepted} className="space-y-1">
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

      <Alert className="border-none rounded-2xl bg-blue-200/50 py-2">
        <AlertDescription className="text-blue-700">
          Antes de iniciar tu viaje se te entregará una copia física de los términos y condiciones para firmar
        </AlertDescription>
      </Alert>

      <FormItem invalid={!!errors.responsiveness_accepted} className="space-y-1">
        <Controller
          control={control}
          name="responsiveness_accepted"
          render={({ field }) => (
            <div className="flex items-center gap-2">
              <Checkbox id="responsiveness_accepted" checked={!!field.value} onCheckedChange={field.onChange} />
              <Label htmlFor="responsiveness_accepted" className="cursor-pointer">
                Estoy de acuerdo con firmar la responsiva
              </Label>
            </div>
          )}
        />
        {errors.responsiveness_accepted && <FormItemMessage>{errors.responsiveness_accepted.message}</FormItemMessage>}
      </FormItem>

      <Button className="w-full" type="submit" loading={isSubmitting}>
        Finalizar
      </Button>
    </form>
  );
}
