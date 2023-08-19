import { useDispatch, useSelector } from "react-redux"
import { onCloseModalOpen, onOpenDateModal } from "../store";

export const useUiStore = () => {

    const dispatch = useDispatch();

    const { isDateModalOpen } = useSelector( state => state.ui );

    const openDateModal = () => {
        dispatch( onOpenDateModal() )
    }

    const closeDateModal = () => {
        dispatch( onCloseModalOpen() )
    }


    return {
        closeDateModal,
        isDateModalOpen,
        openDateModal,
    }
}