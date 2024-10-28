// components/CalendarComponent.tsx
import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { addCalendarEvent } from '@/redux/slices/calenderSlice';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from '@mui/material';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
    getDay,
    locales,
});

const CalendarComponent= () => {
    const events = useSelector((state) => state.calendar.events);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [eventType, setEventType] = useState('event');
    const [title, setTitle] = useState('');

    const handleSelectSlot = (slotInfo) => {
        setSelectedDate(slotInfo.start);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTitle('');
    };

    const handleSave = () => {
        if (selectedDate) {
            dispatch(
                addCalendarEvent({
                    id: new Date().getTime(), // unique id for each event
                    title,
                    start: selectedDate,
                    end: selectedDate,
                    type: eventType,
                })
            );
        }
        handleClose();
    };

    const eventStyleGetter = (event) => {
        let backgroundColor = event.type === 'event' ? '#3174ad' : '#ff9800';
        return {
            style: {
                backgroundColor,
            },
        };
    };

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                selectable
                style={{ height: 500 }}
                onSelectSlot={handleSelectSlot}
                eventPropGetter={eventStyleGetter}
            />

            {/* Dialog for Add Event/Reminder */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add {eventType === 'event' ? 'Event' : 'Reminder'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Type"
                        select
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        fullWidth
                        margin="normal"
                    >
                        <MenuItem value="event">Event</MenuItem>
                        <MenuItem value="reminder">Reminder</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CalendarComponent;
