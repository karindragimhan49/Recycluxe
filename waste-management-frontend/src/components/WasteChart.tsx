'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function WasteChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get('/waste');
      const grouped = res.data.reduce((acc: any, item: any) => {
        acc[item.type] = (acc[item.type] || 0) + item.weight;
        return acc;
      }, {});
      const chartData = Object.entries(grouped).map(([type, weight]) => ({
        name: type,
        value: weight,
      }));
      setData(chartData);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow my-6">
      <h2 className="text-xl font-semibold mb-4">Waste Type Breakdown</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          cx={200}
          cy={150}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </div>
  );
}
