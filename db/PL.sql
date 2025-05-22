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