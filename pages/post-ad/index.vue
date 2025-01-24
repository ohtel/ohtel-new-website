<template>
    <div class="card p-6 bg-gray-50 rounded-lg shadow-lg max-w-3xl mx-auto">
        <Stepper value="1" class="custom-stepper">
            <div class="progress-bar">
                <div
                    class="progress-bar-fill"
                    :style="{ width: `${progress}%` }"
                ></div>
                <div class="progress-label">{{ progress }}% completed</div>
            </div>
            <StepItem value="1">
                <Step>
                    <div class="step-header">
                        <div class="step-number-container">
                            <span class="step-number">1</span>
                            <div class="vertical-progress-bar">
                                <div
                                    class="vertical-progress-bar-fill"
                                    :style="{ height: `${progress >= 33 ? 100 : 0}%` }"
                                ></div>
                            </div>
                        </div>
                        <span>Step 1: Header I</span>
                    </div>
                </Step>
                <StepPanel v-slot="{ activateCallback }">
                    <div class="flex flex-col items-center h-48">
                        <div class="content-box">
                            Content for Step 1
                        </div>
                    </div>
                    <div class="flex justify-end py-4">
                        <Button
                            label="Next"
                            class="next-button"
                            @click="handleNextStep(activateCallback, 2)"
                        />
                    </div>
                </StepPanel>
            </StepItem>
            <StepItem value="2">
                <Step>
                    <div class="step-header">
                        <div class="step-number-container">
                            <span class="step-number">2</span>
                            <div class="vertical-progress-bar">
                                <div
                                    class="vertical-progress-bar-fill"
                                    :style="{ height: `${progress >= 66 ? 100 : 0}%` }"
                                ></div>
                            </div>
                        </div>
                        <span>Step 2: Header II</span>
                    </div>
                </Step>
                <StepPanel v-slot="{ activateCallback }">
                    <div class="flex flex-col items-center h-48">
                        <div class="content-box">
                            Content for Step 2
                        </div>
                    </div>
                    <div class="flex justify-between py-4">
                        <Button
                            label="Back"
                            class="back-button"
                            severity="secondary"
                            @click="handleNextStep(activateCallback, 1)"
                        />
                        <Button
                            label="Next"
                            class="next-button"
                            @click="handleNextStep(activateCallback, 3)"
                        />
                    </div>
                </StepPanel>
            </StepItem>
            <StepItem value="3">
                <Step>
                    <div class="step-header">
                        <div class="step-number-container">
                            <span class="step-number">3</span>
                            <div class="vertical-progress-bar">
                                <div
                                    class="vertical-progress-bar-fill"
                                    :style="{ height: `${progress === 100 ? 100 : 0}%` }"
                                ></div>
                            </div>
                        </div>
                        <span>Step 3: Header III</span>
                    </div>
                </Step>
                <StepPanel v-slot="{ activateCallback }">
                    <div class="flex flex-col items-center h-48">
                        <div class="content-box">
                            Content for Step 3
                        </div>
                    </div>
                    <div class="flex justify-between py-4">
                        <Button
                            label="Back"
                            class="back-button"
                            severity="secondary"
                            @click="handleNextStep(activateCallback, 2)"
                        />
                        <Button
                            label="Submit"
                            class="submit-button"
                            @click="handleSubmit"
                        />
                    </div>
                </StepPanel>
            </StepItem>
        </Stepper>
    </div>
</template>

<script setup>
import Stepper from "primevue/stepper";
import StepItem from "primevue/stepitem";
import Step from "primevue/step";
import StepPanel from "primevue/steppanel";
import Button from "primevue/button";
import { ref } from 'vue';

const progress = ref(33); // Default to Step 1 (33%)

function handleNextStep(callback, step) {
    progress.value = step === 1 ? 33 : step === 2 ? 66 : 100;
    callback(step.toString());
}

function handleSubmit() {
    // Implement the submit logic here
    console.log("Form submitted");
}
</script>

<style scoped>
.card {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    padding: 2rem;
    font-family: "Arial", sans-serif;
}

.custom-stepper {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.progress-bar {
    position: relative;
    height: 6px;
    background: #e5e7eb;
    border-radius: 3px;
    margin-bottom: 2rem;
    overflow: hidden;
}

.progress-bar-fill {
    height: 100%;
    background: linear-gradient(180deg, #47509B 0%, #A20584 100%);
    transition: width 0.3s ease;
}

.progress-label {
    position: absolute;
    top: -25px;
    right: 0;
    font-size: 14px;
    font-weight: bold;
    color: #47509B;
}

.step-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-weight: bold;
    font-size: 1.1rem;
    color: #47509B;
}

.step-number-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}

.step-number {
    background: #A20584;
    color: white;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    z-index: 1;
}

.vertical-progress-bar {
    width: 4px;
    height: 100px;
    background: #e5e7eb;
    position: absolute;
    top: 35px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 2px;
    overflow: hidden;
}

.vertical-progress-bar-fill {
    width: 100%;
    background: linear-gradient(180deg, #47509B 0%, #A20584 100%);
    transition: height 0.3s ease;
}
.content-box {
    border: 2px dashed #cbd5e1;
    background: #f9fafb;
    border-radius: 6px;
    padding: 2rem;
    width: 100%;
    text-align: center;
    font-size: 1rem;
    color: #374151;
}

.next-button,
.submit-button {
    background: #47509B;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.next-button:hover,
.submit-button:hover {
    background-color: #3b4a8b;
}

.back-button {
    background: #A20584;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.back-button:hover {
    background-color: #8b046b;
}

</style>