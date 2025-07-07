export function Select({ children, onValueChange }) {
  return <div className="w-full">{children}</div>;
}

export function SelectTrigger({ children }) {
  return <div className="border p-2 rounded bg-gray-100">{children}</div>;
}

export function SelectValue({ placeholder }) {
  return <span>{placeholder}</span>;
}

export function SelectContent({ children }) {
  return <div className="border mt-1 rounded bg-white">{children}</div>;
}

export function SelectItem({ value, children }) {
  return <div className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => alert(`Selected: ${value}`)}>{children}</div>;
}
