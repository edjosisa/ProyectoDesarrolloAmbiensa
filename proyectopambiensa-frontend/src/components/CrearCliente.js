import React,{useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'

const endpoint='http://localhost:8000/api/cliente'
const CrearCliente = () => {

    const [descripcion, setDescripcion] = useState('')
    const [usuario, setUsuario] = useState('')
    const [estado, setEstado] = useState('')
    const navigate = useNavigate()

    const store = async (e) => {
        e.preventDefault()
        await axios.post(endpoint, {descripcion: descripcion, usuario: usuario, estado: estado})
        navigate('/')
    }

  return (
    <div>
        <h3>Crear Usuario</h3>
        <form onSubmit={store}>
            <div className='mb-3'>
                <label className='form-label'>Descripción</label>
                <input 
                    value={descripcion}
                    onChange={ (e)=> setDescripcion(e.target.value)}
                    type='text'
                    className='form-control'
                    required
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Usuario</label>
                <input 
                    value={usuario}
                    onChange={ (e)=> setUsuario(e.target.value)}
                    type='text'
                    className='form-control'
                    required
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'>estado</label>
                <input 
                    value={estado}
                    onChange={ (e)=> setEstado(e.target.value)}
                    type='text'
                    className='form-control'
                    required
                />
            </div>
            <button type='submit' className='btn btn-primary'>Guardar</button>
            <Link  to='/' className='btn btn-danger'>Cancelar</Link>
        </form>
    </div>
  )
}

export default CrearCliente