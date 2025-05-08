function InventoryForm() {
    return (
        <>
            <form>
                <label>Add Inventory</label>
                <input type='number' min="0" placeholder='Enter album details id'></input>
                <input type='text' placeholder='Enter media type'></input>
                <input type='text' placeholder='Enter condition'></input>
                <input type='number' min='0' step='any' placeholder='Enter cost'></input>
                <input type='number' min='0' placeholder='Enter quantity'></input>
                <button type="submit">Add</button>

            </form>
            <form>
                <label>Update Inventory</label>
                <input type="number" min="0" placeholder="Enter Inventory id to update"></input>
                <input type='number' min="0" placeholder='Enter new album details id'></input>
                <input type='text' placeholder='Enter new media type'></input>
                <input type='text' placeholder='Enter new condition'></input>
                <input type='number' min='0' step='any' placeholder='Enter new cost'></input>
                <input type='number' min='0' placeholder='Enter new quantity'></input>
                <button type="submit">Update</button>
            </form>
        </>
    )
}

export default InventoryForm;
