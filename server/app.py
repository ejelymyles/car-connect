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
        return jsonify(cars)

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

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

