'use client';
import { ReactElement, useState } from "react";

export function MultiStepForm(steps: ReactElement[]) {

    const [currentStepIndex, setCurrentStepIndex] = useState(0)

    function next(){
        console.log("opa")
        setCurrentStepIndex(i => {
            if(i >=steps.length - 1) return i
            return i + 1
        })
    }

    function back(){
        setCurrentStepIndex(i => {
            if(i<=0) return i
            return i - 1
        })
    }

    function goTo(index: number) {
        setCurrentStepIndex(index)
    }

    return {
        currentStepIndex,
        step: steps[currentStepIndex],
        steps,
        goTo,
        next,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps.length - 1,
        back
    }
}

export default MultiStepForm;