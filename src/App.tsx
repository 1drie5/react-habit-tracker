import { Header } from "./components/Header"
import { HabitForm } from "./components/HabitForm"
import { HabitList, type Habit } from "./components/HabitList"
import { useState } from "react"
import { isSameDay } from "date-fns"

export default function App() {
    const [habits, setHabits] = useState<Habit[]>([])
  
    function addHabit(name: string){
      // setHabits([...habits, {id: crypto.randomUUID(), name}])
      setHabits(curr => [
          ...curr, 
          {id: crypto.randomUUID(), name, completions: []},
        ])
    }

    function toggleHabit(id: string, date: Date){
      setHabits(curr =>
        curr.map(h=>{
            if (h.id !== id) return h 
            const alreadyDone = h.completions.some(c => isSameDay(c, date))
            const completions = alreadyDone ? h.completions.filter(c => !isSameDay(c, date)) : [...h.completions, date]
            return {...h, completions} 
          }),
        )
      }    
    
      function deleteHabit(id: string){
        setHabits(curr => curr.filter(habit => habit.id !== id))
      }

  return <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
    <Header />
    <HabitForm addHabit={addHabit}/>
    <HabitList deleteHabit={deleteHabit} toggleHabit={toggleHabit} habits={habits}/>
  </div>
}
