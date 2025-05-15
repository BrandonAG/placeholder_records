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
                <select id="artist" name="artist">
                    <option value="select">Select an Artist</option>
                    <option value="1">Artist 1</option>
                    <option value="2">Artist 2</option>
                    <option value="3">Artist 3</option>
                </select>
                <input type='text' placeholder='Enter updated artist name'></input>
                <button type="submit">Update</button>
            </form>
        </>
    )
}

export default ArtistsForm;
