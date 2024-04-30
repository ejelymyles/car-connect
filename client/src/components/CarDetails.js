import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewList from "./ReviewList";

function CarDetails() {
  const [car, setCar] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/cars/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setCar(data);
      });
  }, [id]);

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
        <button>Write A Review</button>
        <button>Edit Car Listing</button>
        <button>Delete Car Listing</button>
      </div>
      <div>
        <ReviewList />
      </div>
    </div>
  );
}

export default CarDetails;
