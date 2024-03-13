import React, {useEffect,useState} from 'react'
import axios from 'axios'
import { Dropdown, DropdownButton } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
const endpoint='http://localhost:8000/api'
const MostrarClientes = () => {
    const [allClientes, setAllClientes] = useState([]);
    const [clientes, setClientes] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    
    
    useEffect(()=>{
        getAllClientes()
    }, [])

    const getAllClientes = async() => {

        try {
            const response = await axios.get(`${endpoint}/clientes`);
            setAllClientes(response.data);
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
            setClientes(allClientes);
        } else {
            const filteredClientes = allClientes.filter((cliente) =>
                cliente.descripcion.toLowerCase().startsWith(value.toLowerCase())
            );
            setClientes(filteredClientes);
        }
    }

  return (
    <div>
        <div className='d-grid gap-2'>
            <Link to="/create" className='btn btn-success btn-lg mt-2 mb-2 text-white'>Crear</Link>
        </div>
        <label>Medio</label>
        <input className=''
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
                        <td> {new Date(cliente.created_at).toLocaleDateString()}</td>
                        
                        <td> {cliente.usuario}</td>
                        <td> {cliente.estado}</td>
                        <td>
                            <DropdownButton id="dropdown-basic-button" title="☰" style={{ padding: "0.5em" }}>
                                
                                    <Dropdown.Item as={Link} to={`/edit/${cliente.id}`}><FaEdit /></Dropdown.Item>
                                    <Dropdown.Item onClick={() => eliminarClientes(cliente.id)}><FaRegTrashAlt /></Dropdown.Item>
                            
                                
                            </DropdownButton>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default MostrarClientes