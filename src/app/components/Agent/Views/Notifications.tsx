"use client"
import BASE_URL from '@/app/config/api/api';
import React, { useState, useEffect } from 'react';

interface Ticket {
  id: number;
  launchTimestamp: string;
  subject: string;
  priority: string; 
  content: string;
  attachments: string;
  updatedAt: string;
  status: string; 
  category: string; 
}

const TicketNotifications: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const email = localStorage.getItem('email'); // Retrieve email from localStorage

      if (!email) {
        console.error('Email not found in localStorage');
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/ticket/ticketNotifications`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }), 
        });

        if (!response.ok) {
          console.error('Failed to fetch tickets:', response.statusText);
          return;
        }

        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div style={{ display: 'flex', overflowX: 'auto', padding: '16px', gap: '16px' }}>
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: '250px',
            backgroundColor: '#f9fafb',
            borderRadius: '8px',
            padding: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>{ticket.subject}</h3>
          <p style={{ fontSize: '14px', marginBottom: '8px' }}>
            Priority: <strong>{ticket.priority}</strong>
          </p>
          <p style={{ fontSize: '14px', marginBottom: '8px' }}>
            Category: <strong>{ticket.category}</strong>
          </p>
          <p style={{ fontSize: '14px', marginBottom: '8px' }}>
            Status:{' '}
            <span
              style={{
                color: ticket.status === 'OPEN' ? 'green' : ticket.status === 'IN_PROGRESS' ? 'orange' : 'gray',
              }}
            >
              {ticket.status}
            </span>
          </p>
          <p style={{ fontSize: '12px', marginBottom: '8px' }}>{ticket.content}</p>
          <span style={{ fontSize: '12px', color: '#9ca3af' }}>
            Updated: {new Date(ticket.updatedAt).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TicketNotifications;
