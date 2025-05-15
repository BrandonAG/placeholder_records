function InventoryForm() {
    return (
        <>
            <form>
                <label>Add Inventory</label>
                <select id="album-details" name="album-details">
                    <option value="select">Select an Album</option>
                    <option value="1">Album 1</option>
                    <option value="2">Album 2</option>
                    <option value="3">Album 3</option>
                </select>
                <select id="media-type" name="media-type">
                    <option value="select">Select Media Type</option>
                    <option value="1">vinyl</option>
                    <option value="2">cassette</option>
                </select>
                <select id="condition-type" name="condition-type">
                    <option value="select">Select Condition</option>
                    <option value="1">new</option>
                    <option value="2">used</option>
                </select>
                <input type='number' min='0' step='any' placeholder='Enter cost'></input>
                <input type='number' min='0' placeholder='Enter quantity'></input>
                <button type="submit">Add</button>

            </form>
            <form>
                <label>Update Inventory</label>
                <select id="inventory" name="inventory">
                    <option value="select">Select an Inventory Item</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <select id="album-details" name="album-details">
                    <option value="select">Replace Album With</option>
                    <option value="1">Album 1</option>
                    <option value="2">Album 2</option>
                    <option value="3">Album 3</option>
                </select>
                <select id="media-type" name="media-type">
                    <option value="select">Change Media Type</option>
                    <option value="1">vinyl</option>
                    <option value="2">cassette</option>
                </select>
                <select id="condition-type" name="condition-type">
                    <option value="select">Change Condition</option>
                    <option value="1">new</option>
                    <option value="2">used</option>
                </select>
                <input type='number' min='0' step='any' placeholder='Enter new cost'></input>
                <input type='number' min='0' placeholder='Enter new quantity'></input>
                <button type="submit">Update</button>
            </form>
        </>
    )
}

export default InventoryForm;
