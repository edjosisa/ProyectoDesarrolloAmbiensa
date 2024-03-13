<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Clientes;
use Illuminate\Http\Request;

class ClientesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Clientes::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $cliente= new Clientes();
        $cliente->descripcion = $request->descripcion;
        $cliente->usuario = $request->usuario;
        $cliente->estado = $request->estado;
        $cliente->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Clientes::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $cliente = Clientes::findOrFail($request->id);
        $cliente->descripcion = $request->descripcion;
        $cliente->usuario = $request->usuario;
        $cliente->estado = $request->estado;
        $cliente->save();
        return $cliente;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return Clientes::destroy($id);
    }
}
