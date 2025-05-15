function ArtistAlbumDetailsForm() {
    return (
        <>
        <form>
            <label>Add Artist Album Details</label>
            <select id="artist" name="artist">
                <option value="select">Select an Artist</option>
                <option value="1">Artist 1</option>
                <option value="2">Artist 2</option>
                <option value="3">Artist 3</option>
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
            <label>Update Artist Album Details</label>
            <select id="artist" name="artist">
                <option value="select">Select an Artist</option>
                <option value="1">Artist 1</option>
                <option value="2">Artist 2</option>
                <option value="3">Artist 3</option>
            </select>
            <select id="album-details" name="album-details">
                <option value="select">Select an Album</option>
                <option value="1">Album 1</option>
                <option value="2">Album 2</option>
                <option value="3">Album 3</option>
            </select>
            <select id="artist" name="artist">
                <option value="select">Replace Artist With</option>
                <option value="1">Artist 1</option>
                <option value="2">Artist 2</option>
                <option value="3">Artist 3</option>
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

export default ArtistAlbumDetailsForm;
