'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

interface Waste {
  _id?: string;
  type: string;
  weight: number;
  location: string;
}

export default function WasteForm({
  onSuccess,
  editingWaste,
  cancelEdit,
}: {
  onSuccess: () => void;
  editingWaste?: Waste | null;
  cancelEdit?: () => void;
}) {
  const [form, setForm] = useState<Waste>({ type: '', weight: 0, location: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingWaste) {
      setForm(editingWaste);
    }
  }, [editingWaste]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Frontend validation
  if (!form.type.trim() || form.weight <= 0 || !form.location.trim()) {
    toast.error('Please fill out all fields correctly.');
    return;
  }

  try {
    if (form._id) {
      await api.put(`/waste/${form._id}`, form);
      toast.success('Waste updated successfully!');
    } else {
      await api.post('/waste', form);
      toast.success('Waste added successfully!');
    }
    setForm({ type: '', weight: 0, location: '' });
    onSuccess();
  } catch (err: any) {
    const message = err.response?.data?.message || 'Submission failed';
    toast.error(message);
  }
};


  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded mb-4">
      <h3 className="font-semibold text-lg">
        {form._id ? 'Edit Waste Entry' : 'Add Waste Entry'}
      </h3>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        name="type"
        placeholder="Type"
        value={form.type}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        name="weight"
        placeholder="Weight (kg)"
        value={form.weight}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <div className="flex gap-2">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          {form._id ? 'Update' : 'Add'}
        </button>
        {form._id && cancelEdit && (
          <button type="button" onClick={cancelEdit} className="bg-gray-400 text-white px-4 py-2 rounded">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
