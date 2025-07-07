import { useState } from "react";

const truckTypes = [
  { name: "7.5T", dimensions: { length: 6.2, width: 2.45, height: 2.3 } },
  { name: "12T", dimensions: { length: 7.3, width: 2.45, height: 2.6 } },
  { name: "Mega Trailer", dimensions: { length: 13.6, width: 2.48, height: 3.0 } },
  { name: "Box Truck", dimensions: { length: 5.5, width: 2.2, height: 2.0 } },
  { name: "Sprinter", dimensions: { length: 4.0, width: 1.8, height: 1.9 } }
];

const examplePalets = [
  { name: "EU Pallet", length: 1.2, width: 0.8, height: 1.0 },
  { name: "Block Pallet", length: 1.2, width: 1.0, height: 1.2 },
  { name: "Half Pallet", length: 0.8, width: 0.6, height: 1.0 },
  { name: "UK Pallet", length: 1.2, width: 1.0, height: 1.0 },
  { name: "Industrial Pallet", length: 1.2, width: 1.2, height: 1.5 }
];

export default function CargoCalculator() {
  const [selectedTruck, setSelectedTruck] = useState(truckTypes[0]);
  const [cargoList, setCargoList] = useState([
    { length: 1.2, width: 0.8, height: 1.0, quantity: 1 }
  ]);

  const handleCargoChange = (index, field, value) => {
    const updatedList = [...cargoList];
    updatedList[index][field] = parseFloat(value) || 0;
    setCargoList(updatedList);
  };

  const handleExampleSelect = (index, value) => {
    const selected = examplePalets.find((p) => p.name === value);
    const updatedList = [...cargoList];
    updatedList[index] = {
      ...selected,
      quantity: updatedList[index].quantity || 1
    };
    setCargoList(updatedList);
  };

  const addCargo = () => {
    setCargoList([...cargoList, { length: 0, width: 0, height: 0, quantity: 1 }]);
  };

  const calculateVolume = () => {
    const truckVolume =
      selectedTruck.dimensions.length *
      selectedTruck.dimensions.width *
      selectedTruck.dimensions.height;

    const cargoVolume = cargoList.reduce(
      (sum, c) => sum + c.length * c.width * c.height * c.quantity,
      0
    );

    alert(
      `Truck volume: ${truckVolume.toFixed(2)} m³\nTotal cargo volume: ${cargoVolume.toFixed(2)} m³\nFill rate: ${(
        (cargoVolume / truckVolume) * 100
      ).toFixed(2)}%`
    );
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <img src="/standby_logistics_bv_logo.jfif" alt="Standby Logistics NL" className="w-40 mb-4" />
      <h1 className="text-2xl font-bold mb-4">Cargo Checker</h1>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Select Truck Type</label>
        <select
          value={selectedTruck.name}
          onChange={(e) =>
            setSelectedTruck(truckTypes.find((t) => t.name === e.target.value))
          }
          className="border p-2 rounded w-full"
        >
          {truckTypes.map((truck) => (
            <option key={truck.name} value={truck.name}>
              {truck.name} ({truck.dimensions.length} x {truck.dimensions.width} x {truck.dimensions.height} m)
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-1">Cargo List</label>
        {cargoList.map((cargo, index) => (
          <div key={index} className="flex gap-2 mb-2 flex-wrap">
            <select
              onChange={(e) => handleExampleSelect(index, e.target.value)}
              className="border p-2 w-44"
              defaultValue=""
            >
              <option value="">Select preset pallet</option>
              {examplePalets.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Length (m)"
              value={cargo.length}
              onChange={(e) => handleCargoChange(index, "length", e.target.value)}
              className="border p-2 w-24"
            />
            <input
              type="number"
              placeholder="Width (m)"
              value={cargo.width}
              onChange={(e) => handleCargoChange(index, "width", e.target.value)}
              className="border p-2 w-24"
            />
            <input
              type="number"
              placeholder="Height (m)"
              value={cargo.height}
              onChange={(e) => handleCargoChange(index, "height", e.target.value)}
              className="border p-2 w-24"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={cargo.quantity}
              onChange={(e) => handleCargoChange(index, "quantity", e.target.value)}
              className="border p-2 w-24"
            />
          </div>
        ))}
        <button
          onClick={addCargo}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          + Add More
        </button>
      </div>

      <div>
        <button
          onClick={calculateVolume}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          Calculate
        </button>
      </div>
    </div>
  );
}
