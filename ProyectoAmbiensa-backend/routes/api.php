<?php

use App\Http\Controllers\Api\ClientesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::controller(ClientesController::class)->group(function(){
    Route::get('/clientes','index');
    Route::post('/cliente','store');
    Route::get('/cliente/{id}','show');
    Route::put('/cliente/{id}','update');
    Route::delete('/cliente/{id}','destroy');
});