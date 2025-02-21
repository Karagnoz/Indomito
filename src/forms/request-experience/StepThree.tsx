import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useStepContext } from "@/context/step-context";
import { useForm } from "react-hook-form";
import { FormItem } from "@/components/ui/form-item";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormFieldsContext } from "@/context/form-context";
import { Textarea } from "@/components/ui/textarea";

const formSchema = yup.object({
  experience_motivation: yup.string(),
  experience_keywords: yup.string(),
  user_questions: yup.string(),
});

export default function StepOne() {
  const { handleSubmit, register } = useForm({
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

      <FormItem>
        <Label>Cuéntanos un poco más sobre tí ¿por qué quieres vivir esta experiencia?</Label>
        <Textarea placeholder="Siempre he querido navegar en kayak..." {...register("experience_motivation")} />
      </FormItem>

      <FormItem>
        <Label>Escribe 3 palabras que definan lo que quieres vivir con esta experiencia</Label>
        <Textarea placeholder="Libertad, Aventura..." {...register("experience_keywords")} />
      </FormItem>

      <FormItem>
        <Label>¿Tienes alguna pregunta específica para nosotros?</Label>
        <Textarea placeholder="Tengo una duda sobre..." {...register("user_questions")} />
      </FormItem>

      <Button className="w-full" type="submit">
        Siguiente
      </Button>
    </form>
  );
}
