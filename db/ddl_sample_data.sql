/*
    Group 76: Brandon Arnst-GoodRich, Zachary Fox
*/


DROP PROCEDURE IF EXISTS load_prdb;
DELIMITER //
CREATE PROCEDURE load_prdb()
BEGIN

SET FOREIGN_KEY_CHECKS = 0;

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

CREATE OR REPLACE TABLE Inventory (
    inventory_id int AUTO_INCREMENT UNIQUE,
    album_details_id int NOT NULL,
    media_type ENUM('vinyl', 'cassette') NOT NULL,
    condition_type ENUM('new', 'used') NOT NULL,
    cost dec NOT NULL,
    quantity int NOT NULL,
    UNIQUE(album_details_id, media_type, condition_type),
    FOREIGN KEY(album_details_id)
        REFERENCES Album_Details(album_details_id)
        ON DELETE CASCADE,
    PRIMARY KEY(inventory_id)
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

INSERT INTO Inventory (album_details_id, media_type, condition_type, cost, quantity)
VALUES
    ((SELECT album_details_id FROM Album_Details WHERE album_name = 'Mellon Collie and the Infinite Sadness'),
    'vinyl', 'new', 109.99, 19),
    
    ((SELECT album_details_id FROM Album_Details WHERE album_name = 'Revolver'),
    'vinyl', 'new', 29.99, 30),

    ((SELECT album_details_id FROM Album_Details WHERE album_name = 'Abbey Road'),
    'vinyl', 'new', 29.99, 50),

    ((SELECT album_details_id FROM Album_Details WHERE album_name = 'Undercurrent'),
    'vinyl', 'new', 20.99, 8);

    SET FOREIGN_KEY_CHECKS = 1;

    END // 


    DELIMITER ;