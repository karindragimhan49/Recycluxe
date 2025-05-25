'use client';

import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <nav className="bg-green-600 text-white p-4 flex justify-between">
      <h1 className="font-bold">Waste Management</h1>
      <button onClick={logout} className="bg-white text-green-600 px-4 py-1 rounded">
        Logout
      </button>
    </nav>
  );
}
