import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

function FormBuscar() {
    const {register, handleSubmit, watch} = useForm();
    const [marcas, setMarcas] = useState([]);
    const marcaSelect = watch("marca");
    const [modelos, setModelos] = useState([]);
    const [anos, setAnos] = useState([]);
    const [resultado, setResultado] = useState(null)

    useEffect(() => {
        fetch("https://parallelum.com.br/fipe/api/v1/carros/marcas")
        .then(resp => resp.json())
        .then((marcasObtidas) => { setMarcas(marcasObtidas); })
        .catch(err => console.error("Erro ao buscar marcas", err))
    }, []);

    function buscarModelos(event) {
        const codigoMarca = event.target.value;

        fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${codigoMarca}/modelos`)
        .then(resp => resp.json())
        .then((modelosObtidos) => { setModelos(modelosObtidos.modelos)})
    }

    function buscarAnos(event) {
        const codigoModelo = event.target.value;
        const codigoMarca = marcaSelect;

        fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${codigoMarca}/modelos/${codigoModelo}/anos`)
        .then(resp => resp.json())
        .then((anosObtidos) => { setAnos(anosObtidos)})
    }

    function mostrarDados(formData) {

        fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${formData.marca}/modelos/${formData.modelo}/anos/${formData.ano}`)
        .then(resp => resp.json())
        .then((valoresObtidos) => {setResultado(valoresObtidos)})
    }

    return (
        <div>
            <h2>Consulta FIPE</h2>
            <form onSubmit={handleSubmit(mostrarDados)}>
                <select {...register("marca", { onChange: (e) => {buscarModelos(e)} })}>
                    <option value="">Selecione a marca do veículo</option>
                    {marcas.map((marca) => (
                        <option key={marca.codigo} value={marca.codigo}>
                            {marca.nome}
                        </option>
                    ))} 
                </select>

                <select {...register("modelo", { onChange: (e) => {buscarAnos(e)} })}> 
                    <option value="">Selecione o modelo</option>
                    {modelos.map((modelo) => (
                        <option key={modelo.codigo} value={modelo.codigo}>
                            {modelo.nome}
                        </option>
                    ))}
                </select>

                <select {...register("ano")}>
                    <option value="">Selecione o Ano</option>
                    {anos.map((ano) => (
                        <option key={ano.codigo} value={ano.codigo}>
                            {ano.nome}
                        </option>
                    ))}
                </select>

                <button type="submit">Buscar</button>
            </form>

            {resultado && (
                <div>
                    <h3>Resultados Tabela FIPE</h3>
                    <p>Marca: {resultado.Marca}</p>
                    <p>Modelo: {resultado.Modelo}</p>
                    <p>Ano: {resultado.AnoModelo}</p>
                    <p>Combustível: {resultado.Combustivel}</p>
                    <p>Mês de Referência: {resultado.MesReferencia}</p>
                    <p>Valor: {resultado.Valor}</p>
                </div>
            )}

        </div>
    );
}

export default FormBuscar;