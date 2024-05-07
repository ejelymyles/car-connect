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
            console.error('Error collecting reviews:', error);
          });
      }, [id]);

      const handleDelete = (reviewId) => {
        setReviews(reviews.filter((review) => review.id !== reviewId));
      };
    
    return(
        <div>
            <h2 className="full-list-header">Reviews </h2>
            <ul className="reviews card-container">{reviews.map((review) => <ReviewCard key={review.id} review={review} onDelete={handleDelete}/>)}</ul>
        </div>
    );
}

export default ReviewList;