import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';


const formSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    location: Yup.string().required('Location is required'),
    bio: Yup.string(),
});

function NewUserForm(){
    const handleSubmit = (values, { setSubmitting }) => {
        fetch('/users', {
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

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            location: '',
            bio: '',
        },
        validationSchema: formSchema,
        onSubmit: handleSubmit,
    });

    return(
        <div>
            <h1>Add New Users</h1>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor='username'>Username</label>
                <br />
                <input id="username" name='username' onChange={formik.handleChange} value={formik.values.username} />
                <p style={{ color: 'red'}}>{formik.errors.username}</p>
                <label htmlFor='email'>Email Address</label>
                <br />
                <input id="email" name='email' onChange={formik.handleChange} value={formik.values.email} />
                <p style={{ color: 'red'}}>{formik.errors.email}</p>
                <label htmlFor='username'>Location</label>
                <br />
                <input id="location" name='location' onChange={formik.handleChange} value={formik.values.location} />
                <p style={{ color: 'red'}}>{formik.errors.location}</p>
                <label htmlFor='bio'>Bio</label>
                <br />
                <input id="bio" name='bio' onChange={formik.handleChange} value={formik.values.bio} />
                <p style={{ color: 'red'}}>{formik.errors.bio}</p>
                <button type="submit" disabled={formik.isSubmitting}>Submit</button>
            </form>
        </div>
    )
}

export default NewUserForm;