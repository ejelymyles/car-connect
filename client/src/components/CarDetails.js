import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReviewList from "./ReviewList";
import ReviewForm from "./NewReviewForm";

function CarDetails() {
  const [car, setCar] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

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

  const handleDeleteCar = () => {
    fetch(`/cars/${id}`, {
      method: "DELETE",
    })
    .then((res) => {
      if(res.ok) {
        navigate("/");
      }
    })
    .catch((error) => {
      console.error("Error deleting car:", error);
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
        <button onClick={handleDeleteCar}>Delete Car Listing</button>
      </div>
      <div>
        {showReviewForm && (<ReviewForm onSubmit={handleSubmitReview} onCancel={toggleReviewForm} />)} 
        <ReviewList />
      </div>
    </div>
  );
}

export default CarDetails;
