import Stepper from "@/components/ui/stepper";
import { StepProvider } from "@/context/step-context";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import { FormFieldsProvider } from "@/context/form-context";

export function RequestExperienceForm() {
  return (
    <FormFieldsProvider>
      <StepProvider>
        <Stepper steps={[<StepOne />, <StepTwo />, <StepThree />, <StepFour />]} />
      </StepProvider>
    </FormFieldsProvider>
  );
}
