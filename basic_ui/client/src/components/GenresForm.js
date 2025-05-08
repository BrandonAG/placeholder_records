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
                <input type="number" min="0" placeholder="Enter genre id to update"></input>
                <input type='text' placeholder='Enter new genre name'></input>
                <button type="submit">Update</button>
            </form>
        </>
    )
}

export default GenresForm;
