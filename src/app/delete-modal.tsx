// components/Modal.tsx
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
}

export default function Modal({ isOpen, onClose, onConfirm, message }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <div style={{
                background: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center',
                color: 'black' // Ensures text color is always black
            }}>
                <p style={{ color: 'black' }}>{message}</p> {/* Explicitly setting text color to black */}
                <button
                    onClick={onConfirm}
                    style={{
                        marginRight: '10px',
                        padding: '8px 16px',
                        backgroundColor: '#4CAF50', // Green button
                        color: 'black', // Black text color
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '4px'
                    }}
                >
                    Confirm
                </button>
                <button
                    onClick={onClose}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#f44336', // Red button
                        color: 'black', // Black text color
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '4px'
                    }}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
