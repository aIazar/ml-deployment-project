document.getElementById("loanForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
        person_age: Number(document.getElementById("person_age").value),
        person_gender: document.getElementById("person_gender").value,
        person_education: document.getElementById("person_education").value,
        person_income: Number(document.getElementById("person_income").value),
        person_emp_exp: Number(document.getElementById("person_emp_exp").value),
        person_home_ownership: document.getElementById("person_home_ownership").value,
        loan_amnt: Number(document.getElementById("loan_amnt").value),
        loan_intent: document.getElementById("loan_intent").value,
        loan_int_rate: Number(document.getElementById("loan_int_rate").value),
        loan_percent_income: Number(document.getElementById("loan_percent_income").value),
        cb_person_cred_hist_length: Number(document.getElementById("cb_person_cred_hist_length").value),
        credit_score: Number(document.getElementById("credit_score").value),
        previous_loan_defaults_on_file: document.getElementById("previous_loan_defaults_on_file").value
    };

    const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    document.getElementById("result").innerText =
        `Logistic Regression: ${result.logistic_regression_prediction === 1 ? "Approved" : "Rejected"}
Decision Tree: ${result.decision_tree_prediction === 1 ? "Approved" : "Rejected"}`;
});
