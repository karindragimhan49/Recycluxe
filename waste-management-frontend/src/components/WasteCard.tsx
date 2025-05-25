'use client';

interface Waste {
  _id: string;
  type: string;
  weight: number;
  location: string;
}

export default function WasteCard({
  waste,
  onDelete,
  onEdit,
}: {
  waste: Waste;
  onDelete: (id: string) => void;
  onEdit: (waste: Waste) => void;
}) {
  return (
    <div className="border p-4 rounded mb-2 flex justify-between items-start">
      <div>
        <p><strong>Type:</strong> {waste.type}</p>
        <p><strong>Weight:</strong> {waste.weight} kg</p>
        <p><strong>Location:</strong> {waste.location}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(waste)}
          className="bg-yellow-400 text-white px-3 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(waste._id)}
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
