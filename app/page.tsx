"use client";

import Link from "next/link";

const orders = [
  {
    id: "#1048",
    customer: "Grace Wanjiku",
    location: "Westlands, Nairobi",
    rider: "Brian K.",
    status: "IN TRANSIT",
  },
  {
    id: "#1047",
    customer: "David Mwangi",
    location: "Kilimani, Nairobi",
    rider: "Kevin M.",
    status: "PICKED UP",
  },
  {
    id: "#1046",
    customer: "Anne Njeri",
    location: "Lavington, Nairobi",
    rider: "Sarah W.",
    status: "ASSIGNED",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">

      {/* NAVBAR */}
      <header className="border-b border-black bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">

          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center bg-black text-sm font-black text-white">
              R
            </div>

            <div>
              <p className="text-lg font-black tracking-[-0.04em]">
                reflex
              </p>

              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-neutral-500">
                Delivery operations
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#how"
              className="text-sm font-medium text-neutral-600 hover:text-black"
            >
              How it works
            </a>

            <a
              href="#operations"
              className="text-sm font-medium text-neutral-600 hover:text-black"
            >
              Operations
            </a>

            <Link
              href="/dispatcher"
              className="text-sm font-bold text-black"
            >
              Dispatcher
            </Link>

            <Link
              href="/rider"
              className="bg-black px-5 py-2.5 text-sm font-bold text-white transition hover:bg-neutral-800"
            >
              Rider App
            </Link>
          </nav>

          <Link
            href="/dispatcher"
            className="bg-black px-4 py-2.5 text-sm font-bold text-white md:hidden"
          >
            Open App
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="border-b border-black bg-black text-white">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">

          {/* HERO COPY */}
          <div>

            <p className="mb-8 text-xs font-bold uppercase tracking-[0.3em] text-neutral-400">
              Delivery coordination platform
            </p>

            <h1 className="max-w-3xl text-6xl font-black leading-[0.9] tracking-[-0.06em] sm:text-7xl lg:text-[88px]">
              Deliveries.
              <br />
              <span className="text-neutral-500">
                Under control.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-neutral-400">
              Reflex gives retailers, dispatchers and riders one
              workspace to create, assign and track every delivery.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">

              <Link
                href="/dispatcher"
                className="bg-white px-7 py-4 text-sm font-black text-black transition hover:bg-neutral-200"
              >
                Open Dispatcher →
              </Link>

              <Link
                href="/rider"
                className="border border-neutral-600 px-7 py-4 text-sm font-bold text-white transition hover:border-white"
              >
                Rider App
              </Link>

            </div>

            <div className="mt-12 flex items-center gap-6 border-t border-neutral-800 pt-6">

              <div>
                <p className="text-2xl font-black">24</p>
                <p className="mt-1 text-xs text-neutral-500">
                  Orders today
                </p>
              </div>

              <div className="h-10 w-px bg-neutral-800" />

              <div>
                <p className="text-2xl font-black">18</p>
                <p className="mt-1 text-xs text-neutral-500">
                  Active
                </p>
              </div>

              <div className="h-10 w-px bg-neutral-800" />

              <div>
                <p className="text-2xl font-black">06</p>
                <p className="mt-1 text-xs text-neutral-500">
                  Delivered
                </p>
              </div>

            </div>
          </div>

          {/* PRODUCT PREVIEW */}
          <div id="operations">

            <div className="border border-neutral-700 bg-[#0a0a0a]">

              {/* TOP BAR */}
              <div className="flex items-center justify-between border-b border-neutral-800 px-5 py-4">

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                    Reflex / Dispatcher
                  </p>

                  <p className="mt-1 text-sm font-bold">
                    Operations
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-wider text-neutral-400">
                  <span className="h-2 w-2 bg-white" />
                  Live
                </div>

              </div>

              {/* METRICS */}
              <div className="grid grid-cols-3 border-b border-neutral-800">

                <div className="border-r border-neutral-800 p-5">
                  <p className="text-2xl font-black">24</p>
                  <p className="mt-1 text-[10px] text-neutral-500">
                    Total
                  </p>
                </div>

                <div className="border-r border-neutral-800 p-5">
                  <p className="text-2xl font-black">18</p>
                  <p className="mt-1 text-[10px] text-neutral-500">
                    Active
                  </p>
                </div>

                <div className="p-5">
                  <p className="text-2xl font-black">06</p>
                  <p className="mt-1 text-[10px] text-neutral-500">
                    Delivered
                  </p>
                </div>

              </div>

              {/* ORDER LIST */}
              <div className="p-5">

                <div className="mb-4 flex items-center justify-between">
                  <p className="text-xs font-bold">
                    Active deliveries
                  </p>

                  <span className="text-[10px] text-neutral-600">
                    Today
                  </span>
                </div>

                <div className="space-y-2">

                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-neutral-800 bg-[#111111] p-4"
                    >

                      <div className="flex items-start justify-between gap-4">

                        <div className="flex gap-3">

                          <div className="flex h-9 w-9 items-center justify-center border border-neutral-700 text-[9px] font-black">
                            {order.id.replace("#", "")}
                          </div>

                          <div>
                            <p className="text-sm font-bold">
                              {order.customer}
                            </p>

                            <p className="mt-1 text-[10px] text-neutral-500">
                              {order.location}
                            </p>
                          </div>

                        </div>

                        <span className="border border-neutral-700 px-2 py-1 text-[8px] font-bold tracking-wider text-neutral-300">
                          {order.status}
                        </span>

                      </div>

                      <div className="mt-4 flex justify-between border-t border-neutral-800 pt-3">

                        <p className="text-[10px] text-neutral-600">
                          Rider
                        </p>

                        <p className="text-[10px] font-bold text-neutral-300">
                          {order.rider}
                        </p>

                      </div>

                    </div>
                  ))}

                </div>

                <Link
                  href="/dispatcher"
                  className="mt-3 flex items-center justify-center border border-neutral-700 py-3 text-[10px] font-bold uppercase tracking-wider text-neutral-400 transition hover:border-white hover:text-white"
                >
                  Open dashboard →
                </Link>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="border-b border-neutral-200 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">

          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-400">
                How it works
              </p>

              <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
                One system.
                <br />
                Three roles.
              </h2>
            </div>

            <div className="grid divide-y border-y border-black md:grid-cols-3 md:divide-x md:divide-y-0">

              <div className="py-8 md:px-7">
                <p className="text-xs font-black text-neutral-400">
                  01
                </p>

                <h3 className="mt-12 text-xl font-black">
                  Create
                </h3>

                <p className="mt-3 text-sm leading-6 text-neutral-500">
                  Retailers capture customer and delivery details.
                </p>
              </div>

              <div className="py-8 md:px-7">
                <p className="text-xs font-black text-neutral-400">
                  02
                </p>

                <h3 className="mt-12 text-xl font-black">
                  Assign
                </h3>

                <p className="mt-3 text-sm leading-6 text-neutral-500">
                  Dispatchers assign orders to available riders.
                </p>
              </div>

              <div className="py-8 md:px-7">
                <p className="text-xs font-black text-neutral-400">
                  03
                </p>

                <h3 className="mt-12 text-xl font-black">
                  Deliver
                </h3>

                <p className="mt-3 text-sm leading-6 text-neutral-500">
                  Riders update the delivery until it is complete.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* STATUS */}
      <section className="bg-[#f5f5f5]">

        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">

          <div className="border border-black bg-white">

            <div className="grid lg:grid-cols-2">

              <div className="border-b border-black p-8 lg:border-b-0 lg:border-r lg:p-14">

                <p className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-400">
                  Order lifecycle
                </p>

                <h2 className="mt-5 max-w-md text-4xl font-black leading-tight tracking-[-0.04em]">
                  Always know what happens next.
                </h2>

                <p className="mt-5 max-w-md text-sm leading-7 text-neutral-500">
                  Every delivery moves through a defined sequence,
                  giving the whole team one shared view of progress.
                </p>

              </div>

              <div className="p-6 lg:p-10">

                <div className="space-y-2">

                  {[
                    ["01", "CREATED", "Order received"],
                    ["02", "ASSIGNED", "Rider selected"],
                    ["03", "PICKED UP", "Order collected"],
                    ["04", "IN TRANSIT", "Delivery on the way"],
                    ["05", "DELIVERED", "Order completed"],
                  ].map(([number, status, description]) => (
                    <div
                      key={status}
                      className="flex items-center gap-4 border border-neutral-200 p-4"
                    >

                      <span className="text-[10px] font-black text-neutral-400">
                        {number}
                      </span>

                      <div className="h-1.5 w-1.5 bg-black" />

                      <div className="flex-1">
                        <p className="text-xs font-black">
                          {status}
                        </p>

                        <p className="mt-1 text-[10px] text-neutral-500">
                          {description}
                        </p>
                      </div>

                      <span className="text-neutral-300">
                        →
                      </span>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-black bg-black px-6 py-24 text-white lg:px-8">

        <div className="mx-auto max-w-4xl text-center">

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500">
            Reflex
          </p>

          <h2 className="mt-5 text-5xl font-black tracking-[-0.05em] sm:text-6xl">
            Run deliveries
            <br />
            with clarity.
          </h2>

          <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-neutral-500">
            Create orders. Assign riders. Track progress.
            Keep your entire delivery operation connected.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">

            <Link
              href="/dispatcher"
              className="bg-white px-7 py-4 text-sm font-black text-black hover:bg-neutral-200"
            >
              Open Dispatcher
            </Link>

            <Link
              href="/rider"
              className="border border-neutral-700 px-7 py-4 text-sm font-bold text-white hover:border-white"
            >
              Open Rider App
            </Link>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-800 bg-black px-6 py-7 text-white lg:px-8">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-xs sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center bg-white text-[10px] font-black text-black">
              R
            </div>

            <span className="font-black">
              reflex
            </span>
          </div>

          <span className="text-neutral-600">
            Delivery coordination, simplified.
          </span>

          <span className="text-neutral-600">
            © 2026 Reflex
          </span>

        </div>

      </footer>

    </main>
  );
}
