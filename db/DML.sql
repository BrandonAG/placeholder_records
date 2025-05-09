-- Get all entries from Artists
SELECT * FROM Artists;

-- Add Artists
INSERT INTO Artists (artist_name)
VALUES
    (:artist_name);

-- Update Artists by id
UPDATE Artists 
SET artist_name = :new_artist_name
WHERE artist.artist_id = :artist_id;

-- Delete Artists by id
DELETE FROM Artists WHERE artist.artist_id = :artist_id;


-- Get all entries from Album_Details
SELECT * FROM Album_Details;


-- Add Album_Details
INSERT INTO Album_Details (album_name)
VALUES
    (:album_name);

-- Update Album_Details by id
UPDATE Album_Details 
SET album_name = :album_name
WHERE Album_Details.album_id = :album_id;

-- Delete Album_Details by id
DELETE FROM Album_Details
WHERE Album_Details.album_id = :album_id;


-- Get all entries from Genres
SELECT * FROM Genres;

-- Add Genres
INSERT INTO Genres (genre_name)
VALUES
    (:genre_name);

-- Update Genres by id
UPDATE Genres 
SET genre_name = :genre_name
WHERE Genres.genre_id = :genre_id;

-- Delete Genres by id
DELETE FROM Genres
WHERE Genres.id = :genre_id;



-- Get all entries from Genre_Album_Details
SELECT * FROM Genre_Album_Details;

-- Add Genre_Album_Details
INSERT INTO Genre_Album_Details (genre_id, album_details_id)
VALUES
    (:genre_id, :album_details_id);

-- Update Genre_Album_Details by id
UPDATE Genre_Album_Details 
SET genre_id = :new_genre_id,
    album_details_id = :new_album_details_id
WHERE Genre_Album_Details.genre_id = :old_genre_id AND Genre_Album_Details.album_details_id = :album_details_id

-- Delete Genre_Album_Details by id
DELETE FROM Genre_Album_Details
WHERE Genre_Album_Details.genre_id = :genre_id AND Genre_Album_Details.album_details_id = :album_details_id;



-- Add Inventory update Inventory by id, delete Inventory by id

-- Get all entries from Inventory
SELECT * FROM Inventory;

-- Add Inventory 
INSERT INTO Inventory (inventory_id, album_details_id, media_type_id, condition_id, cost, quantity)
VALUES
    (:inventory_id, :album_details_id, :media_type_id, :condition_id, :cost, :quantity);

-- Update Inventory by id
UPDATE Inventory 
SET inventory_id = :new_inventory_id,
    album_details_id = :new_album_details_id,
    media_type_id = :new_media_type_id,
    condition_id = :new_condition_id,
    cost = :new_cost,
    quantity = :new_quantity
WHERE 
    Inventory.inventory_id = :old_inventory_id AND 
    Inventory.album_details_id = :old_album_details_id AND 
    Inventory.media_type_id = :old_media_type_id AND
    Inventory.condition_id = :old_condition_id;

-- Delete Inventory by id
DELETE FROM Inventory
WHERE 
    Inventory.inventory_id = :inventory_id AND 
    Inventory.album_details_id = :album_details_id AND 
    Inventory.media_type_id = :media_type_id AND
    Inventory.condition_id = :condition_id;