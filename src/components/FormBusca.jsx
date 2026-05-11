import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

function FormMarcas() {
    const {register, handleSubmit} = useForm();
    const [marcas, setMarcas] = useState([]);

    useEffect(() => {
        fetch("https://parallelum.com.br/fipe/api/v1/carros/marcas")
        .then(resp => resp.json())
        .then((marcasObtidas) => { setMarcas(marcasObtidas); })
        .catch(err => console.error("Erro ao buscar marcas", err))
    }, []);

    function mostrarDados(data) {
        console.log(data);
    }

    return (
        <div>
            <h2>Consulta FIPE</h2>
            <form onSubmit={handleSubmit(mostrarDados)}>
                <select {...register("marca")}>
                    <option value="">Selecione a marca do veículo</option>
                    {marcas.map((marca) => (
                        <option key={marca.codigo} value={marca.codigo}>
                            {marca.nome}
                        </option>
                    ))} 
                </select>

                <button type="submit">Buscar</button>
            </form>
        </div>
    );
}

export default FormMarcas;