import React, {useEffect,useState} from 'react'
import axios from 'axios'

import {Link} from 'react-router-dom'

const endpoint='http://localhost:8000/api'
const MostrarClientes = () => {

    const [clientes, setClientes] = useState([])
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(()=>{
        getAllClientes()
    }, [])

    const getAllClientes = async() => {

        try {
            const response = await axios.get(`${endpoint}/clientes`);
            setClientes(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }

    const eliminarClientes = async(id) =>{
        
        try {
            await axios.delete(`${endpoint}/cliente/${id}`);
            getAllClientes();
          } catch (error) {
            console.error('Error deleting client:', error);
          }
    }

    const handleSearch = (value) => {
        setSearchTerm(value);
        if (value === '') {
          
          getAllClientes();
        } else {
          const filteredClientes = clientes.filter((cliente) =>
            cliente.descripcion.toLowerCase().includes(value.toLowerCase())
          );
          setClientes(filteredClientes);
        }
      }

  return (
    <div>
        <div className='d-grid gap-2'>
            <Link to="/create" className='btn btn-success btn-lg mt-2 mb-2 text-white'>Crear</Link>
        </div>
        <input
        type="text"
        placeholder="Buscar por descripción..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
        <table className='table table-striped'>
            <thead className='bg-primary text-white' >
                <tr>
                    <th>No</th>
                    <th>Descripción</th>
                    <th>Fecha Creación</th>
                    <th>Usuario</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {clientes.map((cliente)=>(
                    <tr key={cliente.id}>
                        <td> {cliente.id}</td>
                        <td> {cliente.descripcion}</td>
                        <td> {cliente.created_at}</td>
                        <td> {cliente.usuario}</td>
                        <td> {cliente.estado}</td>
                        <td>
                            <Link to={`/edit/${cliente.id}`} className='btn btn-warning' >Editar </Link>
                            <button onClick={()=>eliminarClientes(cliente.id)} className='btn btn-danger'>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default MostrarClientes