"use client";
import { useEffect, useState } from 'react';

export default function RiderPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await fetch('/api/orders');
    const data = await res.json();
    setOrders(data.orders);
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id: string, newStatus: string) => {
   await fetch(`/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchOrders();
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-slate-800">Rider App</h1>
      <div className="grid gap-4">
        {orders.filter((o: any) => ['ASSIGNED', 'PICKED_UP', 'IN_TRANSIT'].includes(o.status)).map((order: any) => (
          <div key={order._id} className="bg-slate-50 p-4 shadow rounded-md border border-slate-200">
            <p className="font-bold text-lg">{order.address}</p>
            <p className="text-sm mb-4">Status: <span className="font-bold text-sky-600">{order.status}</span></p>
            
            {order.status === 'ASSIGNED' && (
              <button onClick={() => updateStatus(order._id, 'PICKED_UP')} className="w-full bg-indigo-600 text-white p-2 rounded mb-2">Confirm Pickup</button>
            )}
            {order.status === 'PICKED_UP' && (
              <button onClick={() => updateStatus(order._id, 'IN_TRANSIT')} className="w-full bg-blue-600 text-white p-2 rounded mb-2">Start Transit</button>
            )}
            {order.status === 'IN_TRANSIT' && (
              <button onClick={() => updateStatus(order._id, 'DELIVERED')} className="w-full bg-emerald-600 text-white p-2 rounded">Collect 95% & Complete</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
