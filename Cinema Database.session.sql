-- @block
CREATE TABLE Movie(
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
    category ENUM('COMING_SOON','NOW_PLAYING'),
    -- movie_producer VARCHAR(20),                                -- Need to add producer as well
)

CREATE TABLE Review(
    movie_id INT NOT NULL,
    user_id INT NOT NULL,
    review VARCHAR(255) NOT NULL,
    PRIMARY KEY (movie_id, user_id),
    FOREIGN KEY (movie_id) REFERENCES Movie(id),
    FOREIGN KEY (user_id) REFERENCES User(user_id),
)

CREATE TABLE ShowRoom(
    room_id INT PRIMARY KEY AUTO_INCREMENT,
    room_number INT NOT NULL,
    room_capacity INT NOT NULL,
)

CREATE TABLE Seat(
    seat_id INT PRIMARY KEY AUTO_INCREMENT,
    seat_row INT NOT NULL,
    seat_number INT NOT NULL,
    room_id INT NOT NULL,
    -- show_id INT NOT NULL,
    reserved ENUM('RESERVED', 'AVAILABLE') NOT NULL,
    FOREIGN KEY (room_id) REFERENCES ShowRoom(room_id),
    -- FOREIGN KEY (show_id) REFERENCES ShowTime(show_id),
)

CREATE TABLE ShowTime(
    show_id INT PRIMARY KEY AUTO_INCREMENT,
    show_date DATE NOT NULL,
    show_time TIME NOT NULL,
    room_id INT NOT NULL,
    movie_id INT NOT NULL,
    FOREIGN KEY (room_id) REFERENCES ShowRoom(room_id),
    FOREIGN KEY (movie_id) REFERENCES Movie(id),
)

CREATE TABLE Ticket(
    ticket_id INT PRIMARY KEY AUTO_INCREMENT,
    ticket_number INT NOT NULL UNIQUE,
    seat_id INT NOT NULL,
    booking_id INT NOT NULL,
    show_id INT NOT NULL,
    price_id INT NOT NULL,                                  -- 1,2,3 for adult, senior, child 
    FOREIGN KEY (seat_id) REFERENCES Seat(seat_id),
    FOREIGN KEY (booking_id) REFERENCES Booking(booking_id),
    FOREIGN KEY (show_id) REFERENCES ShowTime(show_id),
    FOREIGN KEY (price_id) REFERENCES Ticket_Price(price_id),
)

CREATE TABLE Ticket_Price(
    price_id INT PRIMARY KEY AUTO_INCREMENT,
    ticket_type ENUM('ADULT', 'SENIOR', 'CHILD') NOT NULL,
    price DECIMAL NOT NULL,
)

CREATE TABLE Booking(
    booking_id INT PRIMARY KEY AUTO_INCREMENT,
    booking_number INT NOT NULL UNIQUE,
    price DECIMAL NOT NULL,
    user_id INT NOT NULL,
    payment_id INT NOT NULL,
    show_id INT NOT NULL,
    promo_id INT,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
    FOREIGN KEY (payment_id) REFERENCES Payment_Method(payment_id)
    FOREIGN KEY (show_id) REFERENCES ShowTime(show_id)
    FOREIGN KEY (promo_id) REFERENCES Promotion(promo_id)
)

CREATE TABLE Promotion(
    promo_id INT PRIMARY KEY AUTO_INCREMENT,
    promo_name VARCAHR(25) NOT NULL UNIQUE,
    promo_description VARCHAR(255) NOT NULL, 
    promo_code VARCHAR(12) NOT NULL,                  -- actual code to type in
    promo_action NOT NULL,                            -- 50% off or BOGO, not sure what variable here
)

CREATE TABLE Fee(
    fee_id INT PRIMARY KEY AUTO_INCREMENT,
    online_fee DECIMAL NOT NULL,
    tax DECIMAL NOT NULL,                -- Percentage or set value?
)

-- Add verification code to User
CREATE TABLE User(
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(25) NOT NULL,
    last_name VARCHAR(25) NOT NULL,
    user_password NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_phone_number VARCHAR(15) NOT NULL,
    -- home_address VARCHAR(255),                  -- possibly add address table
    verification_status ENUM('VERIFIED', 'UNVERIFIED') NOT NULL,
    login_status ENUM('LOGGED_IN', 'LOGGED_OUT') NOT NULL,
    promotion_status ENUM('SUBSCRIBED', 'NOT_SUBSCRIBED') NOT NULL,
    suspend_status ENUM('SUSPENDED', 'ACTIVE') NOT NULL,
)

-- User subdivided into Admin and Customer OR have User Table and Admin Tables?
CREATE TABLE Administrator(
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
)

CREATE TABLE Customer(
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
)

CREATE TABLE Payment_Method(
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    card_type VARCHAR(25) NOT NULL,
    card_number VARCHAR(19) NOT NULL UNIQUE,
    expiration DATE NOT NULL,                          -- different variable type?
    billing_address VARCHAR(255) NOT NULL,             -- possibly add address table
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
    -- ON DELETE CASCADE                               -- Necessary to implement?
)

CREATE TABLE Home_Address(
    home_address_id INT PRIMARY KEY AUTO_INCREMENT,
    street VARCHAR(100) NOT NULL,
    city VARCHAR(20) NOT NULL,
    state VARCHAR(20) NOT NULL,
    zip_code VARCHAR(5) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
)

CREATE TABLE Billing_Address(
    billing_address_id INT PRIMARY KEY AUTO_INCREMENT,
    street VARCHAR(100) NOT NULL,
    city VARCHAR(20) NOT NULL,
    state VARCHAR(20) NOT NULL,
    zip_code VARCHAR(5) NOT NULL,
    payment_id INT NOT NULL,
    FOREIGN KEY (payment_id) REFERENCES Payment_Method(payment_id)
)

-- necessary?
CREATE TABLE Sales(
)