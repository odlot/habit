"use client";

import Habit from "./habit";
import DeleteModal from "./delete-modal";
import { useState } from 'react';

interface HabitData {
    id: number;
    name: string;
}

const habitsMap = [
  { id: 0, name: "Exercise" },
  { id: 1, name: "Read" },
  { id: 2, name: "Cook" }
]

export default function HabitTracker() {
    const [habits, setHabits] = useState<HabitData[]>([]);
    const [newHabitName, setNewHabitName] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [habitToDelete, setHabitToDelete] = useState<number | null>(null);

    const confirmDelete = (id: number) => {
        setHabitToDelete(id);
        setModalOpen(true);
    };

    const handleDelete = () => {
        if (habitToDelete !== null) {
            setHabits(habits.filter(habit => habit.id !== habitToDelete));
            setModalOpen(false);
            setHabitToDelete(null);
        }
    };

    function addHabit() {
        if (newHabitName.trim() === "") return;
        const newHabit: HabitData = { id: Date.now(), name: newHabitName };
        setHabits([...habits, newHabit]);
        setNewHabitName("");
    }

    return (
        <div>
            <h1 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '4rem' }}>
                Habit Tracker
            </h1>

            <div className="row-start-3 flex gap-6 flex-wrap items-center justify-center" style={{ marginBottom: '16px' }}>
                <input
                    type="text"
                    value={newHabitName}
                    onChange={(e) => setNewHabitName(e.target.value)}
                    placeholder="Enter habit name"
                    style={{ padding: '8px', marginRight: '8px', color: 'black' }}
                />
                <button onClick={addHabit} style={{
                    marginLeft: '16px',
                    padding: '4px 8px',
                    border: '1px solid #ddd',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    color: 'black'
                }}>
                    Add Habit
                </button>
            </div>

            <div className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
                {habits.map(habit => (
                    <div key={habit.id} style={{ marginBottom: '16px', border: '1px solid #ddd', padding: '16px' }}>
                        <Habit name={habit.name} />
                        <button
                            onClick={() => confirmDelete(habit.id)}
                            style={{
                                marginTop: '8px',
                                padding: '8px',
                                backgroundColor: 'red',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            Delete Habit
                        </button>
                    </div>
                ))}
            </div>
            <DeleteModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleDelete}
                message="Are you sure you want to delete this habit?"
            />
        </div>
    );
}