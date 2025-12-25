import "./globals.css"

export const metadata = {
  title: "Wormhole Cross-Chain Starter",
  description: "Build a cross-chain app in 30 minutes"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-wormhole-black text-wormhole-white">
        <header className="border-b border-white/10">
          <div className="max-w-3xl mx-auto px-4 py-4">
            <h1 className="text-sm font-medium text-wormhole-white">
              Wormhole Cross-Chain Starter
            </h1>
            <p className="text-xs text-gray-400">
              Async by design · Delivery is not instant
            </p>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 py-10">
          {children}
        </main>

        <footer className="border-t border-white/10 mt-16">
          <div className="max-w-3xl mx-auto px-4 py-4 text-xs text-gray-500">
            Powered by Wormhole · Simulated delivery
          </div>
        </footer>
      </body>
    </html>
  )
}
