import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStepContext } from "@/context/step-context";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { FormItem, FormItemMessage } from "@/components/ui/form-item";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormFieldsContext } from "@/context/form-context";
import { PhoneNumberInput } from "@/components/ui/phone-number-input";
import { Separator } from "@/components/ui/separator";

const formSchema = yup.object({
  contact_phone: yup
    .string()
    .matches(/^\+?[0-9\s-]+$/, "Por favor, ingresa un número de teléfono válido")
    .required(),
  email: yup.string().required().email(),
  email_confirmation: yup
    .string()
    .required()
    .email()
    .test("email-match", "Los correos ingresados deben coincidir", function (value) {
      return this.parent.email === value;
    }),
  place_of_residence: yup.string().required(),
  profession: yup.string().required(),
  emergency_contact_name: yup.string().required(),
  emergency_contact_phone: yup
    .string()
    .matches(/^\+?[0-9\s-]+$/, "Por favor, ingresa un número de teléfono válido")
    .required(),
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
      <p className="text-center font-bold">Datos de contacto</p>

      <FormItem invalid={!!errors.contact_phone}>
        <Label>
          Teléfono de contacto
          <span className="text-primary ml-0.5">*</span>
        </Label>
        <Controller
          control={control}
          name="contact_phone"
          render={({ field: { value, onChange } }) => <PhoneNumberInput value={value} onChange={onChange} />}
        />
        {errors.contact_phone && <FormItemMessage>{errors.contact_phone.message}</FormItemMessage>}
      </FormItem>

      <FormItem invalid={!!errors.email}>
        <Label>
          Correo electrónico
          <span className="text-primary ml-0.5">*</span>
        </Label>
        <Input {...register("email")} placeholder="olivia.montero@ejemplo.com" />
        {errors.email && <FormItemMessage>{errors.email.message}</FormItemMessage>}
      </FormItem>

      <FormItem invalid={!!errors.email_confirmation}>
        <Label>
          Confirmación de correo
          <span className="text-primary ml-0.5">*</span>
        </Label>
        <Input {...register("email_confirmation")} placeholder="olivia.montero@ejemplo.com" />
        {errors.email_confirmation && <FormItemMessage>{errors.email_confirmation.message}</FormItemMessage>}
      </FormItem>

      <FormItem invalid={!!errors.place_of_residence}>
        <Label>
          Lugar de residencia
          <span className="text-primary ml-0.5">*</span>
        </Label>
        <Input {...register("place_of_residence")} placeholder="San Francisco, California" />
        {errors.place_of_residence && <FormItemMessage>{errors.place_of_residence.message}</FormItemMessage>}
      </FormItem>

      <FormItem invalid={!!errors.profession}>
        <Label>
          Ocupación
          <span className="text-primary ml-0.5">*</span>
        </Label>
        <Input {...register("profession")} />
        {errors.profession && <FormItemMessage>{errors.profession.message}</FormItemMessage>}
      </FormItem>

      <Separator className="!my-8" />

      <p className="font-bold">Contacto de emergencia</p>

      <div className="flex max-sm:flex-col gap-4">
        <FormItem className="flex-1" invalid={!!errors.emergency_contact_name}>
          <Label>
            Nombres y apellidos <span className="text-primary">*</span>
          </Label>
          <Input placeholder="Carla Montero" {...register("emergency_contact_name")} />
          {errors.emergency_contact_name && <FormItemMessage>{errors.emergency_contact_name.message}</FormItemMessage>}
        </FormItem>
        <FormItem className="flex-1" invalid={!!errors.emergency_contact_phone}>
          <Label>
            Teléfono<span className="text-primary">*</span>
          </Label>
          <Input placeholder="999 999 999" {...register("emergency_contact_phone")} />
          {errors.emergency_contact_phone && (
            <FormItemMessage>{errors.emergency_contact_phone.message}</FormItemMessage>
          )}
        </FormItem>
      </div>
      <Button className="w-full">Siguiente</Button>
    </form>
  );
}
