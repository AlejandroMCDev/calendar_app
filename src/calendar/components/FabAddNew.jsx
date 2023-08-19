import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks"


export const FabAddNew = () => {

    const { openDateModal } = useUiStore();
    const { setActiveEvents } = useCalendarStore();

    const handleClickNew = () => {
        setActiveEvents({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours( new Date(),2 ),
            bgColor: '#fafafa',
            user: {
                name: 'Pepe',
                id: '123'
            }
        });
        openDateModal();
    }

    return (
        <button
            className="btn btn-primary fab"
            onClick={ handleClickNew }
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
