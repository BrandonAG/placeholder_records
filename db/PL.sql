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