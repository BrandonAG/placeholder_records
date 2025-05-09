/*
    Group 76: Brandon Arnst-GoodRich, Zachary Fox
*/

/* create or replace all tables */
CREATE OR REPLACE TABLE Artists (
    artist_id int AUTO_INCREMENT UNIQUE,
    artist_name varchar(255) NOT NULL,
    PRIMARY KEY (artist_id)
);

CREATE OR REPLACE TABLE Genres (
    genre_id int AUTO_INCREMENT UNIQUE,
    genre_name varchar(255) NOT NULL,
    PRIMARY KEY(genre_id)
);

CREATE OR REPLACE TABLE Customers (
    customer_id int AUTO_INCREMENT UNIQUE,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    register_date date NOT NULL,
    PRIMARY KEY(customer_id)
);

CREATE OR REPLACE TABLE Album_Details (
    album_details_id int AUTO_INCREMENT UNIQUE,
    album_name varchar(255) NOT NULL,
    PRIMARY KEY(album_details_id)
);

CREATE OR REPLACE TABLE Artist_Album_Details (
    artist_id int NOT NULL,
    album_details_id int NOT NULL,
    FOREIGN KEY(artist_id)
        REFERENCES Artists(artist_id)
        ON DELETE CASCADE,
    FOREIGN KEY(album_details_id)
        REFERENCES Album_Details(album_details_id)
        ON DELETE CASCADE,
    PRIMARY KEY(artist_id, album_details_id)
);

CREATE OR REPLACE TABLE Genre_Album_Details (
    genre_id int NOT NULL,
    album_details_id int NOT NULL,
    FOREIGN KEY(genre_id)
        REFERENCES Genres(genre_id)
        ON DELETE CASCADE,
    FOREIGN KEY(album_details_id)
        REFERENCES Album_Details(album_details_id)
        ON DELETE CASCADE,
    PRIMARY KEY(genre_id, album_details_id)
);

CREATE OR REPLACE TABLE Media_Types (
    media_type_id varchar(255) UNIQUE NOT NULL,
    PRIMARY KEY (media_type_id)
);

CREATE OR REPLACE TABLE Conditions (
    condition_id varchar(255) UNIQUE NOT NULL,
    PRIMARY KEY (condition_id)
);

CREATE OR REPLACE TABLE Inventory (
    inventory_id int AUTO_INCREMENT UNIQUE,
    album_details_id int NOT NULL,
    media_type_id varchar(255) NOT NULL,
    condition_id varchar(255) NOT NULL,
    cost dec NOT NULL,
    quantity int NOT NULL,
    UNIQUE(album_details_id, media_type_id, condition_id),
    FOREIGN KEY(album_details_id)
        REFERENCES Album_Details(album_details_id)
        ON DELETE CASCADE,
    FOREIGN KEY(media_type_id)
        REFERENCES Media_Types(media_type_id)
        ON DELETE CASCADE,
    FOREIGN KEY(condition_id)
        REFERENCES Conditions(condition_id)
        ON DELETE CASCADE,
    PRIMARY KEY(inventory_id)
);

CREATE OR REPLACE TABLE Orders (
    order_id int AUTO_INCREMENT NOT NULL,
    customer_id int NOT NULL,
    total_cost dec NOT NULL,
    date date NOT NULL,
    FOREIGN KEY(customer_id)
        REFERENCES Customers(customer_id)
        ON DELETE SET NULL,
    PRIMARY KEY(order_id)
);

CREATE OR REPLACE TABLE Order_Items (
    order_id int NOT NULL,
    inventory_id int NOT NULL,
    cost dec NOT NULL,
    quantity int NOT NULL,
    FOREIGN KEY(order_id)
        REFERENCES Orders(order_id)
        ON DELETE CASCADE,
    FOREIGN KEY(inventory_id)
        REFERENCES Inventory(inventory_id)
        ON DELETE CASCADE,
    PRIMARY KEY(order_id, inventory_id)
);

/* Sample Data */
INSERT INTO Artists (artist_name)
VALUES
    ('The Smashing Pumpkins'),
    ('Bill Evans'),
    ('Jim Hall'),
    ('The Beatles'),
    ('Tears for Fears');

INSERT INTO Genres (genre_name)
VALUES
    ('rock'),
    ('jazz'),
    ('pop'),
    ('r&b');

INSERT INTO Customers (first_name, last_name, register_date)
VALUES
    ('James', 'Watson', '2024-06-01'),
    ('Kaitlyn', 'Moon', '2025-01-15'),
    ('Michael', 'Marsh', '2024-03-26'),
    ('Jessica', 'Fitzpatrick', '2024-11-08');

INSERT INTO Album_Details (album_name)
VALUES
    ('Mellon Collie and the Infinite Sadness'),
    ('Revolver'), 
    ('Abbey Road'),
    ('Undercurrent');

INSERT INTO Artist_Album_Details (artist_id, album_details_id)
SELECT artist_id, album_details_id
FROM Artists a
JOIN Album_Details ad ON (
    (a.artist_name = 'The Smashing Pumpkins' AND ad.album_name = 'Mellon Collie and the Infinite Sadness') OR
    (a.artist_name = 'The Beatles' AND ad.album_name = 'Revolver') OR 
    (a.artist_name = 'The Beatles' AND ad.album_name = 'Abbey Road') OR
    (a.artist_name = 'Bill Evans' AND ad.album_name = 'Undercurrent') OR
    (a.artist_name = 'Jim Hall' AND ad.album_name = 'Undercurrent') 
);

