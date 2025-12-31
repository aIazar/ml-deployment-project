let firstRequest = true;

document.getElementById("loan-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const resultBox = document.getElementById("result");
  const warningBox = document.getElementById("coldStartWarning");

  resultBox.className = "result";
  resultBox.textContent = "Predicting...";
  resultBox.classList.remove("hidden");

  
  if (firstRequest) {
    warningBox.classList.remove("hidden");
  }

  const person_age = document.getElementById("person_age");
  const person_gender = document.getElementById("person_gender");
  const person_education = document.getElementById("person_education");
  const person_income = document.getElementById("person_income");
  const person_emp_exp = document.getElementById("person_emp_exp");
  const person_home_ownership = document.getElementById("person_home_ownership");
  const loan_amnt = document.getElementById("loan_amnt");
  const loan_intent = document.getElementById("loan_intent");
  const loan_int_rate = document.getElementById("loan_int_rate");
  const loan_percent_income = document.getElementById("loan_percent_income");
  const cb_person_cred_hist_length = document.getElementById("cb_person_cred_hist_length");
  const credit_score = document.getElementById("credit_score");
  const previous_loan_defaults_on_file = document.getElementById("previous_loan_defaults_on_file");

  const model_type = document.querySelector(
    'input[name="model_type"]:checked'
  ).value;

  const data = {
    person_age: Number(person_age.value),
    person_gender: person_gender.value,
    person_education: person_education.value,
    person_income: Number(person_income.value),
    person_emp_exp: Number(person_emp_exp.value),
    person_home_ownership: person_home_ownership.value,
    loan_amnt: Number(loan_amnt.value),
    loan_intent: loan_intent.value,
    loan_int_rate: Number(loan_int_rate.value),
    loan_percent_income: Number(loan_percent_income.value),
    cb_person_cred_hist_length: Number(cb_person_cred_hist_length.value),
    credit_score: Number(credit_score.value),
    previous_loan_defaults_on_file: previous_loan_defaults_on_file.value,
    model_type: model_type
  };

  try {
    const response = await fetch(
      "https://loan-approval-prediction-xktt.onrender.com/predict",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }
    );

    const result = await response.json();

 
    warningBox.classList.add("hidden");
    firstRequest = false;

    if (result.loan_approved === 1) {
      resultBox.textContent = ` Loan Approved (${result.model_used})`;
      resultBox.classList.add("approved");
    } else {
      resultBox.textContent = ` Loan Rejected (${result.model_used})`;
      resultBox.classList.add("rejected");
    }

    resultBox.scrollIntoView({ behavior: "smooth" });

  } catch (error) {
    warningBox.classList.add("hidden");
    resultBox.textContent = "⚠️ Backend not reachable";
    resultBox.classList.add("rejected");
  }
});

document.getElementById("resetBtn").addEventListener("click", () => {
  const resultBox = document.getElementById("result");
  const warningBox = document.getElementById("coldStartWarning");

  resultBox.className = "result hidden";
  resultBox.textContent = "";
  warningBox.classList.add("hidden");

  document.getElementById("loan-form").reset();
});