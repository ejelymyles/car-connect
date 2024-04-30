import React from "react";


function ReviewCard({ review }){

    const{id, rating, comments, car_id, user_id } = review

    return(
        <div>
            <li className="card">
                <p> Rating: {rating} stars</p>
                <p>Comments: {comments}</p>
                <p>User ID: {user_id}</p>
            </li>
            <button>Edit Review</button>
            <button>Delete Review</button>

            
        </div>
    )
}

export default ReviewCard;