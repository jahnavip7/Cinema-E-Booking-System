CREATE TABLE Movies(
    id INT PRIMARY KEY AUTO_INCREMENT,
    duration INT,
    genre ENUM('ACTION', 'ANIMATION', 'COMEDY', 'DRAMA'),         -- Fill in rest of ENUM
    language ENUM('CHINESE', 'ENGLISH', 'HINDI', 'KOREAN'),       -- Fill in rest of ENUM
    movie_name VARCHAR(255) NOT NULL,                             -- 255 -> 179
    rating VARCHAR(5),                                            -- VARCHAR or DECIMAL?
    release_date DATE, 
    cast VARCHAR(255),
    description VARCHAR(255),
    director VARCHAR(255),                                        -- 255 -> 20          
    image_url VARCHAR(255),
    trailer_url VARCHAR(255),
    category ENUM('COMING_SOON','NOW_PLAYING')
);
    -- movie_producer VARCHAR(20),                                -- Need to add producer as well
    
CREATE TABLE ShowTimes(
    show_id INT PRIMARY KEY AUTO_INCREMENT,
    show_room INT NOT NULL,
    show_date DATE NOT NULL,
    show_time TIME NOT NULL,
    movie_id INT NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES Movies(id)
);

CREATE TABLE Seats(
    seat_id INT PRIMARY KEY AUTO_INCREMENT,
    seat_row INT NOT NULL,
    seat_number INT NOT NULL,
    show_id INT NOT NULL,
    -- show_id INT NOT NULL,
    reserved ENUM('RESERVED', 'AVAILABLE') NOT NULL,
    FOREIGN KEY (show_id) REFERENCES ShowTimes(show_id)
    -- FOREIGN KEY (show_id) REFERENCES ShowTime(show_id),
);

CREATE TABLE Users(
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(25) NOT NULL,
    last_name VARCHAR(25) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_phone_number VARCHAR(15) NOT NULL,
    confirmation_token VARCHAR(20),
    street_address VARCHAR(20),
    city VARCHAR(20),
    zipcode INTEGER,
    state VARCHAR(20),
    verification_status ENUM('VERIFIED', 'UNVERIFIED') NOT NULL,
    login_status ENUM('LOGGED_IN', 'LOGGED_OUT') NOT NULL,
    promotion_status ENUM('SUBSCRIBED', 'NOT_SUBSCRIBED') NOT NULL,
    suspend_status ENUM('SUSPENDED', 'ACTIVE') NOT NULL,
    roles ENUM('USER','ADMIN') NOT NULL
);

CREATE TABLE Promotions(
    promo_id INT PRIMARY KEY AUTO_INCREMENT,
    promo_name VARCHAR(25) NOT NULL UNIQUE,
    promo_description VARCHAR(255) NOT NULL, 
    promo_code VARCHAR(12) NOT NULL,                  -- actual code to type in
    promo_action VARCHAR(255) NOT NULL                             -- 50% off or BOGO, not sure what variable here
);

CREATE TABLE Payment_Methods(
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    card_type VARCHAR(25) NOT NULL,
    card_number VARCHAR(19) NOT NULL UNIQUE,
    expiration DATE NOT NULL,                          -- different variable type?
    street_address VARCHAR(20),
    city VARCHAR(20),
    zipcode INTEGER,
    state VARCHAR(20),
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
    -- ON DELETE CASCADE                               -- Necessary to implement?
);

CREATE TABLE Bookings(
    booking_id INT PRIMARY KEY AUTO_INCREMENT,
    booking_number INT NOT NULL UNIQUE,
    price DECIMAL NOT NULL,
    user_id INT NOT NULL,
    payment_id INT NOT NULL,
    show_id INT NOT NULL,
    promo_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (payment_id) REFERENCES Payment_Methods(payment_id),
    FOREIGN KEY (show_id) REFERENCES ShowTimes(show_id),
    FOREIGN KEY (promo_id) REFERENCES Promotions(promo_id)
);

CREATE TABLE Ticket_Prices(
	price_id INT PRIMARY KEY AUTO_INCREMENT,
    ticket_type ENUM('ADULT', 'SENIOR', 'CHILD') NOT NULL,
    price DECIMAL NOT NULL
);

CREATE TABLE Tickets(
    ticket_id INT PRIMARY KEY AUTO_INCREMENT,
    ticket_number INT NOT NULL UNIQUE,
    seat_id INT NOT NULL,
    booking_id INT NOT NULL,
    show_id INT NOT NULL,
    price_id INT NOT NULL,                                  -- 1,2,3 for adult, senior, child 
    FOREIGN KEY (seat_id) REFERENCES Seats(seat_id),
    FOREIGN KEY (booking_id) REFERENCES Bookings(booking_id),
    FOREIGN KEY (show_id) REFERENCES ShowTimes(show_id),
    FOREIGN KEY (price_id) REFERENCES Ticket_Prices(price_id)
);

-- User subdivided into Admin and Customer OR have User Table and Admin Tables?
/*CREATE TABLE Administrator(
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
)

CREATE TABLE Customer(
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
)*/


