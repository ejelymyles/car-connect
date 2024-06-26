import React, { useState } from "react";
import ReviewForm from "./NewReviewForm";


function ReviewCard({ review, onDelete }){

    const{id, rating, comments, car_id, user_id, user } = review;
    const username = user ? user.username : null;

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
                throw new Error("Network response error");
            }
            onDelete(id);
        })
        .catch((error) => {
            console.error("There was a problem deleting the review:", error);
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
                throw new Error("Network response error");
            }
            toggleEditMode();
        })
        .catch((error) => {
            console.error("There was a problem updating the review", error);
        });
    }

    return(
        <div>
            <li className="card">
                {editMode ? (
                    <ReviewForm initialValues={{rating, comments }} onSubmit={(values) => handleEditReview(values)} onCancel={toggleEditMode} />
                ) : (
                    <div>
                        <p>Rating: {rating} stars</p>
                        <p>Comments: {comments}</p>
                        <p>User: {username}</p>
                    </div>
                )}
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
            </li>
        </div>
    );
}

export default ReviewCard;