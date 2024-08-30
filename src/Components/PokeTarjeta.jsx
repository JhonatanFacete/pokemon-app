import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Col, Card, CardBody, CardFooter, CardImg } from 'reactstrap'
import { Link } from 'react-router-dom';
import Loader from '../Components/Loader'
import ErrorPoke from '../Components/ErrorPoke'

export default function PokeTarjeta(params) {

  const [pokemon, setPokemon] = useState([]);
  const [imagen, setImagen] = useState('');
  const [cardClass, setCardClass] = useState('d-none');
  const [loadClass, setLoadClass] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPokemones();
  }, [])

  const getPokemones = async () => {
    try {
      const liga = params.poke.url;

      axios.get(liga)
        .then( async(reponse) => {
          const respuesta = reponse.data;
          setPokemon(respuesta);

          if(respuesta.sprites.other.dream_world.front_default != null){
            setImagen(respuesta.sprites.other.dream_world.front_default);
          }else{
            setImagen(respuesta.sprites.other['official-artwork'].front_default);
          }
          setCardClass('');
          setLoadClass('d-none');
        }).catch((jqXHR, exception) => {
          let msg = '';
          if (jqXHR.status === 0) {
              msg = `Verificar su estado de internet`;
          } else if (jqXHR.status == 404) {
              msg = `Página solicitada no encontrada. [404]`;
          } else if (jqXHR.status == 500) {
              msg = `Error interno del servidor [500].`;
          } else if (exception === 'parsererror') {
              msg = `Se solicitó el error de JSON.`;
          } else if (exception === 'timeout') {
              msg = `Error de tiempo de espera.`;
          } else if (exception === 'abort') {
              msg = `petición abortada.`;
          } else {
              msg = `Error no detectado.\n ${jqXHR.responseText}`;
          }
          setError(msg);
        }).finally(() => setLoading(false));
    }catch (error) {
      setError(error);
    }
   
  }

  

  return (
    <Col sm='4' lg='3' className='mb-2 h-100'>
      <Card className={'shadow border-1 card-tarjeta  '+loadClass}>
        <CardImg src='/img/pokeball.gif' height='200' className='p-3'></CardImg>
      </Card>
      {loading && <Loader />}
      { error && <ErrorPoke msj={error} />}
      <Card className={'card-hover shadow border-1 card-tarjeta mb-2 '+cardClass}>
        <CardImg src={imagen} height='150' className='p-2' />
        <CardBody className='text-center'>
          <label className='fs-4 text-capitalize text-white'>{pokemon.name}</label>
          <p>Altura: <b>{(pokemon.height)/10} m</b> <br/>
          Peso: <b>{(pokemon.height)/10} kg</b></p>
        </CardBody>
        <CardFooter className='text-center'>
          <Link to={'/pokemon/'+pokemon.name} className='btn btn-outline-dark text-white'>
          <i className='fa-solid far fa-eye pe-2'></i> 
           Detalles</Link>
        </CardFooter>
      </Card>
    </Col>
  )
}