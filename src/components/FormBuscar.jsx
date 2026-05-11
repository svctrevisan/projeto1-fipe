import { useForm } from "react-hook-form";
import { useEffect, useContext, useReducer } from "react";
import { FipeContext } from "../contexts/FipeContext";

function FormBuscar() {
    const {register, handleSubmit, watch} = useForm();
    const {state, dispatch} = useContext(FipeContext);

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
        </div>
    );
}

export default FormBuscar;