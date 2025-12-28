from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
from fastapi.middleware.cors import CORSMiddleware


# -------------------------------------------------
# Initialize FastAPI app
# -------------------------------------------------
app = FastAPI(
    title="Loan Approval Prediction API",
    description="Predict loan approval using Logistic Regression and Decision Tree models",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later we can restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------------------------
# Load trained ML pipelines
# -------------------------------------------------
logistic_model = joblib.load("logistic_regression_pipeline.pkl")
decision_tree_model = joblib.load("decision_tree_pipeline.pkl")

# -------------------------------------------------
# Input data schema
# -------------------------------------------------
class LoanApplication(BaseModel):
    person_age: float
    person_gender: str
    person_education: str
    person_income: float
    person_emp_exp: int
    person_home_ownership: str
    loan_amnt: float
    loan_intent: str
    loan_int_rate: float
    loan_percent_income: float
    cb_person_cred_hist_length: float
    credit_score: int
    previous_loan_defaults_on_file: str


# -------------------------------------------------
# Health check endpoint
# -------------------------------------------------
@app.get("/")
def root():
    return {"message": "Loan Approval Prediction API is running"}


# -------------------------------------------------
# Prediction endpoint
# -------------------------------------------------
@app.post("/predict")
def predict_loan_status(application: LoanApplication):
    """
    Predict loan approval using trained ML models.
    """

    # Convert input data to pandas DataFrame
    input_data = pd.DataFrame([application.dict()])

    # Make predictions
    lr_prediction = logistic_model.predict(input_data)[0]
    dt_prediction = decision_tree_model.predict(input_data)[0]

    # Return results
    return {
        "logistic_regression_prediction": int(lr_prediction),
        "decision_tree_prediction": int(dt_prediction)
    }
