import { useContext } from "react";
import { FipeContext } from "../contexts/FipeContext";

function Resultado() {
    const {state} = useContext(FipeContext);

    if(!state.resultado) return null;

    return(
        <div>
            <h3>Resultados Tabela FIPE</h3>
            <p>Marca: {state.resultado.Marca}</p>
            <p>Modelo: {state.resultado.Modelo}</p>
            <p>Ano: {state.resultado.AnoModelo}</p>
            <p>Combustível: {state.resultado.Combustivel}</p>
            <p>Mês de Referência: {state.resultado.MesReferencia}</p>
            <p>Valor: {state.resultado.Valor}</p>
        </div>
    )
}

export default Resultado;