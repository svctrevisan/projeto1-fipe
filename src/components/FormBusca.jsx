import { useForm } from "react-hook-form";
import { useEffect, useState, useReducer } from "react";

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

function FormBuscar() {
    const {register, handleSubmit, watch} = useForm();
    const [state, dispatch] = useReducer(reducer, estadoZero);

    useEffect(() => {
        fetch("https://parallelum.com.br/fipe/api/v1/carros/marcas")
        .then(resp => resp.json())
        .then((marcasObtidas) => { 
            dispatch({type:"SET_MARCAS", payload:marcasObtidas})
        })
        .catch(err => console.error("Erro ao buscar marcas", err))
    }, []);

    function buscarModelos(event) {
        const codigoMarca = event.target.value;

        fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${codigoMarca}/modelos`)
        .then(resp => resp.json())
        .then((modelosObtidos) => { 
            dispatch({type: "SET_MODELOS", payload: modelosObtidos.modelos})
        })
    }

    function buscarAnos(event) {
        const codigoModelo = event.target.value;
        const codigoMarca = watch("marca");

        fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${codigoMarca}/modelos/${codigoModelo}/anos`)
        .then(resp => resp.json())
        .then((anosObtidos) => {
            dispatch({type:"SET_ANOS", payload: anosObtidos})
        })
    }

    function mostrarDados(formData) {

        fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${formData.marca}/modelos/${formData.modelo}/anos/${formData.ano}`)
        .then(resp => resp.json())
        .then((valoresObtidos) => {
            dispatch({type:"SET_RESULTADO", payload:valoresObtidos})
        })
    }

    return (
        <div>
            <h2>Consulta FIPE</h2>
            <form onSubmit={handleSubmit(mostrarDados)}>
                <select {...register("marca", { onChange: (e) => {buscarModelos(e)} })}>
                    <option value="">Selecione a marca do veículo</option>
                    {state.marcas.map((marca) => (
                        <option key={marca.codigo} value={marca.codigo}>
                            {marca.nome}
                        </option>
                    ))} 
                </select>

                <select {...register("modelo", { onChange: (e) => {buscarAnos(e)} })}> 
                    <option value="">Selecione o modelo</option>
                    {state.modelos.map((modelo) => (
                        <option key={modelo.codigo} value={modelo.codigo}>
                            {modelo.nome}
                        </option>
                    ))}
                </select>

                <select {...register("ano")}>
                    <option value="">Selecione o Ano</option>
                    {state.anos.map((ano) => (
                        <option key={ano.codigo} value={ano.codigo}>
                            {ano.nome}
                        </option>
                    ))}
                </select>

                <button type="submit">Buscar</button>
            </form>

            {state.resultado && (
                <div>
                    <h3>Resultados Tabela FIPE</h3>
                    <p>Marca: {state.resultado.Marca}</p>
                    <p>Modelo: {state.resultado.Modelo}</p>
                    <p>Ano: {state.resultado.AnoModelo}</p>
                    <p>Combustível: {state.resultado.Combustivel}</p>
                    <p>Mês de Referência: {state.resultado.MesReferencia}</p>
                    <p>Valor: {state.resultado.Valor}</p>
                </div>
            )}

        </div>
    );
}

export default FormBuscar;