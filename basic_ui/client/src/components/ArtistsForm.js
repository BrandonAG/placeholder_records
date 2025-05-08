function ArtistsForm() {
    return (
        <>
            <form>
                <label>Add Artist</label>
                <input type='text' placeholder='Enter artist name'></input>
                <button type="submit">Add</button>
            </form>
            <form>
                <label>Update Artist</label>
                <input type="number" min="0" placeholder="Enter artist id to update"></input>
                <input type='text' placeholder='Enter updated artist name'></input>
                <button type="submit">Update</button>
            </form>
        </>
    )
}

export default ArtistsForm;
