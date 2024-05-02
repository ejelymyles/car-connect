import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewList from "./ReviewList";
import ReviewForm from "./NewReviewForm";

function CarDetails() {
  const [car, setCar] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/cars/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setCar(data);
      });
  }, [id]);


  const toggleReviewForm = () => {
    setShowReviewForm(!showReviewForm);
  };

  const handleSubmitReview = (values) => {
    fetch(`/cars/${id}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...values, car_id: id}),
    }).then(() => {
      setShowReviewForm(false);
    });
  };


  if (!car) {
    return <div>Loading...</div>;
  }

  const { year, make, model, mileage, price, description } = car;

  return (
    <div>
      <div>
        <h1>{year} {make} {model}</h1>
        <p>Mileage: {mileage}</p>
        <p>Price: ${price}</p>
        <p>Description: {description}</p>
        <button onClick={toggleReviewForm}>Write A Review</button>
        <button>Edit Car Listing</button>
        <button>Delete Car Listing</button>
      </div>
      <div>
        {showReviewForm && (<ReviewForm onSubmit={handleSubmitReview} onCancel={toggleReviewForm} />)} 
        <ReviewList />
      </div>
    </div>
  );
}

export default CarDetails;
