import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const truckPresets = {
  "7.5T": { length: 6.0, width: 2.4, height: 2.3 },
  "12T": { length: 7.3, width: 2.45, height: 2.5 },
  "Mega Trailer": { length: 13.6, width: 2.48, height: 3.0 },
};

export default function CargoCalculator() {
  const [selectedTruck, setSelectedTruck] = useState("");
  const [truck, setTruck] = useState({ length: "", width: "", height: "" });
  const [cargo, setCargo] = useState({ length: "", width: "", height: "", quantity: "" });
  const [result, setResult] = useState(null);

  const parseNumber = (value) => parseFloat(value.replace(",", "."));

  const handleTruckSelect = (value) => {
    setSelectedTruck(value);
    const preset = truckPresets[value];
    setTruck({
      length: preset.length.toString(),
      width: preset.width.toString(),
      height: preset.height.toString(),
    });
  };

  const calculate = () => {
    const truckVolume = parseNumber(truck.length) * parseNumber(truck.width) * parseNumber(truck.height);
    const cargoVolume = parseNumber(cargo.length) * parseNumber(cargo.width) * parseNumber(cargo.height);
    const totalCargoVolume = cargoVolume * parseInt(cargo.quantity);
    const remainingVolume = truckVolume - totalCargoVolume;
    const maxPieces = Math.floor(truckVolume / cargoVolume);
    const fits = totalCargoVolume <= truckVolume;

    setResult({
      truckVolume,
      cargoVolume,
      totalCargoVolume,
      remainingVolume,
      maxPieces,
      fits,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <h2 className="text-xl font-bold">Select truck type</h2>
          <Select onValueChange={handleTruckSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Choose truck type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7.5T">7.5T</SelectItem>
              <SelectItem value="12T">12T</SelectItem>
              <SelectItem value="Mega Trailer">Mega Trailer</SelectItem>
            </SelectContent>
          </Select>

          <h2 className="text-xl font-bold">Truck dimensions (meters)</h2>
          <div className="grid grid-cols-3 gap-4">
            <Input placeholder="Length" value={truck.length} onChange={(e) => setTruck({ ...truck, length: e.target.value })} />
            <Input placeholder="Width" value={truck.width} onChange={(e) => setTruck({ ...truck, width: e.target.value })} />
            <Input placeholder="Height" value={truck.height} onChange={(e) => setTruck({ ...truck, height: e.target.value })} />
          </div>

          <h2 className="text-xl font-bold mt-6">Cargo dimensions (meters)</h2>
          <div className="grid grid-cols-4 gap-4">
            <Input placeholder="Length" value={cargo.length} onChange={(e) => setCargo({ ...cargo, length: e.target.value })} />
            <Input placeholder="Width" value={cargo.width} onChange={(e) => setCargo({ ...cargo, width: e.target.value })} />
            <Input placeholder="Height" value={cargo.height} onChange={(e) => setCargo({ ...cargo, height: e.target.value })} />
            <Input placeholder="Quantity" value={cargo.quantity} onChange={(e) => setCargo({ ...cargo, quantity: e.target.value })} />
          </div>

          <Button onClick={calculate} className="mt-4 w-full">Calculate</Button>

          {result && (
            <div className="mt-6 space-y-2">
              <p><strong>Truck volume:</strong> {result.truckVolume.toFixed(2)} m³</p>
              <p><strong>Volume per cargo:</strong> {result.cargoVolume.toFixed(2)} m³</p>
              <p><strong>Total cargo volume:</strong> {result.totalCargoVolume.toFixed(2)} m³</p>
              <p><strong>Remaining volume:</strong> {result.remainingVolume.toFixed(2)} m³</p>
              <p><strong>Max pieces that fit:</strong> {result.maxPieces}</p>
              <p className={result.fits ? "text-green-600" : "text-red-600"}><strong>{result.fits ? "The cargo fits in the truck ✅" : "The cargo does NOT fit ❌"}</strong></p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
