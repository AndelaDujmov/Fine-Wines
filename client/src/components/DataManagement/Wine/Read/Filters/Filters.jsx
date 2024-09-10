const Filters = ({ wineTypeFilter, setWineTypeFilter, manufacturerFilter, setManufacturerFilter, manufacturers }) => {
    return (
        <div className="flex space-x-4 mb-8">
            <select
                value={wineTypeFilter}
                onChange={(e) => setWineTypeFilter(e.target.value)}
                className="border-2 border-gray-500 py-2 px-4 text-black"
            >
                <option value="">All Types</option>
                <option value="Red">Red</option>
                <option value="White">White</option>
                <option value="Rose">Rose</option>
            </select>

            <select
                value={manufacturerFilter}
                onChange={(e) => setManufacturerFilter(e.target.value)}
                className="border-2 border-gray-500 py-2 px-4 text-black"
            >
                <option value="">All Manufacturers</option>
                {manufacturers.map((manufacturer) => (
                    <option key={manufacturer._id} value={manufacturer._id}>
                        {manufacturer.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Filters;