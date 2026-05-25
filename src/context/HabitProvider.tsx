import { isSameDay } from 'date-fns';
import { useState, type ReactNode } from 'react';
import { HabitContext, type Habit } from './useHabits';
import { useLocalStorage } from '../hooks/useLocalStorage';




type HabitProviderProps = {
    children: ReactNode
}



export function HabitProvider({ children }: HabitProviderProps) {
    const [habits, setHabits] = useLocalStorage<Habit[]>("Habits",[])
  
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
    
    return <HabitContext value={{ habits, addHabit, toggleHabit, deleteHabit }}>{children}</HabitContext>
}

