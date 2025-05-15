function AlbumDetailsForm() {
    return (
        <>
            <form>
                <label>Add Album Details</label>
                <input type='text' placeholder='Enter album name'></input>
                <button type="submit">Add</button>
            </form>
            <form>
                <label for="album-details">Update Album Details</label>
                <select id="album-details" name="album-details">
                    <option value="select">Select an Album</option>
                    <option value="1">Album 1</option>
                    <option value="2">Album 2</option>
                    <option value="3">Album 3</option>
                </select>
                <input type='text' placeholder='Enter new album name'></input>
                <button type="submit">Update</button>
            </form>
        </>
    )
}

export default AlbumDetailsForm;
