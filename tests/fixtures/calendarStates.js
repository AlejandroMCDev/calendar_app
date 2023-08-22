export const events = [
    {
        id: '1',
        start: new Date('2023-08-20 13:00:00'),
        end: new Date('2023-08-20 15:00:00'),
        title: 'Esto es un test',
        notes: 'Notas del test',
    },
    {
        id: '2',
        start: new Date('2023-09-20 13:00:00'),
        end: new Date('2023-09-20 15:00:00'),
        title: 'Esto es un test2',
        notes: 'Notas del test2',
    }
]

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
}

export const calendarWithEventsState = {
    isLoadingEvents: true,
    events: [ ...events ],
    activeEvent: null
}

export const calendarWithActiveEventState = {
    isLoadingEvents: true,
    events: [ ...events ],
    activeEvent: { ...events[0] }
}