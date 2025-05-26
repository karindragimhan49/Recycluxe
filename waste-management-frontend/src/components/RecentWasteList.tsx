'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function RecentWasteList() {
  const [wasteList, setWasteList] = useState([]);

  useEffect(() => {
    const fetchWaste = async () => {
      const res = await api.get('/waste');
      setWasteList(res.data.slice(-5).reverse());
    };
    fetchWaste();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow my-6">
      <h2 className="text-xl font-semibold mb-2">Recent Entries</h2>
      <ul className="space-y-2">
        {wasteList.map((waste: any) => (
          <li key={waste._id} className="border p-2 rounded">
            <strong>{waste.type}</strong> - {waste.weight}kg at {waste.location}
          </li>
        ))}
      </ul>
    </div>
  );
}
