/*
    Group 76: Brandon Arnst-GoodRich, Zachary Fox
*/

DROP PROCEDURE IF EXISTS delete_album_details;
DELIMITER //

CREATE PROCEDURE delete_album_details(
    IN id INT
)
BEGIN
    START TRANSACTION;
    DELETE FROM Album_Details WHERE album_details_id = id;
    COMMIT;
END; //

DELIMITER ;


DROP PROCEDURE IF EXISTS delete_artist_album_details;
DELIMITER //

CREATE PROCEDURE delete_artist_album_details(
    IN artist_id_in INT,
    IN album_id_in INT
)
BEGIN
    START TRANSACTION;
    DELETE FROM Artist_Album_Details WHERE artist_id = artist_id_in AND album_details_id = album_id_in;
    COMMIT;
END; //

DELIMITER ;


DROP PROCEDURE IF EXISTS delete_artists;
DELIMITER //

CREATE PROCEDURE delete_artists(
    IN id INT
)
BEGIN
    START TRANSACTION;
    DELETE FROM Artists WHERE artist_id = id;
    COMMIT;
END; //

DELIMITER ;


DROP PROCEDURE IF EXISTS delete_genre_album_details;
DELIMITER //

CREATE PROCEDURE delete_genre_album_details(
    IN genre_id_in INT,
    IN album_id_in INT
)
BEGIN
    START TRANSACTION;
    DELETE FROM Genre_Album_Details WHERE genre_id = genre_id_in AND album_details_id = album_id_in;
    COMMIT;
END; //

DELIMITER ;


DROP PROCEDURE IF EXISTS delete_genres;
DELIMITER //

CREATE PROCEDURE delete_genres(
    IN id INT
)
BEGIN
    START TRANSACTION;
    DELETE FROM Genres WHERE genre_id = id;
    COMMIT;
END; //

DELIMITER ;


DROP PROCEDURE IF EXISTS delete_inventory;
DELIMITER //

CREATE PROCEDURE delete_inventory(
    IN id INT
)
BEGIN
    START TRANSACTION;
    DELETE FROM Inventory WHERE inventory_id = id;
    COMMIT;
END; //

DELIMITER ;


DROP PROCEDURE IF EXISTS select_all_album_details;
DELIMITER //

CREATE PROCEDURE select_all_album_details()
BEGIN
    SELECT album_details_id, album_name FROM Album_Details;
END; //

DELIMITER ;


DROP PROCEDURE IF EXISTS select_all_artist_album_details;
DELIMITER //

CREATE PROCEDURE select_all_artist_album_details()
BEGIN
    SELECT Artist_Album_Details.artist_id, Artist_Album_Details.album_details_id ,artist_name, album_name FROM Artists
    INNER JOIN Artist_Album_Details ON Artists.artist_id = Artist_Album_Details.artist_id
    INNER JOIN Album_Details ON Artist_Album_Details.album_details_id = Album_Details.album_details_id
    ORDER BY artist_name, album_name;
END; //

DELIMITER ;


DROP PROCEDURE IF EXISTS select_all_artists;
DELIMITER //

CREATE PROCEDURE select_all_artists()
BEGIN
    SELECT artist_id, artist_name FROM Artists;
END; //

DELIMITER ;


DROP PROCEDURE IF EXISTS select_all_genre_album_details;
DELIMITER //

CREATE PROCEDURE select_all_genre_album_details()
BEGIN
    SELECT Genre_Album_Details.genre_id, Genre_Album_Details.album_details_id, genre_name, album_name FROM Genres
    INNER JOIN Genre_Album_Details ON Genres.genre_id = Genre_Album_Details.genre_id
    INNER JOIN Album_Details ON Genre_Album_Details.album_details_id = Album_Details.album_details_id
    ORDER BY genre_name, album_name;
END; //

DELIMITER ;


DROP PROCEDURE IF EXISTS select_all_genres;
DELIMITER //

CREATE PROCEDURE select_all_genres()
BEGIN
    SELECT genre_id, genre_name FROM Genres;
END; //

DELIMITER ;


DROP PROCEDURE IF EXISTS select_all_inventory;
DELIMITER //

CREATE PROCEDURE select_all_inventory()
BEGIN
    SELECT inventory_id, album_name, media_type, condition_type, cost, quantity FROM Inventory
    INNER JOIN Album_Details ON Inventory.album_details_id = Album_Details.album_details_id
    ORDER BY inventory_id;
END; //

DELIMITER ;


DROP PROCEDURE IF EXISTS insert_artist;
DELIMITER //

CREATE PROCEDURE insert_artist(IN artist_name_input VARCHAR(255))
BEGIN
    INSERT INTO Artists (artist_name) VALUES (artist_name_input);
END;
//

DELIMITER ;



DROP PROCEDURE IF EXISTS insert_genre;
DELIMITER //

CREATE PROCEDURE insert_genre(IN genre_name_input VARCHAR(255))
BEGIN
    INSERT INTO Genres(genre_name) VALUES (genre_name_input);
END;
//

DELIMITER ;


DROP PROCEDURE IF EXISTS insert_album_details;
DELIMITER //

CREATE PROCEDURE insert_album_details(IN album_name_input VARCHAR(255))
BEGIN
    INSERT INTO Album_Details(album_name) VALUES (album_name_input);
END;
//

DELIMITER ;


DROP PROCEDURE IF EXISTS insert_artist_album_details;
DELIMITER //

CREATE PROCEDURE insert_artist_album_details(IN artist_id_input INT, album_details_id_input INT)
BEGIN
    INSERT INTO Artist_Album_Details(artist_id, album_details_id) VALUES (artist_id_input, album_details_id_input );
END;
//

DELIMITER ;



DROP PROCEDURE IF EXISTS insert_genre_album_details;
DELIMITER //

CREATE PROCEDURE insert_genre_album_details(IN genre_id_input INT, album_details_id_input INT)
BEGIN
    INSERT INTO Genre_Album_Details(genre_id, album_details_id) VALUES (genre_id_input, album_details_id_input );
END;
//

DELIMITER ;


DROP PROCEDURE IF EXISTS update_artist_by_id;
DELIMITER //

CREATE PROCEDURE update_artist_by_id(
    IN id INT,
    IN name VARCHAR(255)
)
BEGIN
    START TRANSACTION;
    UPDATE Artists
        SET artist_name = name
        WHERE artist_id = id;
    COMMIT;
END; //

DELIMITER ;