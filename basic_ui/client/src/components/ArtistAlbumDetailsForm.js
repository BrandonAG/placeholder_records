function ArtistAlbumDetailsForm() {
    return (
        <>
        <form>
            <label>Add Artist Album Details</label>
            <input type='number' min="0" placeholder='Enter artist id'></input>
            <input type='number' min="0" placeholder='Enter album details id'></input>
            <button type="submit">Add</button>
        </form>
                <form>
            <label>Update Artist Album Details</label>
            <input type='number' min="0" placeholder='Enter artist id to update'></input>
            <input type='number' min="0" placeholder='Enter album details id to update'></input>
            <input type='number' min="0" placeholder='Enter new artist id'></input>
            <input type='number' min="0" placeholder='Enter new album details'></input>
            <button type="submit">Update</button>
        </form>
        </>
    )
}

export default ArtistAlbumDetailsForm;