INSERT INTO Genre_Album_Details (genre_id, album_details_id)
SELECT genre_id, album_details_id
FROM Genres g
JOIN Album_Details ad ON (
    (g.genre_name = 'rock' AND ad.album_name = 'Mellon Collie and the Infinite Sadness') OR
        (g.genre_name = 'jazz' AND ad.album_name = 'Undercurrent') OR
        (g.genre_name = 'rock' AND ad.album_name = 'Revolver') OR
        (g.genre_name = 'pop' AND ad.album_name = 'Revolver') OR
        (g.genre_name = 'rock' AND ad.album_name = 'Abbey Road') OR
        (g.genre_name = 'pop' AND ad.album_name = 'Abbey Road')
);

INSERT INTO Media_Types (media_type_id)
VALUES
    ('vinyl'),
    ('cassette');

INSERT INTO Conditions (condition_id)
VALUES
    ('new'),
    ('used');

INSERT INTO Inventory (album_details_id, media_type_id, condition_id, cost, quantity)
VALUES
    ((SELECT album_details_id FROM Album_Details WHERE album_name = 'Mellon Collie and the Infinite Sadness'),
    (SELECT media_type_id FROM Media_Types WHERE media_type_id = 'vinyl'),
    (SELECT condition_id FROM Conditions WHERE condition_id = 'new'), 109.99, 19),
    
    ((SELECT album_details_id FROM Album_Details WHERE album_name = 'Revolver'),
    (SELECT media_type_id FROM Media_Types WHERE media_type_id = 'vinyl'),
    (SELECT condition_id FROM Conditions WHERE condition_id = 'new'), 29.99, 30),

    ((SELECT album_details_id FROM Album_Details WHERE album_name = 'Abbey Road'),
    (SELECT media_type_id FROM Media_Types WHERE media_type_id = 'vinyl'),
    (SELECT condition_id FROM Conditions WHERE condition_id = 'new'), 29.99, 50),

    ((SELECT album_details_id FROM Album_Details WHERE album_name = 'Undercurrent'),
    (SELECT media_type_id FROM Media_Types WHERE media_type_id = 'vinyl'),
    (SELECT condition_id FROM Conditions WHERE condition_id = 'new'), 20.99, 8);


/* Order 1 for James Watson */
SET @customer_id = (SELECT customer_id FROM Customers WHERE first_name = 'James' AND last_name = 'Watson');

INSERT INTO Orders (customer_id, total_cost, date)
VALUES
    (@customer_id, 0, '2024-06-01');

SET @order_id = LAST_INSERT_ID();

INSERT INTO Order_Items (order_id, inventory_id, cost, quantity)
SELECT
    @order_id,
    i.inventory_id,
    i.cost,
    1
FROM Inventory i
JOIN Album_Details ad ON i.album_details_id = ad.album_details_id
WHERE ad.album_name = 'Mellon Collie and the Infinite Sadness'
  AND i.media_type_id = 'vinyl'
  AND i.condition_id = 'new';

UPDATE Orders
SET total_cost = (
    SELECT SUM(quantity * cost)
    FROM Order_Items
    WHERE order_id = @order_id
)
WHERE order_id = @order_id;

/* Order 2 for James Watson */
INSERT INTO Orders (customer_id, total_cost, date)
VALUES
    (@customer_id, 0, '2024-07-01');

SET @order_id = LAST_INSERT_ID();

INSERT INTO Order_Items (order_id, inventory_id, cost, quantity)
SELECT
    @order_id,
    i.inventory_id,
    i.cost,
    1
FROM Inventory i
JOIN Album_Details ad ON i.album_details_id = ad.album_details_id
WHERE ad.album_name = 'Undercurrent'
  AND i.media_type_id = 'vinyl'
  AND i.condition_id = 'new';

INSERT INTO Order_Items (order_id, inventory_id, cost, quantity)
SELECT
    @order_id,
    i.inventory_id,
    i.cost,
    1
FROM Inventory i
JOIN Album_Details ad ON i.album_details_id = ad.album_details_id
WHERE ad.album_name = 'Abbey Road'
  AND i.media_type_id = 'vinyl'
  AND i.condition_id = 'new';

UPDATE Orders
SET total_cost = (
    SELECT SUM(quantity * cost)
    FROM Order_Items
    WHERE order_id = @order_id
)
WHERE order_id = @order_id;

/* Order 3 */
SET @customer_id = (SELECT customer_id FROM Customers WHERE first_name = 'Kaitlyn' AND last_name = 'Moon');

INSERT INTO Orders (customer_id, total_cost, date)
VALUES
    (@customer_id, 0, '2025-01-16');

SET @order_id = LAST_INSERT_ID();

INSERT INTO Order_Items (order_id, inventory_id, cost, quantity)
SELECT
    @order_id,
    i.inventory_id,
    i.cost,
    2
FROM Inventory i
JOIN Album_Details ad ON i.album_details_id = ad.album_details_id
WHERE ad.album_name = 'Revolver'
  AND i.media_type_id = 'vinyl'
  AND i.condition_id = 'new';

UPDATE Orders
SET total_cost = (
    SELECT SUM(quantity * cost)
    FROM Order_Items
    WHERE order_id = @order_id
)
WHERE order_id = @order_id;