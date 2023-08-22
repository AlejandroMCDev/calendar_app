import { Provider } from "react-redux"
import { useAuthStore } from "../../src/hooks"
import { authSlice } from "../../src/store"
import { compose, configureStore } from "@reduxjs/toolkit"
import { act, renderHook, waitFor } from "@testing-library/react"
import { initialState, notAuthenticatedState } from "../fixtures/authStates"
import { testUserCredentials } from "../fixtures/testUser"
import { calendarApi } from "../../src/api"

const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: { ...initialState }
        }
    })
}

describe('Pruebas en el useAuthStore', () => {

    beforeEach(
        () => localStorage.clear()
    )

    test('debe de regresar los valores por defecto ', () => {
        const mockStore = getMockStore(initialState)

        const { result } = renderHook( () => useAuthStore(),{
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        expect(result.current).toEqual({
            status: 'checking',
            errorMessage: undefined,
            user: {},      
            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            checkAuthToken: expect.any(Function),
            startLogout: expect.any(Function)
        })
    })

    test('startLogin debe de realizar el login correctamente ', async() => {

        const mockStore = getMockStore(notAuthenticatedState)

        const { result } = renderHook( () => useAuthStore(),{
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        await act(async() => {
            await result.current.startLogin( testUserCredentials )
        })

        const { errorMessage, status, user } = result.current
        expect({errorMessage,status,user}).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: expect.any(String) }
        })

        expect( localStorage.getItem('token') ).toEqual(expect.any(String))
        expect( localStorage.getItem('token-init-date') ).toEqual(expect.any(String))
    })

    test('startLogin debe de fallar la autenticacion ', async() => {
        
        const mockStore = getMockStore(notAuthenticatedState)

        const { result } = renderHook( () => useAuthStore(),{
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        await act(async() => {
            await result.current.startLogin( {email: 'noasoasa', password: 'asdjsajdsa'} )
        })

        const { errorMessage, status, user } = result.current
        expect({errorMessage,status,user}).toEqual({
            status: 'not-authenticated',
            errorMessage: 'Credenciales incorrectas',
            user: {}
        })
        expect(localStorage.getItem('token')).toEqual(null)

        await waitFor(
            () => expect( result.current.errorMessage ).toBe(undefined)
        )
    })

    test('startRegister debe de crear un usuario ', async() => {

        const newUser = {email: 'algo@google.com', password: '123456', name: 'Test User 2'}
        const mockStore = getMockStore(notAuthenticatedState)

        const { result } = renderHook( () => useAuthStore(),{
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        const spy = jest.spyOn( calendarApi, 'post' ).mockReturnValue({
            data: {
                ok: true,
                uid: "Algun id",
                name: "Test User 2",
                token: "Algun token"
            }
        });

        await act(async() => {
            await result.current.startRegister( newUser )
        });

        const { errorMessage, status, user } = result.current
        expect( {errorMessage, status, user }).toEqual({
            status: 'authenticated',
            errorMessage: undefined,
            user: { name: 'Test User 2', uid: expect.any(String) }
        })
        spy.mockRestore();
    })

    test('startRegister debe fallar la creacion', async() => {
    
        const mockStore = getMockStore(notAuthenticatedState)

        const { result } = renderHook( () => useAuthStore(),{
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        await act(async() => {
            await result.current.startRegister( testUserCredentials )
        });

        const { user, errorMessage, status } = result.current

        expect({user,errorMessage,status}).toEqual({
            status: 'not-authenticated',
            errorMessage: 'Un usuario existe con ese correo',      
            user: {}
        })
    })

    test('checkAuthToken debe de fallar si no hay token', async() => {
        const mockStore = getMockStore(initialState)

        const { result } = renderHook( () => useAuthStore(),{
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        await act(async() => {
            await result.current.checkAuthToken()
        });

        const { user, errorMessage, status } = result.current
        expect({ user, errorMessage, status }).toEqual({
            status: 'not-authenticated',
            errorMessage: undefined,
            user: {},
        })
    })

    test('checkAuthToken debe salir bien', async() => {
        
        const { data } = await calendarApi.post('/auth',testUserCredentials ) 
        localStorage.setItem('token',data.token)
        const mockStore = getMockStore(initialState)

        const { result } = renderHook( () => useAuthStore(),{
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        await act(async() => {
            await result.current.checkAuthToken()
        });

        expect(typeof localStorage.getItem('token')).toBe("string")
        expect(typeof localStorage.getItem('token-init-date')).toBe("string")
    })
    
    
    
    
    
    
})
