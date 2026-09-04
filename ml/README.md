# Water Potability Prediction - ML Model

## Project Description

This machine learning model predicts whether water is potable (safe for drinking) or not potable based on water quality measurements.

## Input Features

The model uses these 9 features:

1. pH
2. Hardness
3. Solids
4. Chloramines
5. Sulfate
6. Conductivity
7. Organic_carbon
8. Trihalomethanes
9. Turbidity

## Output

- 0 = Not Potable
- 1 = Potable

## Machine Learning Models Tested

- Random Forest
- Logistic Regression
- Scaled Logistic Regression
- Decision Tree
- K-Nearest Neighbors (KNN)

The final model was selected based on the best performance during model comparison.

## Files

### water_potability.ipynb

Contains the complete ML work including data analysis, cleaning, model training, and evaluation.

### water_potability_model.pkl

The saved trained machine learning model used for predictions.

### feature_names.pkl

Contains the names and correct order of the input features.

## How to Use the Model

```python
import joblib

model = joblib.load("water_potability_model.pkl")
```

The model uses the 9 water-quality measurements and predicts:

- 0 = Not Potable
- 1 = Potable
