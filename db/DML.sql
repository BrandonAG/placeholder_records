-- Get all entries from Artists
SELECT artist_id, artist_name FROM Artists;

-- Add Artists
INSERT INTO Artists (artist_name)
VALUES
    (:artist_name);

-- Update Artists by id
UPDATE Artists 
SET artist_name = :new_artist_name_input
WHERE artist.artist_id = :artist_id_input;

-- Delete Artists by id
DELETE FROM Artists WHERE artist.artist_id = :artist_id_input;



-- Get all entries from Album_Details
SELECT album_details_id, album_name FROM Album_Details;

-- Add Album_Details
INSERT INTO Album_Details (album_name)
VALUES
    (:album_name_input);

-- Update Album_Details by id
UPDATE Album_Details 
SET album_name = :new_album_name_input
WHERE Album_Details.album_details_id = :album_details_id_input;

-- Delete Album_Details by id
DELETE FROM Album_Details
WHERE Album_Details.album_details_id = :album_details_id_input;



-- Get artist_name and album_name for Artist_Album_Details
SELECT artist_name, album_name FROM Artists
INNER JOIN Artist_Album_Details ON Artists.artist_id = Artist_Album_Details.artist_id
INNER JOIN Album_Details ON Artist_Album_Details.album_details_id = Album_Details.album_details_id
ORDER BY artist_name, album_name;

-- Add Artist_Album_Details
INSERT INTO Artist_Album_Details (artist_id, album_details_id)
VALUES
    (:artist_id_input, :album_details_id_input);

-- Update Artist_Album_Details by id
UPDATE Artist_Album_Details 
SET artist_id = :new_artist_id_input,
    album_details_id = :new_album_details_id_input
WHERE Artist_Album_Details.artist_id = :old_artist_id_input AND Artist_Album_Details.album_details_id_input = :old_album_details_id_input;

-- Delete Artist_Album_Details by id
DELETE FROM Artist_Album_Details
WHERE Artist_Album_Details.artist_id = :artist_id_input AND Artist_Album_Details.album_details_id = :album_details_id_input;



-- Get genre_name and album_name for Genre_Album_Details
SELECT genre_name, album_name FROM Genres
INNER JOIN Genre_Album_Details ON Genres.genre_id = Genre_Album_Details.genre_id
INNER JOIN Album_Details ON Genre_Album_Details.album_details_id = Album_Details.album_details_id
ORDER BY genre_name, album_name;

-- Add Genre_Album_Details
INSERT INTO Genre_Album_Details (genre_id, album_details_id)
VALUES
    (:genre_id_input, :album_details_id_input);

-- Update Genre_Album_Details by id
UPDATE Genre_Album_Details 
SET genre_id = :new_genre_id_input,
    album_details_id = :new_album_details_id_input
WHERE Genre_Album_Details.genre_id = :old_genre_id_input AND Genre_Album_Details.album_details_id = :album_details_id_input;

-- Delete Genre_Album_Details by id
DELETE FROM Genre_Album_Details
WHERE Genre_Album_Details.genre_id = :genre_id_input AND Genre_Album_Details.album_details_id = :album_details_id_input;



-- Get album_name and inventory attributes for Inventory
SELECT inventory_id, album_name, media_type, condition_type, cost, quantity FROM Inventory
INNER JOIN Album_Details ON Inventory.album_details_id = Album_Details.album_details_id
ORDER BY inventory_id;

-- Add Inventory 
INSERT INTO Inventory (album_details_id, media_type, condition_type, cost, quantity)
VALUES
    (:album_details_id_input, :media_type_input, :condition_type_input, :cost, :quantity_input);

-- Update Inventory by id
UPDATE Inventory 
SET
    album_details_id = :new_album_details_id_input,
    media_type = :new_media_type_input,
    condition_type = :new_condition_type_input,
    cost = :new_cost_input,
    quantity = :new_quantity_input
WHERE 
    Inventory.inventory_id = :inventory_id_input ;

-- Delete Inventory by id
DELETE FROM Inventory
WHERE 
    Inventory.inventory_id = :inventory_id_input;