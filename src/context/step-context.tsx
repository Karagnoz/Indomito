import React, { createContext, useContext, useState } from "react";

interface StepContextProps {
  currentStep: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  setStep: (step: number) => void;
}

const StepContext = createContext<StepContextProps | undefined>(undefined);

export const StepProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const goToNextStep = () => setCurrentStep((prev) => prev + 1);
  const goToPreviousStep = () => setCurrentStep((prev) => prev - 1);
  const setStep = (step: number) => setCurrentStep(step);

  return (
    <StepContext.Provider value={{ currentStep, goToNextStep, goToPreviousStep, setStep }}>
      {children}
    </StepContext.Provider>
  );
};

export const useStepContext = () => {
  const context = useContext(StepContext);

  if (!context) throw new Error("useStep must be used within StepProvider");

  return context;
};
