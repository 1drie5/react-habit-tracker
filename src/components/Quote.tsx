import { useEffect, useState } from "react"

type Quote = {
  content: string
  author: string
}

export function Quote() {
  const [quote, setQuote] = useState<Quote | null>(null)

  useEffect(() => {
    async function fetchQuote() {
      const res = await fetch("https://api.quotable.io/random")
      const data = await res.json()
      setQuote(data)
    }

    fetchQuote()
  }, [])

  if (!quote) return <p>Loading quote...</p>

  return (
    <div className="rounded-lg bg-zinc-800 p-4">
      <p className="italic">"{quote.content}"</p>
      <p className="text-sm text-zinc-400 mt-2">
        — {quote.author}
      </p>
    </div>
  )
}