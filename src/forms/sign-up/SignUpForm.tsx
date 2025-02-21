import Stepper from "@/components/ui/stepper";
import { StepProvider } from "@/context/step-context";
import { FormFieldsProvider } from "@/context/form-context";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import StepSix from "./StepSix";

export function SignUpForm() {
  return (
    <FormFieldsProvider>
      <div className="bg-amber-500/10 rounded-2xl text-primary text-sm px-4 py-2 mb-10">
        Este formulario debe ser llenado por cada persona que vivirá la experiencia. El formulario es individual
      </div>

      <StepProvider>
        <Stepper steps={[<StepOne />, <StepTwo />, <StepThree />, <StepFour />, <StepFive />, <StepSix />]} />
      </StepProvider>
    </FormFieldsProvider>
  );
}
