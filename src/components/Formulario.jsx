import { useState,useEffect } from "react";
import Alerta from './Alerta';
import usePacientes  from '../hooks/usePacientes'; 

const Formulario = () => {
    const [nombre,setNombre] = useState('');
    const [propietario,setPropietario] = useState('');
    const [email,setEmail] = useState('');
    const [fecha,setFecha] = useState(Date.now());
    const [sintomas,setSintomas] = useState('');
    const [id, setId] = useState(null);

    const [alerta,setAlerta] = useState({});

    const {paciente, guardarPaciente} = usePacientes();

    useEffect(() => {
        if(paciente?.nombre){
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
            setId(paciente._id);
        }
    },[paciente]);

    const handleSubmit = (e) => {
        e.preventDefault();
       
        //Validar el formulario
        if([nombre,email,propietario,fecha,sintomas].includes('')){
            console.log(2);
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });
            return;
        }

        guardarPaciente({nombre,propietario,email,fecha,sintomas,id});
        setAlerta({
            msg: 'Guardado Correctamente'
        });
        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');
        setId();
    };

    const { msg } = alerta;
  return (
    <>
    <h2 className='font-black text-3xl text-center'>Administrador de Pacientes</h2>
    <p className="text-lg text-center mb-10">
        Añade a tus pacientes y {''}
        <span className="text-indigo-600 font-bold"> Administralos</span>
    </p>
    <form onSubmit={handleSubmit}
        className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md"
    >
        <div className="mb-5">
            <label 
            htmlFor="nombre"
            className="text-gray-700 uppercase font-bold"
            > Nombre Mascota</label> 
            <input
            id="nombre"
            type="text"
            placeholder="Nombre de tu mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            >
            </input>
        </div>
        <div className="mb-5">
            <label 
            htmlFor="propietario"
            className="text-gray-700 uppercase font-bold"
            > Nombre Propietario</label> 
            <input
            id="propietario"
            type="text"
            placeholder="Nombre del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
            value={propietario}
            onChange={e => setPropietario(e.target.value)}
            >
            </input>
        </div>
        <div className="mb-5">
            <label 
            htmlFor="email"
            className="text-gray-700 uppercase font-bold"
            > Email Propietario</label> 
            <input
            id="email"
            type="email"
            placeholder="Email del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
            value={email}
            onChange={e => setEmail(e.target.value)}
            >
            </input>
        </div>
        <div className="mb-5">
            <label 
            htmlFor="fecha"
            className="text-gray-700 uppercase font-bold"
            > Fecha Alta</label> 
            <input
            id="fecha"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
            value={fecha}
            onChange={e => setFecha(e.target.value)}
            >
            </input>
        </div>
        <div className="mb-5">
            <label 
            htmlFor="sintomas"
            className="text-gray-700 uppercase font-bold"
            > Sintomas</label> 
            <textarea
            id="sintomas"
            placeholder="Describe los síntomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
            value={sintomas}
            onChange={e => setSintomas(e.target.value)}
            />
        </div>

        <input 
            type="submit"
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor:pointer transition-colors"
            value={id ? "Guardar Cambios" :"Agregar Paciente"}

        />
    </form>
    
    {msg && <Alerta 
        alerta={alerta}
    />}

    </>
  )
}

export default Formulario;
