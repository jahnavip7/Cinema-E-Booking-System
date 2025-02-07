# CineQuest - Cinema Ticket Booking System

CineQuest is a cinema ticket booking system built using **Spring Boot** for the backend and **Angular** for the frontend. This application allows users to book movie tickets conveniently, choose seat categories, and ensure a seamless experience with dynamic pricing and seat availability checks.

**##Team Members:**
This is a group project as part of our course Software Engineering.
Team Members are: 1.Jahnavi Priya Bommareddy
2.Sai Akshitha Reddy Kota
3.Gowthami Pollumuri
4.Akil Mir
5.Jacob Kruise

## Features

- **User-Friendly Booking Interface:** 
  - Select a movie, show date, and time.
  - Choose seat categories: Adult, Senior, and Child.
  
- **Dynamic Pricing:**
  - Ticket prices are adjusted based on the seat category selected.

- **Real-Time Seat Availability:**
  - Book only available seats.
  - Prevent double-booking of the same seat.

- **Error Handling:**
  - Displays an error message if a show is not scheduled or if there are any conflicts in booking.

## Tech Stack

### Backend
- **Framework:** Spring Boot
- **Database:** PostgreSQL
- **ORM:** Hibernate
- **Build Tool:** Maven

### Frontend
- **Framework:** Angular
- **Styling:** SCSS
- **Build Tool:** Angular CLI

## Project Structure

### Backend
```
CineQuest/backend/movie-ticket-booking-system/src/main/java/com/jts/movie/
├── config
├── controller
├── convertor
├── entities
├── enums
├── exceptions
├── repositories
├── request
├── response
├── services
└── MovieTicketBookingSystemApplication.java
```

### Frontend
```
frontend/
├── .vscode
├── public
├── src
│   ├── app
│   │   ├── add-movie
│   │   ├── admin-portal
│   │   ├── assets
│   │   ├── change-password
│   │   ├── checkout
│   │   ├── edit-movie
│   │   ├── edit-profile
│   │   ├── forgot-password
│   │   ├── header
│   │   ├── home
│   │   ├── login
│   │   ├── manage-movies
│   │   ├── manage-promotions
│   │   ├── movie-details
│   │   ├── order-details
│   │   ├── order-history
│   │   ├── ordersummary
│   │   ├── payment-information
│   │   ├── pipes
│   │   ├── profile-success-dialog
│   │   ├── registration
│   │   ├── reset-password
│   │   ├── schedule-movie
│   │   ├── search
│   │   ├── select-seat
│   │   ├── select-showtime
│   │   ├── services
│   │   └── shared/models
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.component.spec.ts
│   ├── app.component.ts
│   ├── app.config.server.ts
│   ├── app.config.ts
│   ├── app.module.ts
│   ├── app.routes.ts
│   ├── safeUrl.pipe.spec.ts
│   ├── safeUrl.pipe.ts
│   ├── index.html
│   ├── main.server.ts
│   ├── main.ts
│   └── styles.scss
├── .editorconfig
├── .gitignore
├── README.md
├── angular.json
├── package-lock.json
├── package.json
├── server.ts
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json
```

## Installation

### Prerequisites
- **Backend:** Java 17+, Maven, PostgreSQL
- **Frontend:** Node.js, Angular CLI

### Steps

#### Backend
1. Navigate to the backend directory:
   ```bash
   cd CineQuest/backend/movie-ticket-booking-system
   ```
2. Configure the database:
   - Create a PostgreSQL database named `cinequest`.
   - Update the `application.properties` file with your database credentials:
     ```properties
     spring.datasource.url=jdbc:postgresql://localhost:5432/cinequest
     spring.datasource.username=yourusername
     spring.datasource.password=yourpassword
     ```
3. Build the project:
   ```bash
   mvn clean install
   ```
4. Run the application:
   ```bash
   mvn spring-boot:run
   ```

#### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   ng serve
   ```
4. Access the application at `http://localhost:4200`.

## Usage
1. Navigate to the homepage.
2. Select a movie and preferred show time.
3. Choose seats and specify categories (Adult, Senior, Child).
4. Proceed to payment.
5. Confirm booking to finalize.

## Future Enhancements
- Integration with a payment gateway.
- Advanced seat selection using a graphical interface.
- User authentication for personalized bookings.
- Admin panel for managing movies and shows.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
- Thanks to the Spring Boot and Angular communities for excellent resources and documentation.
