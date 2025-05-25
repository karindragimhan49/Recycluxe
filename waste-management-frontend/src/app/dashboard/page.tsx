'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import WasteCard from '@/components/WasteCard';
import WasteForm from '@/components/WasteForm';

interface Waste {
  _id: string;
  type: string;
  weight: number;
  location: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [wastes, setWastes] = useState<Waste[]>([]);
  const [error, setError] = useState('');
  const [editingWaste, setEditingWaste] = useState<Waste | null>(null);

  const fetchWaste = async () => {
    try {
      const res = await api.get('/waste');
      setWastes(res.data);
    } catch (err) {
      setError('Unauthorized. Redirecting to login...');
      setTimeout(() => router.push('/login'), 1500);
    }
  };

  const deleteWaste = async (id: string) => {
    await api.delete(`/waste/${id}`);
    fetchWaste();
  };

  const startEdit = (waste: Waste) => {
    setEditingWaste(waste);
  };

  const cancelEdit = () => {
    setEditingWaste(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      fetchWaste();
    }
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Waste Dashboard</h2>
      {error && <p className="text-red-500">{error}</p>}

      <WasteForm
        onSuccess={() => {
          fetchWaste();
          setEditingWaste(null);
        }}
        editingWaste={editingWaste}
        cancelEdit={cancelEdit}
      />

      {wastes.map((waste) => (
        <WasteCard
          key={waste._id}
          waste={waste}
          onDelete={deleteWaste}
          onEdit={startEdit}
        />
      ))}
    </div>
  );
}
