import { createContext, useReducer } from "react";

export const FipeContext = createContext();

const estadoZero = {
    marcas: [],
    modelos: [],
    anos: [],
    resultado: null,
};

function reducer(state,action) {
    switch (action.type) {
        case "SET_MARCAS":
            return {...state, marcas: action.payload };
        case "SET_MODELOS":
            return {...state, modelos: action.payload};
        case "SET_ANOS":
            return {...state, anos: action.payload};
        case "SET_RESULTADO":
            return {...state, resultado: action.payload};
        case "RESET":
            return {...state, modelos: [], anos: [], resultado: null};
        default:
            return state;
    }
}

export function FipeProvider({children}) {
    const [state, dispatch] = useReducer(reducer, estadoZero)

    return (
        <FipeContext.Provider value={{state, dispatch}}>
            {children}
        </FipeContext.Provider>
    )
}