function GenresForm() {
    return (
        <>
            <form>
                <label>Add Genre</label>
                <input type='text' placeholder='Enter genre name'></input>
                <button type="submit">Add</button>
            </form>
            <form>
                <label>Update Genre</label>
                <select id="genre" name="genre">
                    <option value="select">Select a Genre</option>
                    <option value="1">Genre 1</option>
                    <option value="2">Genre 2</option>
                    <option value="3">Genre 3</option>
                </select>
                <input type='text' placeholder='Enter new genre name'></input>
                <button type="submit">Update</button>
            </form>
        </>
    )
}

export default GenresForm;
