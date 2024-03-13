import axios from "axios";
import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Link} from 'react-router-dom'

const endpoint = 'http://localhost:8000/api/cliente/'

const EditarCliente = () => {
    const [descripcion, setDescripcion] = useState('')
    const [usuario, setUsuario] = useState('')
    const [estado, setEstado] = useState('')
    const navigate = useNavigate()
    const {id} = useParams()

    const update = async (e) => {
        e.preventDefault()
        await axios.put(`${endpoint}${id}`, {
            descripcion: descripcion,
            usuario: usuario,
            estado: estado
        })
        navigate('/')
    }
    
    useEffect( () =>{
        const getProductById = async () => {
            const response = await axios.get(`${endpoint}${id}`)
            console.log(response.data.descripcion)
            setDescripcion(response.data.descripcion || '');
            setUsuario(response.data.usuario || '');
            setEstado(response.data.estado || '');
        }
        getProductById()
        
    }, [id] )

    return (
        <div>
        <h3>Editar Cliente</h3>
        <form onSubmit={update}>
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
                <label className='form-label'>Estado</label>
                <input 
                    value={estado}
                    onChange={ (e)=> setEstado(e.target.value)}
                    type='text'
                    className='form-control'
                    required
                />
            </div>
            <button type='submit' className='btn btn-primary'>Actualizar</button>
            <Link  to='/' className='btn btn-danger'>Cancelar</Link>
        </form>
    </div>
    )
}

export default EditarCliente
