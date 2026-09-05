"use client";

import { useEffect, useState } from "react";

interface Order {
  _id: string;
  customerName: string;
  address: string;
  items: string;
  status: string;
  depositPaid: boolean;
  assignedRider?: {
    _id: string;
    name: string;
    email: string;
  } | null;
}

export default function RiderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setError("");

      const res = await fetch("/api/orders");

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch orders");
      }

      setOrders(data.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (
    id: string,
    newStatus: string
  ) => {
    try {
      setUpdatingOrder(id);
      setError("");

      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Failed to update order status"
        );
      }

      await fetchOrders();
    } catch (error) {
      console.error("Error updating status:", error);
      setError("Failed to update order status.");
    } finally {
      setUpdatingOrder(null);
    }
  };

  const riderOrders = orders.filter((order) =>
    ["ASSIGNED", "PICKED_UP", "IN_TRANSIT"].includes(
      order.status
    )
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-100 p-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-bold text-slate-800">
            Rider App
          </h1>

          <p className="mt-4 text-slate-600">
            Loading deliveries...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-3xl">

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">
            Rider App
          </h1>

          <p className="mt-2 text-slate-600">
            View your assigned deliveries and update their
            progress.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {riderOrders.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm">
            <p className="font-semibold text-slate-700">
              No active deliveries.
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Assigned deliveries will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {riderOrders.map((order) => (
              <div
                key={order._id}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h2 className="text-xl font-bold text-slate-800">
                    {order.customerName}
                  </h2>

                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    {order.status}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-slate-600">
                  <p>
                    <span className="font-semibold text-slate-800">
                      Address:
                    </span>{" "}
                    {order.address}
                  </p>

                  <p>
                    <span className="font-semibold text-slate-800">
                      Items:
                    </span>{" "}
                    {order.items}
                  </p>

                  <p>
                    <span className="font-semibold text-slate-800">
                      Deposit:
                    </span>{" "}
                    {order.depositPaid
                      ? "Paid"
                      : "Not Paid"}
                  </p>
                </div>

                <div className="mt-6">
                  {order.status === "ASSIGNED" && (
                    <button
                      type="button"
                      disabled={updatingOrder === order._id}
                      onClick={() =>
                        updateStatus(
                          order._id,
                          "PICKED_UP"
                        )
                      }
                      className="w-full rounded-lg bg-indigo-600 p-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {updatingOrder === order._id
                        ? "Updating..."
                        : "Confirm Pickup"}
                    </button>
                  )}

                  {order.status === "PICKED_UP" && (
                    <button
                      type="button"
                      disabled={updatingOrder === order._id}
                      onClick={() =>
                        updateStatus(
                          order._id,
                          "IN_TRANSIT"
                        )
                      }
                      className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {updatingOrder === order._id
                        ? "Updating..."
                        : "Start Transit"}
                    </button>
                  )}

                  {order.status === "IN_TRANSIT" && (
                    <button
                      type="button"
                      disabled={updatingOrder === order._id}
                      onClick={() =>
                        updateStatus(
                          order._id,
                          "DELIVERED"
                        )
                      }
                      className="w-full rounded-lg bg-emerald-600 p-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {updatingOrder === order._id
                        ? "Completing..."
                        : "Confirm Delivery"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
