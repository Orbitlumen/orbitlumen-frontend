export function CtaBanner() {
  return (
    <section className="px-6 py-20 lg:px-8">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-navy-border bg-navy-card px-8 py-16 text-center sm:px-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 80% at 50% 100%, rgba(240,192,80,0.16) 0%, rgba(14,21,38,0) 70%)",
          }}
        />
        <div className="relative">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Put your knowledge into orbit.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            List an API, dataset, model, or paper in minutes. Get paid in XLM
            the moment someone — human or agent — puts it to use.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#"
              className="w-full rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-gold-soft sm:w-auto"
            >
              Connect Wallet
            </a>
            <a
              href="#"
              className="w-full rounded-full border border-navy-border px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:border-gold/50 hover:text-gold sm:w-auto"
            >
              Read the Docs
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
