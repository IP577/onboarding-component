import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setPaymentDetails } from "./onboardingSlice.tsx";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Snackbar, Alert } from "@mui/material";

const PaymentInfoForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
    validationSchema: Yup.object({
      cardNumber: Yup.string()
        .matches(/^\d{16}$/, "Card number must be 16 digits")
        .required("Card number is required"),
      expiryDate: Yup.string()
        .matches(
          /^(0[1-9]|1[0-2])\/\d{2}$/,
          "Expiry date must be in MM/YY format"
        )
        .required("Expiry date is required"),
      cvv: Yup.string()
        .matches(/^\d{3}$/, "CVV must be 3 digits")
        .required("CVV is required"),
    }),
    onSubmit: (values) => {
      dispatch(setPaymentDetails(values));
      setOpenSnackbar(true); // Show success message
      setTimeout(() => navigate("/home"), 3000); // Redirect after 3 seconds
    },
  });

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h2>Payment Information</h2>
      <form onSubmit={formik.handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <TextField
            fullWidth
            id="cardNumber"
            name="cardNumber"
            label="Card Number"
            value={formik.values.cardNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.cardNumber && Boolean(formik.errors.cardNumber)
            }
            helperText={formik.touched.cardNumber && formik.errors.cardNumber}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <TextField
            fullWidth
            id="expiryDate"
            name="expiryDate"
            label="Expiry Date (MM/YY)"
            value={formik.values.expiryDate}
            onChange={formik.handleChange}
            error={
              formik.touched.expiryDate && Boolean(formik.errors.expiryDate)
            }
            helperText={formik.touched.expiryDate && formik.errors.expiryDate}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <TextField
            fullWidth
            id="cvv"
            name="cvv"
            label="CVV"
            value={formik.values.cvv}
            onChange={formik.handleChange}
            error={formik.touched.cvv && Boolean(formik.errors.cvv)}
            helperText={formik.touched.cvv && formik.errors.cvv}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            onClick={() => navigate("/onboarding/step2")}
          >
            Previous
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Next
          </Button>
        </div>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Onboarding Completed Successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PaymentInfoForm;
