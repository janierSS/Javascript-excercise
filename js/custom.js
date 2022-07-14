const stepSelector = {
  1: ".js-step-one",
  2: ".js-step-two",
  3: ".js-step-three",
};

let formStepState = 1;
let validatedForms = [];

const btnNext = document.querySelector(".js-btn-next");
const btnBack = document.querySelector(".js-btn-back");
const btnSubmit = document.querySelector(".js-btn-submit");
const selectPaymentElement = document.querySelector(".js-form-3");
const formElement = document.querySelector(".js-needs-validation");

const toggleForm = () => {
  const formStepElement = document.querySelector(stepSelector[formStepState]);

  if (formStepElement) {
    formStepElement.classList.toggle("hidden");
  }
};

const isCurrentFormInvalid = () => {
  if (!formElement.checkValidity()) {
    const invalidInputs = formElement.querySelectorAll(":invalid");

    return Array.from(invalidInputs).some((input) => {
      return input.classList.contains(`js-form-${formStepState}`);
    });
  }

  return false;
};

const nextFormStep = () => {
  formElement.classList.add("was-validated");
  let isInvalid = isCurrentFormInvalid();
  if (isInvalid) {
    validatedForms = validatedForms.filter((form) => formStepState);
  } else {
    validatedForms.push(formStepState);
    toggleForm();
    formStepState += 1;
    toggleForm();

    if (formStepState === 3) {
      btnNext.classList.add("hidden");
      btnSubmit.classList.remove("hidden");
    }

    if (formStepState > 1) {
      btnBack.classList.remove("hidden");
    }

    if (!validatedForms.includes(formStepState)) {
      formElement.classList.remove("was-validated");
    }
  }
};

const backFormStep = () => {
  formElement.classList.add("was-validated");
  toggleForm();
  formStepState -= 1;
  toggleForm();

  if (formStepState === 1) {
    btnBack.classList.add("hidden");
  }

  if (formStepState < 3) {
    btnNext.classList.remove("hidden");
    btnSubmit.classList.add("hidden");
  }
};

selectPaymentElement.setCustomValidity("invalid field.");

const handlePaymentMethodChange = (e) => {
  if (e.target.value === "Select your preferred option") {
    selectPaymentElement.setCustomValidity("invalid field.");
  } else {
    selectPaymentElement.setCustomValidity("");
  }
};

const handleSubmit = () => {
  formElement.classList.add("was-validated");
  if (!isCurrentFormInvalid()) {
    const formData = new FormData(formElement);
    let data = {};
    for (const [key, value] of formData) {
      data[key] = value;
    }
    console.log(data);
    formElement.classList.add("hidden");
    const alertElement = document.querySelector(".js-alert");
    alertElement.classList.remove("hidden");
  }
};

btnNext.addEventListener("click", nextFormStep);
btnBack.addEventListener("click", backFormStep);
btnSubmit.addEventListener("click", handleSubmit);
selectPaymentElement.addEventListener("change", handlePaymentMethodChange);
