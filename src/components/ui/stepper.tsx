// Stepper.tsx
import React from "react";
import { useStepContext } from "@/context/step-context";
import { cn } from "@/lib/utils";

interface StepperProps {
  steps: React.ReactNode[];
}

const Stepper: React.FC<StepperProps> = ({ steps }) => {
  const { currentStep } = useStepContext();

  return (
    <div>
      <div className="flex items-center justify-center mb-6">
        {steps.map((_, index) => (
          <React.Fragment key={index}>
            <div
              className={cn(
                "grid place-items-center shrink-0 rounded-full size-9 bg-white",
                currentStep >= index && "bg-primary"
              )}
            >
              <span className={cn("text-sm", currentStep >= index && "text-white")}>{index + 1}</span>
            </div>
            {index < steps.length - 1 && <div className="flex-1 shrink-0 h-px bg-grey-blue mx-3"></div>}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-10">{steps[currentStep]}</div>
    </div>
  );
};

export default Stepper;
