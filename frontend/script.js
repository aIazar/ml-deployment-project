document.getElementById("loan-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const resultBox = document.getElementById("result");
  resultBox.className = "result";
  resultBox.textContent = "Predicting...";
  resultBox.classList.remove("hidden");

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
    previous_loan_defaults_on_file: previous_loan_defaults_on_file.value
  };

  try {
    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.logistic_regression_prediction === 1) {
      resultBox.textContent = "✅ Loan Approved";
      resultBox.classList.add("approved");
    } else {
      resultBox.textContent = "❌ Loan Rejected";
      resultBox.classList.add("rejected");
    }

    resultBox.scrollIntoView({ behavior: "smooth" });

  } catch {
    resultBox.textContent = "⚠️ Backend not reachable";
    resultBox.classList.add("rejected");
  }
});
