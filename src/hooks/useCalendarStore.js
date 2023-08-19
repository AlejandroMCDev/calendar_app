import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";
import { calendarApi } from "../api";
import { converEvents } from "../helpers";
import Swal from "sweetalert2";


export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { user } = useSelector( state => state.auth );
    const { events, activeEvent } = useSelector(state => state.calendar);

    const setActiveEvents = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    const startSavingEvent = async( calendarEvent ) => {

        try {
            if ( calendarEvent.id ) {
               //Actualizando
               await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
               dispatch( onUpdateEvent( {...calendarEvent }, user ) );
               return;
            } 
               //Creando
           const { data } = await calendarApi.post('/events/new', calendarEvent)
           dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }) );
            
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg,'error');
        }
         
    }

    const startDeletingEvent = async() => {

        try {
            if (activeEvent.id) {
                await calendarApi.delete(`/events/${activeEvent.id}`)
                Swal.fire('Exito al eliminar','Evento eliminado con exito','success');
                dispatch( onDeleteEvent() );
            }
            
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg,'error');
        }
    }

    const startLoadingEvents = async() => {
        try {
            const { data } = await calendarApi.get('/events')
            //console.log(data)
            const events = converEvents( data.eventos );
            dispatch( onLoadEvent(events) );
        } catch (error) {
            console.log(error)
        }
    }

    return {
        activeEvent,
        startDeletingEvent,
        events,
        hasEventSelected: activeEvent,
        setActiveEvents,
        startSavingEvent,
        startLoadingEvents
    }

}
