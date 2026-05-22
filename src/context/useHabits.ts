import { createContext, useContext } from "react";

export type Habit = { id: string; name: string; completions: Date[]}

export const HabitContext = createContext<null | Context>(null)

type Context = {
    habits: Habit[]
    addHabit: (name: string) => void
    deleteHabit: (id: string) => void
    toggleHabit: (id: string, date: Date) => void

}

export function useHabits() {
  const habitContext = useContext(HabitContext)
  if (habitContext == null) throw new Error ("Null Context")

  return habitContext
}