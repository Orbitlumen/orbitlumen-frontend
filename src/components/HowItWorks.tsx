const STEPS = [
  {
    number: "01",
    title: "Connect your Stellar wallet",
    description:
      "Link Freighter in seconds. No account creation, no custody — your keys stay yours.",
  },
  {
    number: "02",
    title: "Browse & purchase access",
    description:
      "Find an API, dataset, model, or paper. Pay in XLM and receive an on-chain access grant instantly.",
  },
  {
    number: "03",
    title: "Consume or resell",
    description:
      "Query the resource directly, or via an autonomous agent. Publishers get paid in real time, every call.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-gray-400">
            Three steps from wallet connect to on-chain settlement.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.number} className="relative pl-2">
              <span className="font-heading text-5xl font-bold text-navy-border">
                {step.number}
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
