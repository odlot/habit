"use client";

import Habit from "./habit";
import DeleteModal from "./delete-modal";
import { useState, useEffect } from 'react';

interface HabitData {
    id: number;
    name: string;
}

export default function HabitTracker() {
    const [habits, setHabits] = useState<HabitData[]>([]);
    const [newHabitName, setNewHabitName] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [habitToDelete, setHabitToDelete] = useState<number | null>(null);

    // Updated URLs to use the Node.js backend
    async function addHabit() {
        if (newHabitName.trim() === "") return;
        
        const response = await fetch('http://localhost:3001/habits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newHabitName })
        });
        
        const newHabit = await response.json();
        setHabits([...habits, newHabit]);
        setNewHabitName("");
    }

    async function handleDelete() {
        if (habitToDelete !== null) {
            await fetch(`http://localhost:3001/habits/${habitToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setHabits(habits.filter(habit => habit.id !== habitToDelete));
            setModalOpen(false);
            setHabitToDelete(null);
        }
    }

    // Load habits from the database on component mount
    useEffect(() => {
        async function loadHabits() {
            const response = await fetch('http://localhost:3001/habits');
            const data = await response.json();
            setHabits(data);
        }
        loadHabits();
    }, []);

    const confirmDelete = (id: number) => {
        setHabitToDelete(id);
        setModalOpen(true);
    };

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