import { useEffect, useState } from "react"
import { Button } from "./Buttons"

type Quote = {
  content: string
  author: string
}

export function Quote() {
  const [quote, setQuote] = useState<Quote | null>(null)

  async function fetchQuote() {
    const res = await fetch("https://api.quotable.io/random")
    const data = await res.json()

    setQuote(data)
  }

  useEffect(() => {
    fetchQuote()
  }, [])

  if (!quote) return <p>Loading quote...</p>

  return (
    <div className="rounded-lg bg-zinc-800/70 backdrop-blur-sm border border-zinc-700/50 p-4">
      <p className="italic">"{quote.content}"</p>

      <p className="text-sm text-zinc-400">
        — {quote.author}
      </p>

        <div className="flex justify-end">
          <Button
            variant="primary"
            onClick={fetchQuote}
          >
            New Quote
          </Button>
        </div>
    </div>
  )
}