import {useState,useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';



const NuevoPassword = () => {
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const [tokenValido, setTokenValido] = useState(false);
    const [passwordModificado, setPasswordModificado] = useState(false);

    const params = useParams();
    const {token} = params;

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        if(password !== repetirPassword) {
            setAlerta({
                msg: 'Los Password no son iguales',
                error: true
            });
            return;
        }

        if(password.length < 6) {
            setAlerta({msg: 'El password es muy corto, agrega minimo 6 caracteres', error: true});
            return;
        }

        try {
           const url = `/veterinarios/olvide-password/${token}`;
           const {data} = await clienteAxios.post( url,{password});
           setAlerta({msg: data.msg});
           setPasswordModificado(true);
        } catch (error) {
           setAlerta({
                msg: error.response.data.msg,
                error: true
           });
        }
    };
    useEffect(() => {
        const comprobarToken = async () => {
            try {
               await clienteAxios(`/veterinarios/olvide-password/${token}`)
               setAlerta({
                msg: 'Coloca tu Nuevo Password'
               });
               setTokenValido(true);
            } catch (error) {
                setAlerta({
                    msg: 'Hubo un error con el enlace',
                    error: true
                }) 
            }
        }
        comprobarToken();
    },[]);

    const { msg } = alerta;
  return (
    <> 
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">
                Recupera tu Password y no Pierdas Acesso a {" "}
                <span className="text-black"> tus Pacientes</span>
            </h1>
        </div>

        <div className='mt-20  md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {msg && <Alerta 
          alerta={alerta}
        />}

        {tokenValido && (
            <>
                <form 
                onSubmit={handleSubmit}
                >
                    <div className="my-5">
                        <label className="uppercase text-gray-600 text-xl font-bold">
                            Password
                        </label>
                        <input
                            type="password" 
                            placeholder="Tu Password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 text-xl font-bold">
                            Comfirmar Password
                        </label>
                        <input
                            type="password" 
                            placeholder="Confirmar Password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={repetirPassword}
                            onChange={e => setRepetirPassword(e.target.value)}
                        />
                    </div>
                   <input 
                    type="submit"
                    value="Cambiar Password"
                    className="bg-indigo-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                   /> 
                </form>
            </>
            )}

            {passwordModificado && 
                <Link 
                className='block text-center my-5 text-gray-500'
                 to="/">Inicia Sesión
                </Link>    
            }
        </div>
    </>
  )
}


export default NuevoPassword
