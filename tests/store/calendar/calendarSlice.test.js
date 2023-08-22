import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvent, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice"
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates";

describe('Pruebas en calendarSlice', () => {
    test('debe de regresar el estado por defecto', () => {
        const state = calendarSlice.getInitialState();
        expect( state ).toEqual( initialState );
    });

    test('onSetActiveEvent debe activar el evento ', () => {
      const state = calendarSlice.reducer( calendarWithEventsState, onSetActiveEvent(events[0]) )
      expect( state.activeEvent ).toEqual(events[0])
    })

    test('onAddNewEvent debe de agregar el evento', () => {
        const newEvent = {
            id: '3',
            start: new Date('2023-10-20 13:00:00'),
            end: new Date('2023-10-20 15:00:00'),
            title: 'Esto es un test3',
            notes: 'Notas del test3',
        }

        const state = calendarSlice.reducer( calendarWithEventsState, onAddNewEvent( newEvent ) )
        expect(state.events).toContainEqual(newEvent)
    })

    test('onUpdateEvent debe de actualizar el evento', () => {
        
        const newEvent = {
            id: '1',
            start: new Date('2023-10-20 13:00:00'),
            end: new Date('2023-10-20 15:00:00'),
            title: 'Esto es un test actualizado',
            notes: 'Notas del test actualizado',
        }

        const state = calendarSlice.reducer( calendarWithEventsState, onUpdateEvent( newEvent ) )
        expect(state.events[0]).toEqual(newEvent)

    })

    test('onDeleteEvent debe de eliminar el evento', () => {
        
        const state = calendarSlice.reducer( calendarWithActiveEventState, onDeleteEvent() )
        expect( state.activeEvent ).toBe(null)
        expect( state.events.length ).toBe(1)
    })

    test('onLoadEvent debe de ', () => {
    
        const state = calendarSlice.reducer( calendarWithEventsState, onLoadEvent( events ) )
        expect(state.events).toEqual(events)
        expect(state.isLoadingEvents).toBe(false)
    })
    

    test('onLogoutCalendar debe de limpiar el estado ', () => {
        const state = calendarSlice.reducer( calendarWithActiveEventState, onLogoutCalendar() )
        expect( state ).toEqual( initialState )
    })
})
