function AlbumDetailsForm() {
    return (
        <>
            <form>
                <label>Add Album Details</label>
                <input type='text' placeholder='Enter album name'></input>
                <button type="submit">Add</button>
            </form>
            <form>
                <label>Update Album Details</label>
                <input type="number" min="0" placeholder="Enter album id to update"></input>
                <input type='text' placeholder='Enter new album name'></input>
                <button type="submit">Update</button>
            </form>
        </>
    )
}

export default AlbumDetailsForm;
