"use client";

import { useEffect, useState } from "react";

interface Rider {
  _id: string;
  name: string;
  email: string;
}

interface Order {
  _id: string;
  customerName: string;
  address: string;
  items: string;
  status: string;
  depositPaid: boolean;
  assignedRider?: Rider | null;
  assignedAt?: string | null;
  createdAt?: string;
}

export default function DispatcherPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [riders, setRiders] = useState<Rider[]>([]);

  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingRiders, setLoadingRiders] = useState(true);

  const [selectedRiders, setSelectedRiders] = useState<
    Record<string, string>
  >({});

  const [updatingOrder, setUpdatingOrder] = useState<string | null>(
    null
  );

  const [error, setError] = useState("");

  /*
   * Fetch all orders.
   */
  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      setError("");

      const response = await fetch("/api/orders");

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Failed to fetch orders"
        );
      }

      setOrders(result.data || []);
    } catch (error) {
      console.error("Error loading orders:", error);
      setError("Unable to load orders.");
    } finally {
      setLoadingOrders(false);
    }
  };

  /*
   * Fetch all riders.
   */
  const fetchRiders = async () => {
    try {
      setLoadingRiders(true);

      const response = await fetch("/api/users/riders");

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Failed to fetch riders"
        );
      }

      setRiders(result.data || []);
    } catch (error) {
      console.error("Error loading riders:", error);
      setError("Unable to load riders.");
    } finally {
      setLoadingRiders(false);
    }
  };

  /*
   * Load orders and riders when page opens.
   */
  useEffect(() => {
    fetchOrders();
    fetchRiders();
  }, []);

  /*
   * Handle rider selection.
   */
  const handleRiderChange = (
    orderId: string,
    riderId: string
  ) => {
    setSelectedRiders((previous) => ({
      ...previous,
      [orderId]: riderId,
    }));
  };

  /*
   * Assign the selected rider to an order.
   */
  const assignRider = async (orderId: string) => {
    const riderId = selectedRiders[orderId];

    if (!riderId) {
      setError("Please select a rider first.");
      return;
    }

    try {
      setUpdatingOrder(orderId);
      setError("");

      const response = await fetch(
        `/api/orders/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            riderId,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Failed to assign rider"
        );
      }

      /*
       * Refresh the orders after assignment.
       */
      await fetchOrders();

      /*
       * Clear the selected rider for this order.
       */
      setSelectedRiders((previous) => {
        const updated = { ...previous };
        delete updated[orderId];
        return updated;
      });
    } catch (error) {
      console.error("Error assigning rider:", error);
      setError("Failed to assign rider.");
    } finally {
      setUpdatingOrder(null);
    }
  };

  /*
   * Update order status.
   */
  const updateStatus = async (
    orderId: string,
    status: string
  ) => {
    try {
      setUpdatingOrder(orderId);
      setError("");

      const response = await fetch(
        `/api/orders/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Failed to update status"
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

  /*
   * Orders that have not been assigned yet.
   */
  const pendingOrders = orders.filter(
    (order) => order.status === "CREATED"
  );

  /*
   * Orders that already have riders.
   */
  const assignedOrders = orders.filter(
    (order) =>
      order.status === "ASSIGNED" ||
      order.status === "PROCESSING" ||
      order.status === "SHIPPED"
  );

  return (
    <main className="min-h-screen bg-slate-100 p-6 md:p-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Dispatcher Dashboard
          </h1>

          <p className="mt-2 text-slate-600">
            Manage delivery orders, assign riders, and monitor
            delivery status.
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Dashboard statistics */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Orders
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-800">
              {orders.length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Waiting for Assignment
            </p>

            <p className="mt-2 text-3xl font-bold text-amber-600">
              {pendingOrders.length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Available Riders
            </p>

            <p className="mt-2 text-3xl font-bold text-green-600">
              {riders.length}
            </p>
          </div>

        </div>

        {/* Pending Orders */}
        <section className="mb-10">

          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-800">
              Orders Waiting for Assignment
            </h2>

            <p className="text-sm text-slate-500">
              Select a rider and assign the order.
            </p>
          </div>

          {loadingOrders || loadingRiders ? (
            <div className="rounded-xl bg-white p-8 text-center shadow-sm">
              <p className="text-slate-600">
                Loading dashboard...
              </p>
            </div>
          ) : pendingOrders.length === 0 ? (
            <div className="rounded-xl bg-white p-8 text-center shadow-sm">
              <p className="font-medium text-slate-700">
                No orders are waiting for assignment.
              </p>
            </div>
          ) : (
            <div className="space-y-4">

              {pendingOrders.map((order) => (
                <div
                  key={order._id}
                  className="rounded-xl bg-white p-6 shadow-sm"
                >

                  <div className="grid gap-6 lg:grid-cols-[1fr_auto]">

                    {/* Order information */}
                    <div>
                      <div className="mb-3 flex items-center gap-3">
                        <h3 className="text-lg font-bold text-slate-800">
                          {order.customerName}
                        </h3>

                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                          {order.status}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-semibold">
                            Address:
                          </span>{" "}
                          {order.address}
                        </p>

                        <p>
                          <span className="font-semibold">
                            Items:
                          </span>{" "}
                          {order.items}
                        </p>

                        <p>
                          <span className="font-semibold">
                            Deposit:
                          </span>{" "}
                          {order.depositPaid
                            ? "Paid"
                            : "Not Paid"}
                        </p>
                      </div>
                    </div>

                    {/* Assignment controls */}
                    <div className="flex min-w-[260px] flex-col gap-3">

                      <label
                        htmlFor={`rider-${order._id}`}
                        className="text-sm font-semibold text-slate-700"
                      >
                        Select Rider
                      </label>

                      <select
                        id={`rider-${order._id}`}
                        value={
                          selectedRiders[order._id] || ""
                        }
                        onChange={(event) =>
                          handleRiderChange(
                            order._id,
                            event.target.value
                          )
                        }
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-amber-500"
                      >
                        <option value="">
                          Choose a rider
                        </option>

                        {riders.map((rider) => (
                          <option
                            key={rider._id}
                            value={rider._id}
                          >
                            {rider.name}
                          </option>
                        ))}
                      </select>

                      <button
                        type="button"
                        onClick={() =>
                          assignRider(order._id)
                        }
                        disabled={
                          updatingOrder === order._id ||
                          !selectedRiders[order._id]
                        }
                        className="rounded-lg bg-amber-500 px-4 py-2 font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {updatingOrder === order._id
                          ? "Assigning..."
                          : "Assign Rider"}
                      </button>

                    </div>

                  </div>
                </div>
              ))}

            </div>
          )}

        </section>

        {/* Assigned Orders */}
        <section>

          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-800">
              Assigned Deliveries
            </h2>

            <p className="text-sm text-slate-500">
              Monitor orders that have already been assigned.
            </p>
          </div>

          {assignedOrders.length === 0 ? (
            <div className="rounded-xl bg-white p-8 text-center shadow-sm">
              <p className="text-slate-600">
                No assigned deliveries yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl bg-white shadow-sm">

              <table className="w-full min-w-[700px]">

                <thead className="border-b bg-slate-50">
                  <tr>
                    <th className="px-5 py-4 text-left text-sm font-semibold">
                      Customer
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold">
                      Address
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold">
                      Rider
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold">
                      Status
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {assignedOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b last:border-b-0"
                    >

                      <td className="px-5 py-4">
                        <p className="font-semibold">
                          {order.customerName}
                        </p>

                        <p className="text-xs text-slate-500">
                          {order.items}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm">
                        {order.address}
                      </td>

                      <td className="px-5 py-4 text-sm">
                        {order.assignedRider ? (
                          <div>
                            <p className="font-semibold">
                              {order.assignedRider.name}
                            </p>

                            <p className="text-xs text-slate-500">
                              {order.assignedRider.email}
                            </p>
                          </div>
                        ) : (
                          <span className="text-slate-400">
                            No rider
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                          {order.status}
                        </span>
                      </td>

                      <td className="px-5 py-4">

                        <select
                          value={order.status}
                          disabled={
                            updatingOrder === order._id
                          }
                          onChange={(event) =>
                            updateStatus(
                              order._id,
                              event.target.value
                            )
                          }
                          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                        >
                          <option value="ASSIGNED">
                            Assigned
                          </option>

                          <option value="PROCESSING">
                            Processing
                          </option>

                          <option value="SHIPPED">
                            Shipped
                          </option>

                          <option value="DELIVERED">
                            Delivered
                          </option>

                          <option value="CANCELLED">
                            Cancelled
                          </option>
                        </select>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </section>

      </div>
    </main>
  );
}
