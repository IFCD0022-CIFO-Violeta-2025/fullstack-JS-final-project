import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function EventsCalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events');
        const data = await res.json();

        // Перетворюємо у формат FullCalendar
        const formatted = data.map(ev => ({
          id: ev.idEvent,
          title: ev.title,
          start: ev.starttime,
          end: ev.endtime,
        }));

        setEvents(formatted);
      } catch (err) {
        console.error('Помилка завантаження подій:', err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Календар подій</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        locale="es" // español localización
        height="auto"
      />
    </div>
  );
}

