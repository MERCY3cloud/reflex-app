"use client";

import Link from "next/link";

const deliveries = [
  {
    id: "#1048",
    customer: "Grace Wanjiku",
    destination: "Westlands, Nairobi",
    rider: "Brian K.",
    status: "IN TRANSIT",
    time: "12 min",
  },
  {
    id: "#1047",
    customer: "David Mwangi",
    destination: "Kilimani, Nairobi",
    rider: "Kevin M.",
    status: "PICKED UP",
    time: "24 min",
  },
  {
    id: "#1046",
    customer: "Anne Njeri",
    destination: "Lavington, Nairobi",
    rider: "Sarah W.",
    status: "ASSIGNED",
    time: "38 min",
  },
];

const workflow = [
  {
    number: "01",
    title: "Create",
    text: "Capture the order, customer and delivery details in one place.",
  },
  {
    number: "02",
    title: "Assign",
    text: "Dispatchers assign each delivery to the right available rider.",
  },
  {
    number: "03",
    title: "Track",
    text: "Follow every delivery as it moves from pickup to completion.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f8fa] text-[#111827]">
      {/* NAVIGATION */}
      <header className="border-b border-white/10 bg-[#0b1220]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f4b740] text-lg font-black text-[#0b1220]">
              R
            </div>

            <div>
              <div className="text-lg font-black tracking-tight text-white">
                reflex
              </div>
              <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-slate-500">
                Delivery operations
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#workflow"
              className="text-sm font-medium text-slate-400 transition hover:text-white"
            >
              How it works
            </a>

            <a
              href="#operations"
              className="text-sm font-medium text-slate-400 transition hover:text-white"
            >
              Operations
            </a>

            <Link
              href="/dispatcher"
              className="text-sm font-semibold text-white transition hover:text-[#f4b740]"
            >
              Dispatcher
            </Link>

            <Link
              href="/rider"
              className="rounded-lg bg-[#f4b740] px-5 py-2.5 text-sm font-bold text-[#0b1220] transition hover:bg-[#ffd166]"
            >
              Rider App
            </Link>
          </nav>

          <Link
            href="/dispatcher"
            className="rounded-lg bg-[#f4b740] px-4 py-2.5 text-sm font-bold text-[#0b1220] md:hidden"
          >
            Open App
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0b1220]">
        <div className="absolute right-[-160px] top-[-180px] h-[500px] w-[500px] rounded-full bg-[#f4b740]/10 blur-3xl" />

        <div className="absolute bottom-[-220px] left-[-150px] h-[450px] w-[450px] rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8 lg:py-28">
          {/* LEFT */}
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-300">
                Delivery operations platform
              </span>
            </div>

            <h1 className="max-w-2xl text-5xl font-black leading-[0.95] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
              Every delivery.
              <span className="block text-[#f4b740]">
                Under control.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-400">
              Reflex connects retailers, dispatchers and riders in one
              operational workspace — replacing scattered calls and
              WhatsApp messages with a clear delivery workflow.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/dispatcher"
                className="group flex items-center gap-3 rounded-xl bg-[#f4b740] px-6 py-3.5 text-sm font-black text-[#0b1220] transition hover:-translate-y-0.5 hover:bg-[#ffd166]"
              >
                Open Dispatcher
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="/rider"
                className="rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/[0.08]"
              >
                Open Rider App
              </Link>
            </div>

            <div className="mt-9 grid max-w-lg grid-cols-3 border-y border-white/10 py-5">
              <div>
                <p className="text-2xl font-black text-white">24</p>
                <p className="mt-1 text-[11px] text-slate-500">
                  Orders today
                </p>
              </div>

              <div className="border-l border-white/10 pl-5">
                <p className="text-2xl font-black text-white">18</p>
                <p className="mt-1 text-[11px] text-slate-500">
                  Active deliveries
                </p>
              </div>

              <div className="border-l border-white/10 pl-5">
                <p className="text-2xl font-black text-[#f4b740]">94%</p>
                <p className="mt-1 text-[11px] text-slate-500">
                  Completed
                </p>
              </div>
            </div>
          </div>

          {/* OPERATIONS PANEL */}
          <div id="operations" className="relative">
            <div className="absolute -inset-5 rounded-[2rem] bg-[#f4b740]/5 blur-2xl" />

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111b2d] shadow-2xl">
              {/* PANEL HEADER */}
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                    Dispatcher workspace
                  </p>

                  <h2 className="mt-1 text-lg font-black text-white">
                    Today&apos;s operations
                  </h2>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                  <span className="text-[10px] font-bold text-emerald-400">
                    LIVE
                  </span>
                </div>
              </div>

              {/* METRICS */}
              <div className="grid grid-cols-3 gap-px border-b border-white/10 bg-white/10">
                <div className="bg-[#111b2d] px-5 py-5">
                  <p className="text-2xl font-black text-white">24</p>
                  <p className="mt-1 text-[10px] text-slate-500">
                    Total orders
                  </p>
                </div>

                <div className="bg-[#111b2d] px-5 py-5">
                  <p className="text-2xl font-black text-[#f4b740]">18</p>
                  <p className="mt-1 text-[10px] text-slate-500">
                    In progress
                  </p>
                </div>

                <div className="bg-[#111b2d] px-5 py-5">
                  <p className="text-2xl font-black text-emerald-400">6</p>
                  <p className="mt-1 text-[10px] text-slate-500">
                    Delivered
                  </p>
                </div>
              </div>

              {/* ORDERS */}
              <div className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-bold text-white">
                    Active deliveries
                  </p>

                  <span className="text-[10px] font-medium text-slate-500">
                    3 shown
                  </span>
                </div>

                <div className="space-y-2">
                  {deliveries.map((delivery) => (
                    <div
                      key={delivery.id}
                      className="rounded-xl border border-white/10 bg-white/[0.025] p-4 transition hover:bg-white/[0.05]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f4b740] text-[10px] font-black text-[#0b1220]">
                            {delivery.id.replace("#", "")}
                          </div>

                          <div>
                            <p className="text-sm font-bold text-white">
                              {delivery.customer}
                            </p>

                            <p className="mt-0.5 text-[11px] text-slate-500">
                              {delivery.destination}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`rounded-full px-2.5 py-1 text-[8px] font-black tracking-wide ${
                            delivery.status === "IN TRANSIT"
                              ? "bg-blue-400/10 text-blue-400"
                              : delivery.status === "PICKED UP"
                                ? "bg-purple-400/10 text-purple-400"
                                : "bg-amber-400/10 text-amber-400"
                          }`}
                        >
                          {delivery.status}
                        </span>
                      </div>

                      <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
                        <span className="text-[10px] text-slate-500">
                          Rider:{" "}
                          <span className="font-semibold text-slate-300">
                            {delivery.rider}
                          </span>
                        </span>

                        <span className="text-[10px] font-semibold text-slate-500">
                          {delivery.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/dispatcher"
                  className="mt-3 flex w-full items-center justify-center rounded-xl border border-white/10 py-3 text-xs font-bold text-slate-300 transition hover:bg-white/[0.04] hover:text-white"
                >
                  View dispatcher dashboard →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section id="workflow" className="bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#c88d13]">
                One connected workflow
              </p>

              <h2 className="mt-3 max-w-2xl text-4xl font-black tracking-[-0.03em] text-[#111827] sm:text-5xl">
                From order created to order delivered.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-slate-500">
              Everyone works from the same delivery status, so nothing
              gets lost between the retailer, dispatcher and rider.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {workflow.map((item) => (
              <div
                key={item.number}
                className="group rounded-2xl border border-slate-200 bg-[#f8fafc] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#f4b740] hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black tracking-[0.2em] text-[#f4b740]">
                    {item.number}
                  </span>

                  <span className="text-slate-300 transition group-hover:text-[#f4b740]">
                    ↗
                  </span>
                </div>

                <h3 className="mt-10 text-2xl font-black text-[#111827]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {item.text}
                </p>

                <div className="mt-8 h-1 w-8 rounded-full bg-[#f4b740] transition-all duration-300 group-hover:w-16" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATUS SECTION */}
      <section className="bg-[#f7f8fa] px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-3xl bg-[#0b1220]">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
              <div className="p-8 sm:p-12 lg:p-16">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#f4b740]">
                  Clear status tracking
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
                  No more guessing where an order is.
                </h2>

                <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
                  Reflex gives every delivery a clear progression that
                  the entire team can understand.
                </p>
              </div>

              <div className="border-t border-white/10 p-6 sm:p-10 lg:border-l lg:border-t-0">
                <div className="space-y-3">
                  {[
                    ["01", "CREATED", "Order received"],
                    ["02", "ASSIGNED", "Rider selected"],
                    ["03", "PICKED UP", "Rider has the order"],
                    ["04", "IN TRANSIT", "Delivery is on the way"],
                    ["05", "DELIVERED", "Customer received order"],
                  ].map(([number, status, description]) => (
                    <div
                      key={status}
                      className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.035] p-4"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f4b740] text-[10px] font-black text-[#0b1220]">
                        {number}
                      </span>

                      <div className="flex-1">
                        <p className="text-xs font-black text-white">
                          {status}
                        </p>

                        <p className="mt-1 text-[10px] text-slate-500">
                          {description}
                        </p>
                      </div>

                      <span className="text-slate-600">→</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#0b1220] text-lg font-black text-[#f4b740]">
            R
          </div>

          <h2 className="mt-6 text-4xl font-black tracking-[-0.03em] text-[#111827] sm:text-5xl">
            Put your deliveries in motion.
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-500">
            One place for orders. One workflow for your team. One clear
            view of what is happening.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/dispatcher"
              className="rounded-xl bg-[#0b1220] px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5"
            >
              Open Dispatcher
            </Link>

            <Link
              href="/rider"
              className="rounded-xl border border-slate-300 px-7 py-3.5 text-sm font-bold text-[#111827] transition hover:bg-slate-50"
            >
              Open Rider App
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#0b1220] px-6 py-7 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f4b740] text-xs font-black text-[#0b1220]">
              R
            </div>

            <div>
              <p className="text-sm font-black text-white">reflex</p>
              <p className="text-[9px] uppercase tracking-[0.18em] text-slate-600">
                Delivery operations
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-600">
            Delivery coordination, simplified.
          </p>

          <p className="text-xs text-slate-600">
            © 2026 Reflex
          </p>
        </div>
      </footer>
    </main>
  );
}
