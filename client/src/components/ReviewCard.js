import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import ReviewForm from "./NewReviewForm";


function ReviewCard({ review, onDelete }){

    const{id, rating, comments, car_id, user_id } = review;

    const[editMode, setEditMode] = useState(false);

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };


    const handleDelete = () => {
        fetch(`/cars/${car_id}/reviews/${id}`, {
            method: "DELETE",
        })
        .then((response) =>{
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            onDelete(id);
        })
        .catch((error) => {
            console.error("There was a problem with the fetch operation:", error);
        })
    }

    function handleEditReview(values){
        fetch(`/cars/${car_id}/reviews/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            toggleEditMode();
        })
        .catch((error) => {
            console.error("There was a problem with the fetch", error);
        });
    }

    return(
        <div>
            <li className="card">
                {editMode ? (
                    <ReviewForm initialValues={{rating, comments}} onSubmit={(values) => handleEditReview(values)} onCancel={toggleEditMode} />
                ) : (
                    <div>
                        <p>Rating: {rating} stars</p>
                        <p>Comments: {comments}</p>
                        <p>User ID: {user_id}</p>
                    </div>
                )}
            </li>
            {editMode ? (
                <div>
                    <button onClick={toggleEditMode}>Cancel</button>
                </div>
            ) : (
                <div>
                    <button onClick={toggleEditMode}>Edit Review</button>
                    <button onClick={handleDelete}>Delete Review</button>
                </div>    
            )}
        </div>
    );
}

export default ReviewCard;