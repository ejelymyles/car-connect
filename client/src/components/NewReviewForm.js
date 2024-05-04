import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

function ReviewForm({ initialValues, onSubmit, onCancel }) {

  const formSchema = Yup.object().shape({
    rating: Yup.number().required("Rating is required")
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot be more than 5"),
    comments: Yup.string().required("Comments are required"),
  });

  const formik = useFormik({
    initialValues: {
      rating: initialValues.rating || "",
      comments: initialValues.comments || "",
      user_id: initialValues.user_id || "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="rating">Rating:</label>
      <input type="number" id="rating" name="rating" min="1" max="5" onChange={formik.handleChange} value={formik.values.rating}/>
      {formik.errors.rating && ( <div style={{ color: "red" }}>{formik.errors.rating}</div>)}
      <label htmlFor="comments">Comments:</label>
      <textarea id="comments" name="comments" onChange={formik.handleChange} value={formik.values.comments} />
      {formik.errors.comments && (<div style={{ color: "red" }}>{formik.errors.comments}</div>)}
      <button type="submit">Submit</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default ReviewForm;
