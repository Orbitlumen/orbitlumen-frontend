import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { truncateAddress } from "../../lib/format"

const EARNINGS_HISTORY = [
  { day: "Jun 23", xlm: 12 },
  { day: "Jun 24", xlm: 18 },
  { day: "Jun 25", xlm: 9 },
  { day: "Jun 26", xlm: 24 },
  { day: "Jun 27", xlm: 31 },
  { day: "Jun 28", xlm: 22 },
  { day: "Jun 29", xlm: 27 },
  { day: "Jun 30", xlm: 35 },
  { day: "Jul 1", xlm: 41 },
  { day: "Jul 2", xlm: 29 },
  { day: "Jul 3", xlm: 33 },
  { day: "Jul 4", xlm: 38 },
  { day: "Jul 5", xlm: 45 },
  { day: "Jul 6", xlm: 40 },
  { day: "Jul 7", xlm: 52 },
  { day: "Jul 8", xlm: 48 },
  { day: "Jul 9", xlm: 55 },
  { day: "Jul 10", xlm: 61 },
  { day: "Jul 11", xlm: 58 },
  { day: "Jul 12", xlm: 66 },
  { day: "Jul 13", xlm: 70 },
  { day: "Jul 14", xlm: 64 },
  { day: "Jul 15", xlm: 73 },
  { day: "Jul 16", xlm: 80 },
  { day: "Jul 17", xlm: 76 },
  { day: "Jul 18", xlm: 84 },
  { day: "Jul 19", xlm: 90 },
  { day: "Jul 20", xlm: 87 },
  { day: "Jul 21", xlm: 95 },
  { day: "Jul 22", xlm: 102 },
]

interface Transaction {
  date: string
  resource: string
  buyer: string
  amountXLM: number
  type: "Pay-per-call" | "One-time" | "Subscription"
}

const TRANSACTIONS: Transaction[] = [
  {
    date: "2026-07-22",
    resource: "Naira Stablecoin Swap Rates API",
    buyer: "GBTX94RMLQZ2DKC7VEJHY6NPS08OWAIU1XKZFTQ7RMLDKC94VEJHYNPSA2",
    amountXLM: 12,
    type: "Pay-per-call",
  },
  {
    date: "2026-07-21",
    resource: "East African Smallholder Farm Yields Dataset",
    buyer: "GDZ82NQXRW4SKC6ML0HYC7OMT19FXBGU2YV0LRQ8NQXSKC60MLHYOMT52",
    amountXLM: 60,
    type: "One-time",
  },
  {
    date: "2026-07-20",
    resource: "Multilingual African NLP Embedding Model",
    buyer: "GID26RUBVA8WOG0QP4LCG1SQX53JBFKY6CZ4PVU2RUBWOG04QPLCSQX96",
    amountXLM: 80,
    type: "Subscription",
  },
  {
    date: "2026-07-19",
    resource: "Naira Stablecoin Swap Rates API",
    buyer: "GCV71OPXQZ3RJC5MK9HYB6NLS08EWAFT1XUZKPQ7OPXRJC59MKHYNLS41",
    amountXLM: 12,
    type: "Pay-per-call",
  },
  {
    date: "2026-07-18",
    resource: "Soroban Gas Optimization Benchmark Study",
    buyer: "GKF48TWDXC0YQI2SR6NEI3USZ75LDHMA8EB6RXW4TWDYQI26SRNEUSZ18",
    amountXLM: 60,
    type: "One-time",
  },
  {
    date: "2026-07-17",
    resource: "Naira Stablecoin Swap Rates API",
    buyer: "GFB04PSZTY6UME8ON2JAE9QOV31HZDIW4AX2NTS0PSZUME82ONJAQOV74",
    amountXLM: 12,
    type: "Pay-per-call",
  },
]

export function EarningsTab() {
  const totalLast30 = EARNINGS_HISTORY.reduce((sum, d) => sum + d.xlm, 0)

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-navy-border bg-navy-card p-6">
        <div className="flex items-baseline justify-between">
          <h3 className="font-heading text-lg font-semibold text-white">
            Earnings — last 30 days
          </h3>
          <span className="font-mono text-sm text-gold">
            {totalLast30.toLocaleString()} XLM
          </span>
        </div>

        <div className="mt-6 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={EARNINGS_HISTORY}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1c2438" />
              <XAxis
                dataKey="day"
                stroke="#6b7280"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: "#1c2438" }}
                interval={4}
              />
              <YAxis
                stroke="#6b7280"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: "#1c2438" }}
                width={36}
              />
              <Tooltip
                contentStyle={{
                  background: "#0e1526",
                  border: "1px solid #1c2438",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                labelStyle={{ color: "#cbd2e1" }}
                formatter={(value) => [`${value} XLM`, "Earnings"]}
              />
              <Line
                type="monotone"
                dataKey="xlm"
                stroke="#f0c050"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-navy-border bg-navy-card">
        <h3 className="px-6 pt-6 font-heading text-lg font-semibold text-white">
          Recent transactions
        </h3>
        <table className="mt-4 w-full min-w-[700px] text-left text-sm">
          <thead>
            <tr className="border-b border-navy-border text-xs uppercase tracking-wide text-gray-500">
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Resource</th>
              <th className="px-6 py-3 font-medium">Buyer</th>
              <th className="px-6 py-3 font-medium">Amount</th>
              <th className="px-6 py-3 font-medium">Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-border">
            {TRANSACTIONS.map((tx, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-gray-400">{tx.date}</td>
                <td className="px-6 py-4 text-white">{tx.resource}</td>
                <td className="px-6 py-4 font-mono text-gray-400">
                  {truncateAddress(tx.buyer)}
                </td>
                <td className="px-6 py-4 font-mono text-gold">
                  {tx.amountXLM} XLM
                </td>
                <td className="px-6 py-4 text-gray-400">{tx.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
