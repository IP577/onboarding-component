import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setPersonalProfile } from "./onboardingSlice.tsx";
import { useNavigate } from "react-router-dom";

const PersonalProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const personalProfile = useSelector(
    (state: RootState) => state.onboarding.personalProfile
  );

  const formik = useFormik({
    initialValues: {
      name: personalProfile.name || "",
      age: personalProfile.age || 0,
      email: personalProfile.email || "",
      profilePicture: personalProfile.profilePicture || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      age: Yup.number().min(1, "Invalid age").required("Age is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: (values) => {
      dispatch(setPersonalProfile(values));
      navigate("/onboarding/step2");
    },
  });

  return (
    <div>
      <h1>Personal Profile</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        {formik.errors.name && <p>{formik.errors.name}</p>}
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formik.values.age}
          onChange={formik.handleChange}
        />
        {formik.errors.age && <p>{formik.errors.age}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.errors.email && <p>{formik.errors.email}</p>}
        <input
          type="file"
          name="profilePicture"
          onChange={(e) =>
            formik.setFieldValue("profilePicture", e.target.files?.[0] || "")
          }
        />
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default PersonalProfile;
