import { useFormFieldsContext } from "@/context/form-context";
import { useStepContext } from "@/context/step-context";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, useForm } from "react-hook-form";
import { InferType, ObjectSchema } from "yup";

function useMultiStepForm(formSchema: ObjectSchema<FieldValues>) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<InferType<typeof formSchema>>({
    resolver: yupResolver(formSchema),
    mode: "onSubmit",
  });

  const { goToNextStep } = useStepContext();
  const { addFields } = useFormFieldsContext();

  const onSubmit = handleSubmit((values) => {
    addFields(values);
    goToNextStep();
  });

  return {
    onSubmit,
    register,
    errors,
  };
}
export default useMultiStepForm;
