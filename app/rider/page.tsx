"use client";

import Link from "next/link";

const workflow = [
{
number: "01",
title: "Create",
description: "Capture the customer, address and order details in seconds.",
},
{
number: "02",
title: "Assign",
description: "Dispatchers match every delivery with the right rider.",
},
{
number: "03",
title: "Deliver",
description: "Riders update progress from pickup to successful delivery.",
},
];

const stats = [
{ value: "24", label: "Orders today" },
{ value: "18", label: "In progress" },
{ value: "06", label: "Delivered" },
];

export default function Home() {
return ( <main className="min-h-screen overflow-hidden bg-[#f6f7f9] text-[#111827]">
{/* HEADER */} <header className="relative z-20 border-b border-white/10 bg-[#101827]"> <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8"> <Link href="/" className="flex items-center gap-3"> <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5b942] text-lg font-black text-[#101827]">
R </div>


        <div>
          <p className="text-lg font-black tracking-tight text-white">
            reflex
          </p>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
            delivery operations
          </p>
        </div>
      </Link>

      <nav className="hidden items-center gap-8 md:flex">
        <a
          href="#how-it-works"
          className="text-sm font-medium text-slate-300 transition hover:text-white"
        >
          How it works
        </a>

        <a
          href="#workflow"
          className="text-sm font-medium text-slate-300 transition hover:text-white"
        >
          Workflow
        </a>

        <Link
          href="/dispatcher"
          className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-semibold text-white transition hover:border-slate-400"
        >
          Dispatcher
        </Link>

        <Link
          href="/rider"
          className="rounded-lg bg-[#f5b942] px-5 py-2.5 text-sm font-bold text-[#101827] transition hover:bg-[#ffc95e]"
        >
          Rider App
        </Link>
      </nav>

      <div className="md:hidden">
        <Link
          href="/dispatcher"
          className="rounded-lg bg-[#f5b942] px-4 py-2 text-sm font-bold text-[#101827]"
        >
          Open App
        </Link>
      </div>
    </div>
  </header>

  {/* HERO */}
  <section className="relative overflow-hidden bg-[#101827]">
    <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#f5b942]/10 blur-3xl" />
    <div className="absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-blue-500/10 blur-3xl" />

    <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
      {/* HERO COPY */}
      <div className="flex flex-col justify-center">
        <div className="mb-7 flex items-center gap-3">
          <span className="h-px w-10 bg-[#f5b942]" />
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#f5b942]">
            Built for modern delivery teams
          </span>
        </div>

        <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
          Delivery operations,
          <span className="block text-[#f5b942]">
            without the chaos.
          </span>
        </h1>

        <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">
          Reflex gives retailers, dispatchers and riders one clear
          place to manage every delivery from the moment an order is
          created to the moment it reaches the customer.
        </p>

        <div className="mt-9 flex flex-wrap gap-4">
          <Link
            href="/dispatcher"
            className="group flex items-center gap-3 rounded-xl bg-[#f5b942] px-6 py-3.5 font-bold text-[#101827] transition hover:-translate-y-0.5 hover:bg-[#ffc95e]"
          >
            Open Dispatcher
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>

          <Link
            href="/rider"
            className="rounded-xl border border-slate-600 px-6 py-3.5 font-semibold text-white transition hover:border-slate-400 hover:bg-white/5"
          >
            Rider App
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-400">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Live order visibility
          </span>

          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Rider assignment
          </span>

          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Status tracking
          </span>
        </div>
      </div>

      {/* DASHBOARD PREVIEW */}
      <div className="relative flex items-center justify-center lg:justify-end">
        <div className="absolute h-72 w-72 rounded-full bg-[#f5b942]/10 blur-3xl" />

        <div className="relative w-full max-w-lg rotate-1 rounded-2xl border border-white/10 bg-white/[0.07] p-3 shadow-2xl backdrop-blur">
          <div className="rounded-xl bg-[#f8fafc] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Operations overview
                </p>
                <h2 className="mt-1 text-xl font-black text-[#111827]">
                  Today&apos;s deliveries
                </h2>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#101827] text-sm font-black text-[#f5b942]">
                R
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-slate-200 bg-white p-3"
                >
                  <p className="text-2xl font-black text-[#111827]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[11px] font-medium text-slate-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-bold text-[#111827]">
                  Active delivery
                </p>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-600">
                  In transit
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#101827] text-xs font-black text-[#f5b942]">
                  01
                </div>

                <div className="h-1 flex-1 rounded-full bg-slate-200">
                  <div className="h-1 w-3/4 rounded-full bg-[#f5b942]" />
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-600">
                  ✓
                </div>
              </div>

              <div className="mt-3 flex justify-between text-[10px] font-semibold text-slate-400">
                <span>Pickup</span>
                <span>Transit</span>
                <span>Customer</span>
              </div>
            </div>

            <div className="mt-3 rounded-xl bg-[#101827] p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">
                    Assigned rider
                  </p>
                  <p className="mt-1 font-bold">Rider on route</p>
                </div>

                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5b942] text-sm font-black text-[#101827]">
                  R
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* WORKFLOW */}
  <section id="how-it-works" className="bg-white px-6 py-20 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="max-w-2xl">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#d49718]">
          Simple by design
        </p>

        <h2 className="mt-3 text-4xl font-black tracking-tight text-[#111827] sm:text-5xl">
          One workflow.
          <br />
          Everyone knows what&apos;s next.
        </h2>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {workflow.map((item) => (
          <div
            key={item.number}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-[#f8fafc] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#f5b942] hover:shadow-xl"
          >
            <span className="text-sm font-black tracking-widest text-[#f5b942]">
              {item.number}
            </span>

            <h3 className="mt-8 text-2xl font-black text-[#111827]">
              {item.title}
            </h3>

            <p className="mt-3 leading-7 text-slate-500">
              {item.description}
            </p>

            <div className="mt-8 h-1 w-10 rounded-full bg-[#f5b942] transition-all duration-300 group-hover:w-20" />
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* STATUS FLOW */}
  <section id="workflow" className="bg-[#f6f7f9] px-6 py-20 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="rounded-3xl bg-[#101827] p-8 shadow-2xl sm:p-12 lg:p-16">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f5b942]">
              Delivery visibility
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Know exactly where every order stands.
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Every delivery moves through a clear sequence, giving
              your team a shared view of progress.
            </p>
          </div>

          <div className="space-y-3">
            {[
              ["CREATED", "Order received"],
              ["ASSIGNED", "Rider selected"],
              ["PICKED UP", "Rider has the order"],
              ["IN TRANSIT", "Delivery is on the way"],
              ["DELIVERED", "Customer received order"],
            ].map(([status, description], index) => (
              <div
                key={status}
                className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-4"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5b942] text-xs font-black text-[#101827]">
                  {index + 1}
                </span>

                <div className="flex-1">
                  <p className="text-sm font-black text-white">
                    {status}
                  </p>
                  <p className="text-xs text-slate-500">
                    {description}
                  </p>
                </div>

                {index < 4 && (
                  <span className="text-slate-600">→</span>
                )}

                {index === 4 && (
                  <span className="text-lg font-bold text-emerald-400">
                    ✓
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* CTA */}
  <section className="bg-white px-6 py-20 lg:px-8">
    <div className="mx-auto max-w-4xl text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#101827] text-xl font-black text-[#f5b942]">
        R
      </div>

      <h2 className="mt-6 text-4xl font-black tracking-tight text-[#111827] sm:text-5xl">
        Ready to run deliveries better?
      </h2>

      <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-500">
        Give your dispatch team a clear operational view and your
        riders a simple way to keep deliveries moving.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/dispatcher"
          className="rounded-xl bg-[#101827] px-7 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#1a2638]"
        >
          Go to Dispatcher
        </Link>

        <Link
          href="/rider"
          className="rounded-xl border border-slate-300 px-7 py-3.5 font-bold text-[#111827] transition hover:bg-slate-50"
        >
          Open Rider App
        </Link>
      </div>
    </div>
  </section>

  {/* FOOTER */}
  <footer className="bg-[#101827] px-6 py-8 lg:px-8">
    <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f5b942] text-xs font-black text-[#101827]">
          R
        </div>
        <span className="font-bold text-white">reflex</span>
      </div>

      <p className="text-slate-500">
        Delivery coordination, simplified.
      </p>

      <p className="text-slate-500">
        © 2026 Reflex
      </p>
    </div>
  </footer>
</main>


);
}
