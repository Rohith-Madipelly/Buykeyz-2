import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const ScreenComponentRender = ({ stepUpConfig = [], currentStep: currentStepCallback }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isComplete, setIsComplete] = useState(false);



    const PageCountSelector = useSelector((state) => state.AccountSetUp.PageCount);

    useEffect(() => {
        currentStepCallback(currentStep);
        setCurrentStep(PageCountSelector);
    }, [currentStep, currentStepCallback,PageCountSelector]);

    if (!stepUpConfig.length) {
        return null;
    }

    const handleNext = () => {
        setCurrentStep(prev => {
            const nextStep = prev + 0.125;
            if (nextStep > stepUpConfig.length) {
                setIsComplete(true);
                return prev; // Prevents incrementing beyond the last step
            } else {
                return nextStep;
            }
        });
    };

    const ActiveComponent = stepUpConfig[currentStep - 1]?.component;

    return (
        <>
            {/* <View>
                {stepUpConfig.map((step, index) => (
                    <View key={step.name}>
                        <Text>{step.name}</Text>
                    </View>
                ))}
            </View> */}

            {ActiveComponent && <ActiveComponent />}

            {/* {!isComplete && <Button title="Next Component" onPress={handleNext} />} */}
          
        </>
    );
};

export default ScreenComponentRender;

const styles = StyleSheet.create({});
