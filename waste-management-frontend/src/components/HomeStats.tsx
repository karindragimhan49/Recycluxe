'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function HomeStats() {
  const [stats, setStats] = useState({ total: 0, weight: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get('/waste');
      const data = res.data;
      setStats({
        total: data.length,
        weight: data.reduce((sum: number, item: any) => sum + item.weight, 0),
      });
    };
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 my-6">
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold">Total Entries</h2>
        <p className="text-2xl">{stats.total}</p>
      </div>
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold">Total Weight (kg)</h2>
        <p className="text-2xl">{stats.weight}</p>
      </div>
    </div>
  );
}
