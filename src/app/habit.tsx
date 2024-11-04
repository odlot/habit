import Calendar from "./calendar.tsx"

export default function Habit({ name }) {
    return(
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>{name}</h1>
            {/* Separating line */}
            <div style={{
                width: '80%', // Set the width to control the line length
                height: '2px',
                backgroundColor: '#ddd',
                margin: '0 auto 16px auto' // Center the line and add bottom margin
            }} />
            <Calendar name={name}/>
        </div>
    );
}