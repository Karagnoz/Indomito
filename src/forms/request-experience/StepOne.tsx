import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStepContext } from "@/context/step-context";
import { Controller, useForm } from "react-hook-form";
import { FormItem, FormItemMessage } from "@/components/ui/form-item";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormFieldsContext } from "@/context/form-context";
import { PhoneNumberInput } from "@/components/ui/phone-number-input";

const formSchema = yup.object({
  full_name: yup.string().required(),
  email: yup.string().required().email(),
  contact_phone: yup
    .string()
    .matches(/^\+?[0-9\s-]+$/, "Por favor, ingresa un número de teléfono válido")
    .required(),
});

export default function StepOne() {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
    mode: "onBlur",
  });

  const { goToNextStep } = useStepContext();
  const { addFields } = useFormFieldsContext();

  const onSubmit = handleSubmit((values) => {
    addFields(values);
    goToNextStep();
  });

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <p className="text-center">
        ¡Presenta tu solicitud a continuación y nos comunicaremos contigo con más información!
      </p>

      <FormItem invalid={!!errors.email}>
        <Label>
          Nombre y apellido <span className="text-primary">*</span>
        </Label>
        <Input placeholder="Carlos Pérez" {...register("full_name")} />
        {errors.full_name && <FormItemMessage>{errors.full_name.message}</FormItemMessage>}
      </FormItem>

      <FormItem invalid={!!errors.email}>
        <Label>
          Email <span className="text-primary">*</span>
        </Label>
        <Input type="email" placeholder="carlos.perez@ejemplo.com" {...register("email")} />
        {errors.email && <FormItemMessage>{errors.email.message}</FormItemMessage>}
      </FormItem>

      <FormItem invalid={!!errors.contact_phone}>
        <Label>
          Teléfono de contacto <span className="text-primary">*</span>
        </Label>
        <Controller
          control={control}
          name="contact_phone"
          render={({ field: { value, onChange } }) => <PhoneNumberInput value={value} onChange={onChange} />}
        />
        {errors.contact_phone && <FormItemMessage>{errors.contact_phone.message}</FormItemMessage>}
      </FormItem>

      <Button className="w-full" type="submit">
        Siguiente
      </Button>
    </form>
  );
}
