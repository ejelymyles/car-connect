import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewCard from './ReviewCard';

function ReviewList (){

    const [reviews, setReviews] = useState([])
    const { id } = useParams();

    useEffect(() => {
        fetch(`/cars/${id}/reviews`)
          .then((r) => r.json())
          .then((data) => {
            setReviews(data);
          })
          .catch((error) => {
            console.error('Error fetching reviews:', error);
          });
      }, [id]);
    
    return(
        <div>
            <h1 className="full-list-header">Reviews </h1>
            <ul className="reviews card-container">{reviews.map((review) => <ReviewCard key={review.id} review={review}/>)}</ul>
        </div>
    );
}

export default ReviewList;