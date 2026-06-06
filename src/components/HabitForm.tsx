import { useRef, useState, type SubmitEvent } from "react";
import { Button } from "./Buttons";
import { useHabits } from "../context/useHabits";


export function HabitForm() {
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null)
  const { habits, addHabit } = useHabits()
  const habitExists = habits.some(
      h => h.name.trim().toLowerCase() === name.trim().toLowerCase(),
    )
  
  function handleSubmit(e: SubmitEvent) {
    e.preventDefault()

    if (name.trim() === "") return
    setName("")
    addHabit(name)
    inputRef.current?.focus()
  }

  return (
   <div> 
    <form className="flex gap-2" onSubmit={handleSubmit}>
      {name}
      <input
        ref={inputRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1 rounded-lg bg-zinc-800 px-4 py-2 outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        placeholder="New habit..."
      />
      <Button
        disabled={name.trim() === "" || habitExists}
        className="rounded-lg px-4 py-2 font-medium">
        Add Habit
      </Button>
    </form>
    {habitExists && (
      <span className="text-red-400 text-xs">
        Habit already exists
      </span>
    )}
    </div>
  )
}