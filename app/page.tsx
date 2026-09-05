"use client";

import Link from "next/link";

export default function Home() {
return ( <main className="min-h-screen bg-slate-50 text-slate-900">
{/* Navigation */} <nav className="border-b border-slate-200 bg-white"> <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"> <div> <h1 className="text-2xl font-bold tracking-tight text-slate-900">
Reflex </h1> <p className="text-xs text-slate-500">
Delivery Coordination </p> </div>

```
      <div className="flex items-center gap-3">
        <Link
          href="/dispatcher"
          className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Dispatcher
        </Link>

        <Link
          href="/rider"
          className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600"
        >
          Rider App
        </Link>
      </div>
    </div>
  </nav>

  {/* Hero */}
  <section className="px-6 py-20">
    <div className="mx-auto max-w-7xl">
      <div className="max-w-3xl">
        <span className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
          Smarter delivery coordination
        </span>

        <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
          Coordinate deliveries.
          <span className="block text-amber-500">
            Keep everyone in sync.
          </span>
        </h2>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Reflex helps retailers, dispatchers, and riders manage
          deliveries from order creation to successful delivery —
          without relying on scattered WhatsApp messages and phone
          calls.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/dispatcher"
            className="rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            Open Dispatcher Dashboard
          </Link>

          <Link
            href="/rider"
            className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Open Rider App
          </Link>
        </div>
      </div>
    </div>
  </section>

  {/* How it works */}
  <section className="border-y border-slate-200 bg-white px-6 py-16">
    <div className="mx-auto max-w-7xl">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-slate-900">
          How Reflex works
        </h2>

        <p className="mt-2 text-slate-600">
          A simple delivery workflow for every team member.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 font-bold text-amber-700">
            1
          </div>

          <h3 className="text-xl font-bold text-slate-900">
            Create Order
          </h3>

          <p className="mt-2 leading-6 text-slate-600">
            Retailers record customer details, delivery address,
            items, and payment information.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
            2
          </div>

          <h3 className="text-xl font-bold text-slate-900">
            Assign Rider
          </h3>

          <p className="mt-2 leading-6 text-slate-600">
            Dispatchers view pending orders and assign available
            riders to each delivery.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
            3
          </div>

          <h3 className="text-xl font-bold text-slate-900">
            Complete Delivery
          </h3>

          <p className="mt-2 leading-6 text-slate-600">
            Riders update the delivery status from pickup through
            transit until the order is delivered.
          </p>
        </div>
      </div>
    </div>
  </section>

  {/* Status flow */}
  <section className="px-6 py-16">
    <div className="mx-auto max-w-7xl">
      <div className="rounded-2xl bg-slate-900 p-8 text-white sm:p-10">
        <h2 className="text-2xl font-bold">
          Real-time delivery workflow
        </h2>

        <p className="mt-2 max-w-2xl text-slate-300">
          Every order follows a clear status journey so the team
          knows exactly where a delivery stands.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-slate-700 px-4 py-2 text-sm font-semibold">
            CREATED
          </span>

          <span className="text-slate-400">→</span>

          <span className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold">
            ASSIGNED
          </span>

          <span className="text-slate-400">→</span>

          <span className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold">
            PICKED UP
          </span>

          <span className="text-slate-400">→</span>

          <span className="rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold">
            IN TRANSIT
          </span>

          <span className="text-slate-400">→</span>

          <span className="rounded-full bg-green-500 px-4 py-2 text-sm font-semibold">
            DELIVERED
          </span>
        </div>
      </div>
    </div>
  </section>

  {/* Footer */}
  <footer className="border-t border-slate-200 bg-white px-6 py-8">
    <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 text-sm text-slate-500 sm:flex-row">
      <p>© 2026 Reflex. Delivery coordination platform.</p>

      <p>
        Built for retailers, dispatchers, and riders.
      </p>
    </div>
  </footer>
</main>
```

);
}
