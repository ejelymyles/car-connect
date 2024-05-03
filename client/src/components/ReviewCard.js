import React from "react";


function ReviewCard({ review, onDelete }){

    const{id, rating, comments, car_id, user_id } = review

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

    return(
        <div>
            <li className="card">
                <p> Rating: {rating} stars</p>
                <p>Comments: {comments}</p>
                <p>User ID: {user_id}</p>
            </li>
            <button>Edit Review</button>
            <button onClick={handleDelete}>Delete Review</button>
        </div>
    )
}

export default ReviewCard;