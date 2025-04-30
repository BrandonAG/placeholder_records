CREATE TABLE Artists (
    artist_id int AUTO_INCREMENT UNIQUE,
    artist_name varchar(255) NOT NULL,
    PRIMARY KEY (artist_id)
);

CREATE TABLE Genres (
    genre_id int AUTO_INCREMENT UNIQUE,
    genre_name varchar(255) NOT NULL,
    PRIMARY KEY(genre_id)
);

CREATE TABLE Customers (
    customer_id int AUTO_INCREMENT UNIQUE,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    register_date date NOT NULL,
    PRIMARY KEY(customer_id)
);

CREATE TABLE Album_Details (
    album_details_id int AUTO_INCREMENT UNIQUE,
    album_name varchar(255) NOT NULL,
    PRIMARY KEY(album_details_id)
);

CREATE TABLE Artist_Album_Details (
    artist_id int NOT NULL,
    album_details_id int NOT NULL,
    FOREIGN KEY(artist_id) REFERENCES Artists(artist_id),
    FOREIGN KEY(album_details_id) REFERENCES Album_Details(album_details_id),
    PRIMARY KEY(artist_id, album_details_id)
);

CREATE TABLE Genre_Album_Details (
    genre_id int NOT NULL,
    album_details_id int NOT NULL,
    FOREIGN KEY(genre_id) REFERENCES Genres(genre_id),
    FOREIGN KEY(album_details_id) REFERENCES Album_Details(album_details_id),
    PRIMARY KEY(genre_id, album_details_id)
);

CREATE TABLE Media_Types (
    media_type_id varchar(255) UNIQUE NOT NULL,
    PRIMARY KEY (media_type_id)
);

CREATE TABLE Conditions (
    condition_id varchar(255) UNIQUE NOT NULL,
    PRIMARY KEY (condition_id)
);

CREATE TABLE Inventory (
    inventory_id int AUTO_INCREMENT UNIQUE,
    album_details_id int NOT NULL,
    media_type_id varchar(255) NOT NULL,
    condition_id varchar(255) NOT NULL,
    cost dec NOT NULL,
    quantity int NOT NULL,
    FOREIGN KEY(album_details_id) REFERENCES Album_Details(album_details_id),
    FOREIGN KEY(media_type_id) REFERENCES Media_Types(media_type_id),
    FOREIGN KEY(condition_id) REFERENCES Conditions(condition_id),
    PRIMARY KEY(inventory_id)
);

CREATE TABLE Orders (
    order_id int AUTO_INCREMENT NOT NULL,
    customer_id int NOT NULL,
    total_cost dec NOT NULL,
    date date NOT NULL,
    FOREIGN KEY(customer_id) REFERENCES Customers(customer_id),
    PRIMARY KEY(order_id)
);

CREATE TABLE Order_Items (
    order_id int NOT NULL,
    inventory_id int NOT NULL,
    cost dec NOT NULL,
    quantity int NOT NULL,
    FOREIGN KEY(order_id) REFERENCES Orders(order_id),
    FOREIGN KEY(inventory_id) REFERENCES Inventory(inventory_id),
    PRIMARY KEY(order_id, inventory_id)
);