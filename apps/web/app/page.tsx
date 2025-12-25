import Link from "next/link"

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto space-y-10">
      {/* Hero */}
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold text-wormhole-white">
          Wormhole Cross-Chain Starter
        </h1>

        <p className="text-gray-400 text-lg">
          A minimal example showing how a real cross-chain message
          moves from Ethereum Sepolia to Base Sepolia using Wormhole.
        </p>
      </section>

      {/* What happens */}
      <section className="border border-white/10 rounded-lg p-6 space-y-3">
        <h2 className="text-sm font-medium text-gray-400">
          What this demo shows
        </h2>

        <ul className="text-gray-400 text-sm space-y-2 list-disc list-inside">
          <li>User signs a transaction on Sepolia</li>
          <li>Message is sent via Wormhole Relayer</li>
          <li>Delivery happens asynchronously on Base Sepolia</li>
          <li>UI updates only after on-chain execution</li>
        </ul>
      </section>

      {/* CTA */}
      <Link
        href="/poll"
        className="
          inline-flex items-center justify-center
          px-5 py-3 rounded-lg
          bg-wormhole-purple text-white
          hover:bg-wormhole-purple/90
          transition
        "
      >
        Try the cross-chain poll →
      </Link>

      {/* Footnote */}
      <p className="text-xs text-gray-500">
        This demo uses real testnet contracts. Delays and retries are
        normal in cross-chain systems.
      </p>
    </main>
  )
}
