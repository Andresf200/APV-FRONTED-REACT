import {useState, } from  'react'
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import useAuth from '../hooks/useAuth';

const CambiarPassword = () => {
  const {guardarPassword} = useAuth();
  const [alerta,setAlerta] = useState({});
  const [password, setPassword] = useState({
    pwd_actual:'',
    pwd_nuevo:'',
    rep_pwd_nuevo:'',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(Object.values(password).some(campo => campo === '')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      });
      return;
    }

    if(password.pwd_nuevo.length < 6){
      setAlerta({
        msg: 'El password debe tener minimo 6 caracteres',
        error: true
      });
      return;
    }

    if(password.rep_pwd_nuevo !== password.pwd_nuevo){
      setAlerta({
        msg: 'la Constraseña nueva y repetir contraseña deben ser iguales',
        error: true
      });
      return;
    }

    const response = await guardarPassword(password);
    setAlerta(response);
  };

  const {msg} = alerta;
  return (
    <>
        <AdminNav />
    
        <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>

        <p className="text-xl mt-5  mb-10 text-center">Modifica tu {''} <span className="text-indigo-600 font-bold">Password aquí</span></p>

        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                {msg && 
                <Alerta  
                    alerta={alerta}
                />}
                <form onSubmit={handleSubmit}>
                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Password Actual:</label>
                        <input
                        type="password"
                        className="border bg-gray-50 w-full  p-2 mt-5 rounded-lg"
                        name='pwd_actual'
                        placeholder='Escribe tu password actual'
                        onChange={e => setPassword({
                          ...password,
                          [e.target.name]: e.target.value
                        })}
                        ></input>
                    </div>
                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Password Nuevo:</label>
                        <input
                        type="password"
                        className="border bg-gray-50 w-full  p-2 mt-5 rounded-lg"
                        name='pwd_nuevo'
                        placeholder='Escribe tu nuevo password'
                        onChange={e => setPassword({
                          ...password,
                          [e.target.name]: e.target.value
                        })}
                        ></input>
                    </div>
                        <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Repetir Password Nuevo:</label>
                        <input
                        type="password"
                        className="border bg-gray-50 w-full  p-2 mt-5 rounded-lg"
                        name='rep_pwd_nuevo'
                        placeholder='Repite tu nuevo password'
                        onChange={e => setPassword({
                          ...password,
                          [e.target.name]: e.target.value
                        })}
                        ></input>
                    </div>
                    <input 
                    type="submit"
                    value="Guardar Cambios"
                    className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
                    />
                </form>
            </div>
        </div>
    </>
  )
}

export default CambiarPassword