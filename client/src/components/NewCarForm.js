import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';


const formSchema = Yup.object().shape({
    make: Yup.string().required('Make is required'),
    model: Yup.string().required('Model is required'),
    year: Yup.number().required('Year is required').integer('Year must be an integer')
    .min(1950, 'Year must be at least 1950')
    .max(2024, 'Year cannot be greater than 2024'),
    mileage: Yup.number().required('Mileage is required').integer('Mileage must be an integer'),
    price: Yup.number().required('Price is required').min(0, 'Price cannot be negative'),
    description: Yup.string(),
});

function NewCarForm({initialValues , onCancel}){

    const handleSubmit = (values, { setSubmitting }) => {
        fetch('/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values, null, 2),
        }). then((res) => {
            if (res.status === 200) {
                setSubmitting(false);
                formik.resetForm();
            }
        });
    };

    const handleEditCar = (values, setSubmitting) => {
        const updatedCar = {
            make: values.make,
            model: values.model,
            year: values.year,
            mileage: values.mileage,
            price: values.price,
            description: values.description,
          };

        fetch(`/cars/${initialValues.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCar),
        }).then((res) => {
            if (res.ok) {
                setSubmitting(false);
            }
        });
    };

    const handleReset = () =>{
        formik.resetForm();
    };

    const formik = useFormik({
        initialValues: initialValues || {
            make: '',
            model: '',
            year: '',
            mileage: '',
            price: '',
            description: '',
        },
        validationSchema: formSchema,
        onSubmit: (values, { setSubmitting }) => {
            if (initialValues && initialValues.id) {
                handleEditCar(values, setSubmitting);
            } else {
                handleSubmit(values, setSubmitting);
            }
        },
        onReset: handleReset
    });

    return(
        <div className='form'>
            <h1 className="full-list-header">Enter Car Details</h1>
            <form onSubmit={formik.handleSubmit} onReset={formik.onReset}>
                <label htmlFor='make'>Make</label>
                <br />
                <input id="make" name='make' onChange={formik.handleChange} value={formik.values.make} />
                <p style={{ color: 'red'}}>{formik.errors.make}</p>
                <label htmlFor='model'>Model</label>
                <br />
                <input id="model" name='model' onChange={formik.handleChange} value={formik.values.model} />
                <p style={{ color: 'red'}}>{formik.errors.model}</p>
                <label htmlFor='year'>Year</label>
                <br />
                <input id="year" name='year' onChange={formik.handleChange} value={formik.values.year} />
                <p style={{ color: 'red'}}>{formik.errors.year}</p>
                <label htmlFor='mileage'>Mileage</label>
                <br />
                <input id="mileage" name='mileage' onChange={formik.handleChange} value={formik.values.mileage} />
                <p style={{ color: 'red'}}>{formik.errors.mileage}</p>
                <label htmlFor='price'>Price</label>
                <br />
                <input id="price" name='price' onChange={formik.handleChange} value={formik.values.price} />
                <p style={{ color: 'red'}}>{formik.errors.price}</p>
                <label htmlFor='description'>Description</label>
                <br />
                <input id="description" name='description' onChange={formik.handleChange} value={formik.values.description} />
                <p style={{ color: 'red'}}>{formik.errors.description}</p>
                <button type="submit" disabled={formik.isSubmitting}>{initialValues && initialValues.id ? "Update Car Details" : "Submit New Car"}</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    )
}

export default NewCarForm;