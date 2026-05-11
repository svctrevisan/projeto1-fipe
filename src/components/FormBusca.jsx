import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

function FormBuscar() {
    const {register, handleSubmit} = useForm();
    const [marcas, setMarcas] = useState([]);
    const [modelos, setModelos] = useState([]);

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

    function mostrarDados(data) {
        console.log(data);
    }

    return (
        <div>
            <h2>Consulta FIPE</h2>
            <form onSubmit={handleSubmit(mostrarDados)}>
                <select {...register("marca")} onChange={buscarModelos}>
                    <option value="">Selecione a marca do veículo</option>
                    {marcas.map((marca) => (
                        <option key={marca.codigo} value={marca.codigo}>
                            {marca.nome}
                        </option>
                    ))} 
                </select>

                <select {...register("modelo")}>
                    <option value="">Selecione o modelo</option>
                    {modelos.map((modelo) => (
                        <option key={modelo.codigo} value={modelo.codigo}>
                            {modelo.nome}
                        </option>
                    ))}
                </select>

                <button type="submit">Buscar</button>
            </form>
        </div>
    );
}

export default FormBuscar;