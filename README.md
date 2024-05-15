# Phase 4 Full-Stack Application Project - "Car Connect"

## Learning Goals

1. Build a full-stack Flask/React application.
2. Create my own data models & Flask API from scratch.
3. Include at least two one-to-many relationships.
4. Include one reciprocal many-to-many relationship
5. Full CRUD actions for at least one resource. 
6. Minimum of create & read actions for each resource.
7. Use Formik for forms and validations on all input
8. Have at least one data type and one string/number format validation
9. Have at least three different client-side routes using React Router

---

## Introduction

Car Connect is meant to represent a simple car marketplace where users can search for vehicles and list vehicles for rent or purchase. There's is no authentication or authorization features built into the app, so this version of the app lacks the the real-world safeguards that would prevent users from being able to change data that isn't theirs. The app is simply to perform CRUD actions on the backend data.

## Data Models

The app is built using three data models: Users, Cars, and Reviews

The User model is instantiated with the following attributes:
- id (primary key)
- username (cannot be null)
- email (must contain the @ symbol)
- location
- bio 

The Car model is instantiated with the following attributes:
- id (primary key)
- make (cannot be null)
- model (cannot be null)
- year (cannot be null, and must be between 1950 & 2024)
- mileage (cannot be null)
- description 
- price (cannot be null, and must be a numeric(10, 2) value greater than 0)

The Review model is instantiated with the following attributes:
- id (primary key)
- rating (cannot be null)
- comments
- user_id (foreign key)
- car_id (foreign ke)

## Relationships

One-to-Many relationships:
- A user can write many reviews, but a review can only belong to one user
- A car can have many reviews, but a review can only belong to one car

Many-to-Many relationship:
-  A user can have many cars, and a car could have had many users throughout it's lifetime
- The Review model serves as the link between Users & Cars that stores their many-to-many relationship.

## Flask Resources & CRUD Actions

The Flask API has the following resources:

1. Cars (Create, Read) at '/cars'
2. CarsByID (Read, Update, Delete) at '/cars/<int:id>'
3. Users (Create, Read) at '/users'
4. UsersByID (Read, Update, Delete) at '/users/<int:id>'
5. Reviews (Create, Read) at '/cars/<int:car_id>/reviews'
6. ReviewsByID (Read, Update, Delete) at '/cars/<int:car_id>/reviews/<int:review_id>'

## Seed Data


## Client-Side Routes

There are 4 client-side routes:

1. Home (http://localhost:3000/) - Users can view all of the available cars for rent/purchase
2. List Your Car (http://localhost:3000/newcar) - Users can list a new car on the app
3. Find Owners (http://localhost:3000/owners) - Users can search for other users
4. Add New Owner (http://localhost:3000/newuser) - New users can be added/created

## Conclusion

---

## Resources