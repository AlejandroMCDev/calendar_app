import { authSlice, clearErrorMessage, onLogin, onLogout } from "../../../src/store/auth/authSlice"
import { authenticatedState, initialState } from "../../fixtures/authStates"
import { testUserCredentials } from "../../fixtures/testUser";

describe('Pruebas en authSlice', () => {
    test('debe de regresar el estado inicial', () => {
        expect( authSlice.getInitialState() ).toEqual( initialState );   
    })

    test('debe de realizar un login', () => {

        const state = authSlice.reducer( initialState, onLogin( testUserCredentials ) );
        expect( state ).toEqual({
            status: 'authenticated',
            user: testUserCredentials,
            errorMessage: undefined
        })
      
    })

    test('debe de realizar un logout', () => {

        const state = authSlice.reducer( authenticatedState, onLogout() );
        expect( state ).toEqual({
            status: 'not-authenticated',
            user : {},
            errorMessage : undefined
        })
    })

    test('debe de realizar un logout con un mensaje de error', () => {

        const msgError = 'Algo salio mal'
        const state = authSlice.reducer( authenticatedState, onLogout({msgError}) );
        expect( state ).toEqual({
            status: 'not-authenticated',
            user : {},
            errorMessage : {msgError}
        })
    })

    test('debe de realizar una limpieza del mensaje de error', () => {
        const msgError = 'Algo salio mal'
        let state = authSlice.reducer( authenticatedState, onLogout({msgError}) );
        state = authSlice.reducer( authenticatedState, clearErrorMessage() );
        expect( state.errorMessage ).toBeUndefined()
    })
    
    
    
})
