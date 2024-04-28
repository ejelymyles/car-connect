from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy import Numeric
from sqlalchemy.orm import validates

from config import db

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_only = ('id', 'username', 'email', 'bio', 'location',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String)
    bio = db.Column(db.String)
    location  = db.Column(db.String)

    #association proxy to get cars for this user through reviews 
    cars = association_proxy('reviews', 'car', creator=lambda car_obj: Review(car=car_obj) )

    @validates('email')
    def validate_email(self, key, email):
        if '@' not in email:
            raise ValueError('Incorrect email format')
        return email 

    def __repr__(self):
        return f'<User username: {self.username}, email: {self.email}, location: {self.location}'


class Car(db.Model, SerializerMixin):
    __tablename__ = 'cars'

    __table_args__ = (
        db.CheckConstraint('year >= 1950 AND year <= 2024'),
        db.CheckConstraint('price >= 0'),
    )

    serialize_only = ('id', 'make', 'model', 'year', 'mileage', 'price', 'description',)
    
    id = db.Column(db.Integer, primary_key=True)
    make = db.Column(db.String, nullable=False)
    model = db.Column(db.String, nullable=False)
    year = db.Column(db.Integer, nullable=False)
    mileage = db.Column(db.Integer, nullable=False)
    price = db.Column(Numeric(10, 2), nullable=False)
    description = db.Column(db.String)

    # association proxy to get users of this car through reviews 
    users = association_proxy('reviews', 'user', creator=lambda user_obj: Review(user=user_obj))


    def __repr__(self):
        return f'<Car {self.year}, {self.make}, {self.model}>'


class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    __table_args__ = (db.CheckConstraint('rating >= 1 AND rating <=5'),)

    serialize_only = ('id', 'rating', 'comments', 'user.username', 'car.id',)

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comments = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    car_id = db.Column(db.Integer, db.ForeignKey('cars.id'))


    def __repr__(self):
        return f'<Review {self.id}, {self.rating}, {self. comments}, {self.user.username}, {self.car_id}>'
