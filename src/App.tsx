import { Header } from "./components/Header"
import { HabitForm } from "./components/HabitForm"
import { HabitList } from "./components/HabitList"
// import { useState } from "react"
// import { isSameDay } from "date-fns"
import { HabitProvider } from "./context/HabitProvider"

export default function App() {
    

  return <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
    <HabitProvider>
      <Header />
      <HabitForm />
      <HabitList />
    </HabitProvider>
  </div>
}
