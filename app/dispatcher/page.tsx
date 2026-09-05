"use client";

import { useEffect, useState } from "react";

interface Order {
  _id: string;
  customerName: string;
  address: string;
  items: string;
  status: string;
  depositPaid: boolean;
}

export default function DispatcherPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setError("");

      const res = await fetch("/api/orders");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch orders");
      }

      setOrders(data.data);
    } catch (error) {
      console.error(error);
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const assignRider = async (id: string) => {
    try {
      setUpdating(id);

      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "PROCESSING",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update order");
      }

      await fetchOrders();
    } catch (error) {
      console.error(error);
      setError("Failed to assign the order.");
    } finally {
      setUpdating(null);
    }
  };

  const createdOrders = orders.filter(
    (order) => order.status === "CREATED"
  );

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="mb-2 text-3xl font-bold text-slate-800">
        Dispatcher Dashboard
      </h1>

      <p className="mb-6 text-slate-600">
        Manage new delivery orders.
      </p>

      {error && (
        <div className="mb-4 rounded-md bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-slate-600">Loading orders...</p>
      ) : createdOrders.length === 0 ? (
        <div className="rounded-md bg-white p-6 shadow">
          <p className="text-slate-600">
            No new orders waiting for assignment.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {createdOrders.map((order) => (
            <div
              key={order._id}
              className="flex items-center justify-between rounded-md border-l-4 border-amber-500 bg-white p-5 shadow"
            >
              <div>
                <p className="font-bold text-slate-800">
                  {order.customerName}
                </p>

                <p className="text-sm text-gray-600">
                  {order.address}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Items: {order.items}
                </p>

                <span className="mt-2 inline-block rounded bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">
                  {order.status}
                </span>
              </div>

              <button
                onClick={() => assignRider(order._id)}
                disabled={updating === order._id}
                className="rounded bg-amber-500 px-4 py-2 font-bold text-white hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {updating === order._id
                  ? "Assigning..."
                  : "Assign Rider"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
