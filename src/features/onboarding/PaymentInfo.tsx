import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setPaymentInfo } from "./onboardingSlice.tsx";
import { PaymentInfo } from "../../types/types.ts";

const PaymentInfoForm: React.FC = () => {
  const dispatch = useDispatch();

  const formik = useFormik<PaymentInfo>({
    initialValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
    validationSchema: Yup.object({
      cardNumber: Yup.string()
        .matches(/^[0-9]{16}$/, "Card number must be 16 digits")
        .required("Card number is required"),
      expiryDate: Yup.string()
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date")
        .required("Expiry date is required"),
      cvv: Yup.string()
        .matches(/^[0-9]{3}$/, "CVV must be 3 digits")
        .required("CVV is required"),
    }),
    onSubmit: (values) => {
      dispatch(setPaymentInfo(values));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="cardNumber">Card Number</label>
        <input
          id="cardNumber"
          type="text"
          name="cardNumber"
          value={formik.values.cardNumber}
          onChange={formik.handleChange}
        />
        {formik.errors.cardNumber && <p>{formik.errors.cardNumber}</p>}
      </div>
      <div>
        <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
        <input
          id="expiryDate"
          type="text"
          name="expiryDate"
          value={formik.values.expiryDate}
          onChange={formik.handleChange}
        />
        {formik.errors.expiryDate && <p>{formik.errors.expiryDate}</p>}
      </div>
      <div>
        <label htmlFor="cvv">CVV</label>
        <input
          id="cvv"
          type="text"
          name="cvv"
          value={formik.values.cvv}
          onChange={formik.handleChange}
        />
        {formik.errors.cvv && <p>{formik.errors.cvv}</p>}
      </div>
      <button type="submit">Next</button>
    </form>
  );
};

export default PaymentInfoForm;
