import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setPersonalProfile } from "./onboardingSlice.tsx";
import { PersonalProfile } from "../../types/types.ts";

const PersonalProfileForm: React.FC = () => {
  const dispatch = useDispatch();

  const formik = useFormik<PersonalProfile>({
    initialValues: {
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
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <section>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        {formik.errors.name && <p>{formik.errors.name}</p>}
      </section>

      <section>
        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          name="age"
          value={formik.values.age}
          onChange={formik.handleChange}
        />
        {formik.errors.age && <p>{formik.errors.age}</p>}
      </section>

      <section>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.errors.email && <p>{formik.errors.email}</p>}
      </section>

      <section>
        <label htmlFor="profilePicture">Profile Picture</label>
        <input
          id="profilePicture"
          type="file"
          name="profilePicture"
          onChange={(event) =>
            formik.setFieldValue(
              "profilePicture",
              event.currentTarget.files?.[0]
            )
          }
        />
      </section>

      <button type="submit">Next</button>
    </form>
  );
};

export default PersonalProfileForm;
