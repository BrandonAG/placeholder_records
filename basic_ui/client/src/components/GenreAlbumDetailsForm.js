function GenreAlbumDetailsForm() {
    return (
        <>
        <form>
            <label>Add Genre Album Details</label>
            <input type='number' min="0" placeholder='Enter genre id'></input>
            <input type='number' min="0" placeholder='Enter album details id'></input>
            <button type="submit">Add</button>
        </form>
                <form>
            <label>Update Genre Album Details</label>
            <input type='number' min="0" placeholder='Enter genre id to update'></input>
            <input type='number' min="0" placeholder='Enter album details id to update'></input>
            <input type='number' min="0" placeholder='Enter new genre id'></input>
            <input type='number' min="0" placeholder='Enter new album details'></input>
            <button type="submit">Update</button>
        </form>
        </>
    )
}

export default GenreAlbumDetailsForm;
