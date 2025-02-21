import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStepContext } from "@/context/step-context";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { FormItem, FormItemMessage } from "@/components/ui/form-item";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormFieldsContext } from "@/context/form-context";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

const formSchema = yup.object({
  weight: yup
    .string()
    .matches(/^[0-9]+$/, "Este campo solo permite números")
    .required(),
  height: yup
    .string()
    .matches(/^[0-9]+$/, "Este campo solo permite números")
    .required(),
  dietary_requirements: yup.string(),
  medical_condition: yup.string(),
  allergies: yup.string(),
});

export default function StepThree() {
  const {
    handleSubmit,
    register,
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
      <p className="text-center font-bold">Datos médicos</p>

      <div className="flex max-xs:flex-col gap-2">
        <FormItem className="flex-1" invalid={!!errors.weight}>
          <Label>
            Peso (kg)
            <span className="text-primary ml-0.5">*</span>
          </Label>
          <Input type="number" min={0} {...register("weight")} placeholder="70" />
          {errors.weight && <FormItemMessage>{errors.weight.message}</FormItemMessage>}
        </FormItem>

        <FormItem className="flex-1" invalid={!!errors.height}>
          <Label>
            Altura (cm)
            <span className="text-primary ml-0.5">*</span>
          </Label>
          <Input type="number" min={0} {...register("height")} placeholder="175" />
          {errors.height && <FormItemMessage>{errors.height.message}</FormItemMessage>}
        </FormItem>
      </div>

      <Separator />

      <FormItem invalid={!!errors.dietary_requirements}>
        <Label>¿Qué requisitos dietéticos debemos tomar en cuenta?</Label>
        <Textarea {...register("dietary_requirements")} />
        {errors.dietary_requirements && <FormItemMessage>{errors.dietary_requirements.message}</FormItemMessage>}
      </FormItem>

      <FormItem invalid={!!errors.medical_condition}>
        <Label>¿Tienes alguna condición médica? Coméntanos</Label>
        <Textarea {...register("medical_condition")} />
        {errors.medical_condition && <FormItemMessage>{errors.medical_condition.message}</FormItemMessage>}
      </FormItem>

      <FormItem invalid={!!errors.allergies}>
        <Label>¿Tienes alguna alergia? Coméntanos</Label>
        <Textarea {...register("allergies")} />
        {errors.allergies && <FormItemMessage>{errors.allergies.message}</FormItemMessage>}
      </FormItem>

      <Button className="w-full">Siguiente</Button>
    </form>
  );
}
