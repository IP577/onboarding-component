import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { setPersonalProfile } from "./onboardingSlice.tsx";
import { RootState } from "../../store/store.ts";
import "../../css/features/onboarding/PersonalProfile.css";

const PersonalProfileForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const personalProfile = useSelector(
    (state: RootState) => state.onboarding.personalProfile
  );

  const formik = useFormik({
    initialValues: personalProfile || {
      name: "",
      age: 0,
      email: "",
      profilePicture: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      age: Yup.number()
        .min(18, "Age must be at least 18")
        .required("Age is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      dispatch(setPersonalProfile(values));
      navigate("/onboarding/step2");
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      formik.setFieldValue("profilePicture", event.currentTarget.files[0]);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="personal-profile-form">
      <h1 className="form-title">Personal Profile</h1>

      <label htmlFor="name" className="form-label">
        Name
      </label>
      <input
        id="name"
        type="text"
        name="name"
        className="form-input"
        value={formik.values.name}
        onChange={formik.handleChange}
      />
      {formik.errors.name && <p className="form-error">{formik.errors.name}</p>}

      <label htmlFor="age" className="form-label">
        Age
      </label>
      <input
        id="age"
        type="number"
        name="age"
        className="form-input"
        value={formik.values.age}
        onChange={formik.handleChange}
      />
      {formik.errors.age && <p className="form-error">{formik.errors.age}</p>}

      <label htmlFor="email" className="form-label">
        Email
      </label>
      <input
        id="email"
        type="email"
        name="email"
        className="form-input"
        value={formik.values.email}
        onChange={formik.handleChange}
      />
      {formik.errors.email && (
        <p className="form-error">{formik.errors.email}</p>
      )}

      <label htmlFor="profilePicture" className="form-label">
        Profile Picture
      </label>
      <input
        id="profilePicture"
        type="file"
        name="profilePicture"
        className="form-input"
        onChange={handleFileChange}
      />

      <div className="button-group">
        <button type="submit" className="form-button">
          Next
        </button>
      </div>
    </form>
  );
};

export default PersonalProfileForm;
