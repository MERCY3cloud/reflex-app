"use client";

import { useEffect, useState } from "react";

interface Rider {
  _id: string;
  name: string;
  email: string;
  role: string;
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedRiders, setSelectedRiders] = useState<
    Record<string, string>
  >({});

  const [updatingOrder, setUpdatingOrder] = useState<string | null>(
    null
  );

  /*
   * Fetch orders
   */
  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders");

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Failed to fetch orders"
        );
      }

      setOrders(result.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to load orders.");
    }
  };

  /*
   * Fetch riders
   */
  const fetchRiders = async () => {
    try {
      const response = await fetch("/api/users/riders");

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Failed to fetch riders"
        );
      }

      setRiders(result.data || []);
    } catch (error) {
      console.error("Error fetching riders:", error);
      setError("Failed to load riders.");
    }
  };

  /*
   * Load orders and riders when dashboard opens
   */
  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      setError("");

      await Promise.all([
        fetchOrders(),
        fetchRiders(),
      ]);

      setLoading(false);
    };

    loadDashboard();
  }, []);

  /*
   * Handle rider selection
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
   * Assign selected rider to order
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
            riderId: riderId,
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
       * Refresh orders so the newly assigned
       * order moves to the assigned section.
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
   * Update order status
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
            status: status,
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
      console.error(
        "Error updating order status:",
        error
      );

      setError("Failed to update order status.");
    } finally {
      setUpdatingOrder(null);
    }
  };

  /*
   * Orders that still need a rider
   */
  const pendingOrders = orders.filter(
    (order) => order.status === "CREATED"
  );

  /*
   * Orders that already have a rider
   */
  const assignedOrders = orders.filter(
    (order) =>
      order.status === "ASSIGNED" ||
      order.status === "PROCESSING" ||
      order.status === "SHIPPED"
  );

  /*
   * Orders that are completed
   */
  const deliveredOrders = orders.filter(
    (order) => order.status === "DELIVERED"
  );

  /*
   * Loading screen
   */
  if (loading) {
    return (
      <main className="min-h-screen bg-slate-100 p-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-slate-800">
            Dispatcher Dashboard
          </h1>

          <p className="mt-4 text-slate-600">
            Loading dashboard...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6 md:p-10">

      <div className="mx-auto max-w-7xl">

        {/* =========================================
            HEADER
        ========================================== */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Dispatcher Dashboard
          </h1>

          <p className="mt-2 text-slate-600">
            Manage orders, assign riders, and monitor
            delivery progress.
          </p>
        </div>


        {/* =========================================
            ERROR MESSAGE
        ========================================== */}

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}


        {/* =========================================
            DASHBOARD STATISTICS
        ========================================== */}

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Total Orders */}

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total Orders
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-800">
              {orders.length}
            </p>
          </div>


          {/* Pending Orders */}

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Awaiting Assignment
            </p>

            <p className="mt-2 text-3xl font-bold text-amber-600">
              {pendingOrders.length}
            </p>
          </div>


          {/* Riders */}

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Riders
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-600">
              {riders.length}
            </p>
          </div>


          {/* Delivered */}

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Delivered
            </p>

            <p className="mt-2 text-3xl font-bold text-green-600">
              {deliveredOrders.length}
            </p>
          </div>

        </div>


        {/* =========================================
            ORDERS WAITING FOR ASSIGNMENT
        ========================================== */}

        <section className="mb-10">

          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-800">
              Orders Waiting for Assignment
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Select a rider and assign the delivery.
            </p>
          </div>


          {pendingOrders.length === 0 ? (

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

                  <div className="grid gap-6 lg:grid-cols-[1fr_280px]">

                    {/* Order details */}

                    <div>

                      <div className="mb-4 flex flex-wrap items-center gap-3">

                        <h3 className="text-lg font-bold text-slate-800">
                          {order.customerName}
                        </h3>

                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
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

                    </div>


                    {/* Rider assignment */}

                    <div className="flex flex-col gap-3">

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
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-amber-500"
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
                          !selectedRiders[order._id] ||
                          updatingOrder === order._id
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


        {/* =========================================
            ASSIGNED DELIVERIES
        ========================================== */}

        <section>

          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-800">
              Assigned Deliveries
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Monitor assigned orders and update their status.
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

              <table className="w-full min-w-[850px]">

                <thead className="border-b bg-slate-50">

                  <tr>

                    <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                      Customer
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                      Address
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                      Rider
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                      Status
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                      Update
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {assignedOrders.map((order) => (

                    <tr
                      key={order._id}
                      className="border-b last:border-b-0"
                    >

                      {/* Customer */}

                      <td className="px-5 py-4">

                        <p className="font-semibold text-slate-800">
                          {order.customerName}
                        </p>

                        <p className="text-xs text-slate-500">
                          {order.items}
                        </p>

                      </td>


                      {/* Address */}

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {order.address}
                      </td>


                      {/* Rider */}

                      <td className="px-5 py-4">

                        {order.assignedRider ? (

                          <div>

                            <p className="font-semibold text-slate-800">
                              {order.assignedRider.name}
                            </p>

                            <p className="text-xs text-slate-500">
                              {order.assignedRider.email}
                            </p>

                          </div>

                        ) : (

                          <span className="text-sm text-red-500">
                            No rider assigned
                          </span>

                        )}

                      </td>


                      {/* Status */}

                      <td className="px-5 py-4">

                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                          {order.status}
                        </span>

                      </td>


                      {/* Status update */}

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
                          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500"
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
