// components/Calendar.tsx
"use client";

import { useState, useEffect } from 'react';
import { format, eachDayOfInterval, startOfMonth, endOfMonth, addMonths, subMonths, isSameDay, isBefore } from 'date-fns';

export default function Calendar({ habitName }: { habitName: string }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [completedDaysByMonth, setCompletedDaysByMonth] = useState<{ [key: string]: Date[] }>({});
    const [showCelebration, setShowCelebration] = useState(false);

    // Format current month for use as a key
    const currentMonthKey = format(currentMonth, 'yyyy-MM');

    // Get completed days for the current month or set to an empty array
    const completedDays = completedDaysByMonth[currentMonthKey] || [];

    // Get the days in the current month
    const daysInMonth = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth),
    });

    // Toggle a day's completion status for the current month
    function toggleDay(day: Date) {
        setCompletedDaysByMonth(prev => {
            const monthDays = prev[currentMonthKey] || [];
            const isCompleted = monthDays.some(d => isSameDay(d, day));

            const updatedMonthDays = isCompleted
                ? monthDays.filter(d => !isSameDay(d, day)) // Remove if already completed
                : [...monthDays, day]; // Add if not completed

            return {
                ...prev,
                [currentMonthKey]: updatedMonthDays
            };
        });
    }

    // Handlers for navigating months
    function goToPreviousMonth() {
        setCurrentMonth(subMonths(currentMonth, 1));
    }

    function goToNextMonth() {
        setCurrentMonth(addMonths(currentMonth, 1));
    }

    // Handler to reset to the current month
    function goToToday() {
        setCurrentMonth(new Date());
    }

    // Check if all days are completed for the current month
    useEffect(() => {
        if (completedDays.length === daysInMonth.length) {
            setShowCelebration(true);
        } else {
            setShowCelebration(false);
        }
    }, [completedDays, daysInMonth.length]);

    return (
        <div style={{ position: 'relative', paddingBottom: '0px' }}>
            {/* Month navigation, current month display, and "Today" button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
                <button onClick={goToPreviousMonth} style={{
                    padding: '4px 8px',
                    border: '1px solid #ddd',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    color: 'black'
                }}>
                    &lt;
                </button>
                
                {/* Fixed-width container for the month display */}
                <div style={{ minWidth: '140px', textAlign: 'center', fontWeight: 'bold' }}>
                    {format(currentMonth, 'MMMM yyyy')}
                </div>
                
                <button onClick={goToNextMonth} style={{
                    padding: '4px 8px',
                    border: '1px solid #ddd',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    color: 'black'
                }}>
                    &gt;
                </button>

                {/* "Today" button */}
                <button onClick={goToToday} style={{
                    marginLeft: '16px',
                    padding: '4px 8px',
                    border: '1px solid #ddd',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    color: 'black'
                }}>
                    Today
                </button>
            </div>

            {/* Counter for selected/completed days */}
            <p style={{ textAlign: 'left' }}>
                Completed days this month: {completedDays.length} of {daysInMonth.length}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
                {daysInMonth.map((day, index) => {
                    const isCompleted = completedDays.some(d => isSameDay(d, day));
                    const isPast = isBefore(day, new Date());

                    return (
                        <div
                            key={index}
                            style={{
                                padding: '10px',
                                border: '1px solid #ddd',
                                textAlign: 'center',
                                cursor: 'pointer',
                                backgroundColor: isCompleted
                                    ? '#4caf50' // Completed days have a green background
                                    : isPast
                                    ? '#d3d3d3' // Past uncompleted days are gray
                                    : '#fff', // Future or present days are white
                                color: isCompleted || isPast ? '#fff' : '#000', // White text for completed/past, black for others
                            }}
                            onClick={() => toggleDay(day)}
                        >
                            {format(day, 'd')}
                        </div>
                    );
                })}
                {/* Celebration Badge, positioned absolutely in the bottom-right corner */}
            {showCelebration && (
                <div style={{
                    gridColumn: 'span 3',
                    justifySelf: 'right',
                    bottom: '10px',
                    right: '10px',
                    padding: '10px',
                    backgroundColor: '#4caf50',
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                    width: 'fit-content'
                }}>
                    🎉 Completed!
                </div>
            )}
            </div>
        </div>
    );
}
