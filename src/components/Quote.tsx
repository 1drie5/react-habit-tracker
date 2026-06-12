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
    <div className="rounded-lg bg-zinc-800 p-4 flex flex-col gap-3">
      <p className="italic">"{quote.content}"</p>

      <p className="text-sm text-zinc-400">
        — {quote.author}
      </p>

      <Button
        variant="primary"
        onClick={fetchQuote}
        className="self-start"
      >
        New Quote
      </Button>
    </div>
  )
}