import { cn } from "@/client/lib/utils";
import type { ReactNode } from "react";
import React from "react";

type StepperFormProps = {
  children: ReactNode;
  currentStep: number;
  steps: Array<string>;
  className?: string;
  onStep?: (step: number) => void;
};

export const StepperForm = ({ children, currentStep, steps, className, onStep }: StepperFormProps) => {
  const content = React.Children.toArray(children)[currentStep];
  const handleStep = (index: number) => {
    if (index < currentStep) onStep?.(index);
  };
  return (
    <div className={cn("flex flex-1 flex-col gap-4", className)}>
      <div className="flex justify-between gap-4">
        {steps.map((step, index) => (
          <div
            key={step}
            className="flex flex-1 cursor-pointer flex-col gap-2"
            onClick={() => handleStep(index)}
            onKeyUp={(e) => {
              if (e.key === "Enter") handleStep(index);
            }}
          >
            <strong className="font-normal">{step}</strong>
            <div
              className={cn("h-2 w-full rounded-md", {
                "bg-blue-600": currentStep >= index,
              })}
            />
          </div>
        ))}
      </div>
      {content}
    </div>
  );
};
