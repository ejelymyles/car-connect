#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Car, Review

if __name__ == '__main__':

    fake = Faker()

    with app.app_context():

        print("Starting seed...")
        print("Deleting all records...")
        User.query.delete()
        Car.query.delete()
        Review.query.delete()

        print("Populating users...")
        for i in range(5):

            full_bio = fake.paragraph(nb_sentences = 3)
            bio_preview = full_bio[:15] + '...'

            user = User(
                username = fake.user_name(),
                email = fake.email(),
                bio = bio_preview,
                location = fake.city()
            )
            db.session.add(user)
        db.session.commit()

        print("Populating cars...")

        for i in range(7):

            full_description = fake.paragraph(nb_sentences = 4)
            description_preview = full_description[:25] + '...'

            car = Car(
                make = fake.random_element(elements=("Toyota", "Honda", "Ford", "Chevrolet", "BMW", "Audi", "Mercedes-Benz", "Nissan", "Volkswagen", "Tesla", "Subaru", "Hyundai", "Kia", "Mazda", "Lexus", "Jeep", "Volvo", "Porsche", "Buick", "Cadillac", "Chrysler", "Dodge")),
                model = fake.random_element(elements=("Sedan", "SUV", "Truck", "Coupe", "Crossover")),
                year = randint(1950, 2024),
                mileage = randint(0, 200000),
                price = randint(1000, 100000),
                description = description_preview
            )
            db.session.add(car)
        db.session.commit()

        print("Populating reviews...")

        for i in range(3):

            full_comments = fake.paragraph(nb_sentences = 4)
            comments_preview = full_comments[:25] + '...'

            user_id = randint(1, 5)
            car_id = randint(1, 7)

            review = Review(
                rating = randint(1, 5),
                comments = comments_preview,
                user_id = user_id,
                car_id = car_id
            )
            db.session.add(review)
        db.session.commit()
        print("Complete.")



    



        
