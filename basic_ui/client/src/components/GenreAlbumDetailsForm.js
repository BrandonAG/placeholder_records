function GenreAlbumDetailsForm() {
    return (
        <>
        <form>
            <label>Add Genre Album Details</label>
            <select id="genre" name="genre">
                <option value="select">Select a Genre</option>
                <option value="1">Genre 1</option>
                <option value="2">Genre 2</option>
                <option value="3">Genre 3</option>
            </select>
            <select id="album-details" name="album-details">
                <option value="select">Select an Album</option>
                <option value="1">Album 1</option>
                <option value="2">Album 2</option>
                <option value="3">Album 3</option>
            </select>
            <button type="submit">Add</button>
        </form>
        <form>
            <label>Update Genre Album Details</label>
            <select id="genre" name="genre">
                <option value="select">Select a Genre</option>
                <option value="1">Genre 1</option>
                <option value="2">Genre 2</option>
                <option value="3">Genre 3</option>
            </select>
            <select id="album-details" name="album-details">
                <option value="select">Select an Album</option>
                <option value="1">Album 1</option>
                <option value="2">Album 2</option>
                <option value="3">Album 3</option>
            </select>
            <select id="genre" name="genre">
                <option value="select">Replace Genre With</option>
                <option value="1">Genre 1</option>
                <option value="2">Genre 2</option>
                <option value="3">Genre 3</option>
            </select>
            <select id="album-details" name="album-details">
                <option value="select">Replace Album With</option>
                <option value="1">Album 1</option>
                <option value="2">Album 2</option>
                <option value="3">Album 3</option>
            </select>
            <button type="submit">Update</button>
        </form>
        </>
    )
}

export default GenreAlbumDetailsForm;
