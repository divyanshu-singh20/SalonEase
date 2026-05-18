import React, { useState } from "react";
import OwnerInfoForm from "./OwnerInfoForm";
import OwnerAuthStep from "./OwnerAuthStep";
import SalonInfoForm from "./SalonInfoForm";
import ServicesAndTimingForm from "./ServicesAndTimingForm";
import BankDetailsForm from "./BankDetailsForm";
import { registerShopkeeper } from "../service/api";
import { useNavigate } from "react-router-dom";

const SalonRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
    ownerName: "",
    email: "",
    salonName: "",
    address: "",
    genderType: "",
    latitude: "",
    longitude: "",
    servicesAndTiming: {
      services: [{ name: "", price: "", duration: "" }],
      openingTime: "",
      closingTime: "",
      workingDays: [],
      notes: "",
    },
    accountHolder: "",
    accountNumber: "",
    ifsc: "",
    upiId: "",
    bankName: "",
  });
  const navigate = useNavigate();
  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleFinalSubmit = async () => {
    try {
      const fullForm = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        if (key === "servicesAndTiming" || Array.isArray(value)) {
          fullForm.append(key, JSON.stringify(value));
        } else {
          fullForm.append(key, value);
        }
      });

      await registerShopkeeper(fullForm);
      navigate("/login");
      alert(" Registration Successful!");
    } catch (err) {
      alert(err?.response?.data?.message || "Registration Failed.");
      console.error(err);
    }
  };

  return (
    <>
      {step === 1 && (
        <OwnerAuthStep
          onNext={handleNext}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {step === 2 && (
        <OwnerInfoForm
          onNext={handleNext}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {step === 3 && (
        <SalonInfoForm
          onNext={handleNext}
          onBack={handleBack}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {step === 4 && (
        <ServicesAndTimingForm
          onNext={handleNext}
          onBack={handleBack}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {step === 5 && (
        <BankDetailsForm
          onNext={handleFinalSubmit}
          onBack={handleBack}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </>
  );
};

export default SalonRegistration;
