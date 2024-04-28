#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Car, Review


class Cars(Resource):
    def get(self):
        cars = [car.to_dict() for car in Car.query.all()]
        return cars, 200

    # def post(self):
    #     data = request.get_json()
    #     new_car = Car(
    #         make=data['make'],
    #         model=data['model'],
    #         year=data['year'],
    #         mileage=data['mileage'],
    #         price=data['price'],
    #         description=data['description'],
    #     )
    #     db.session.add(new_car)
    #     db.session.commit()

    #     return make_response(new_car.to_dict(), 201)


api.add_resource(Cars, '/cars')


class CarsByID(Resource):
    def get(self, id):
        car = Car.query.filter_by(id=id).first().to_dict()
        if car:
            return car, 200
        else:
            return {"Error":"Car not found"}, 404

    # def patch(self, id):
    #     car = Car.query.filter_by(id=id).first()
    #     request_data = request.get_json()
    #     for attr, value in request_data.items():
    #         setattr(car, attr, value)
        
    #     db.session.commit()

    #     return jsonify(car.to_dict()), 200

    # def delete(self, id):
    #     car = Car.query.filter_by(id=id).first()
    #     db.session.delete(car)
    #     db.session.commit()
    #     return make_response({}, 204)


api.add_resource(CarsByID, '/cars/<int:id>')


class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return jsonify(users)

    # def post(self):
    #     data = request.get_json()
    #     new_user = User(
    #         username=data['username'],
    #         email=data['email'],
    #         bio=['bio'],
    #         location=['location']
    #     )
    #     db.session.add(new_user)
    #     db.session.commit()
    #     return make_response(new_user.to_dict(), 201)

api.add_resource(Users, '/users')

class UsersByID(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first().to_dict()
        return make_response(jsonify(user), 200)


api.add_resource(UsersByID, '/users/<int:id>')

class Reviews(Resource):
    def get(self, car_id):
        reviews = Review.query.filter_by(car_id=car_id).all()
        reviews_list = [review.to_dict() for review in reviews]
        return reviews_list, 200

    # def post(self, id):
    #     data = request.get_json()
    #     if not data:
    #         return {'error': 'No input data provided'}, 400

    #     user_id = data.get('user_id')
    #     rating = data.get('user_id')
    #     comments = data.get('comments')
        
    #     if not all([user_id, rating, comments]):
    #         return{'error': 'missing required fields'}, 400
        
    #     new_review = Review(user_id=user_id, car_id=id, rating=rating, comments=comments)

    #     db.session.add(new_review)
    #     db.session.commit()

    #     return{'Review added succesfully!'}, 201

api.add_resource(Reviews, '/cars/<int:car_id>/reviews')

class ReviewsById(Resource):
    def get(self, car_id, review_id):
        review = Review.query.filter_by(car_id=car_id, review_id=review_id).first()
        if not review:
            return{'Review not found'}, 404
        return review.to_dict(), 200

    # def patch(self, car_id, review_id):
    #     data = request.get_json()
    #     review = Review.query.filter_by(car_id=car_id, review_id=review_id).first()
    #     if not review:
    #         return{'Review not found'}, 404
    #     if 'rating' in data:
    #         review.rating = data['rating']
    #     if 'comments' in data:
    #         review.comments = data['comments']
    #     db.session.commit()
    #     return review.to_dict(), 200

    # def delete(self, car_id, review_id):
    #     review = Review.query.filter_by(car_id=car_id, review_id=review_id).first()
    #     if not review:
    #         return {'Review not found'}, 404
        
    #     db.session.delete(review)
    #     db.session.commit()
    #     return{'message': 'Review deleted successfully'}, 200


api.add_resource(Reviews, '/cars/<int:car_id>/reviews/<int:review_id>')


@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

