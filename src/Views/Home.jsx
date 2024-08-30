import { useState, useEffect } from 'react'
import Nav from '../Components/Nav'
import { Container, Row, Col, InputGroup, InputGroupText, Input, Alert } from 'reactstrap'
import PokeTarjeta from '../Components/PokeTarjeta'
import { PaginationControl } from 'react-bootstrap-pagination-control'
import axios from 'axios'
import Loader from '../Components/Loader'
import ErrorPoke from '../Components/ErrorPoke'

export default function Index() {
  const [pokemones, setPokemones] = useState([]);
  const [allPokemones, setAllPokemones] = useState([]);
  const [listado, setListado] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Ejecute una vez cargue la app
  useEffect(() => {
    getPokemones(offset);
    getallPokemones();
  }, [])

  // Obtener pokemones de la API
  const getPokemones = async (o) => {
    try {

      setFiltro('')
      setLoading(true);
      setError(null);
  
      const liga = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${o}`;
      axios.get(liga)
      .then( async(reponse) => {
        const respuesta = reponse.data;
        setPokemones(respuesta.results);
        setListado(respuesta.results);
        setTotal(respuesta.count);
        
      })
      .catch((jqXHR, exception) => {
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

  // Obtener todos los pokemones para realizar la busqueda
  const getallPokemones = async (o) => {
    try {

      setLoading(true);
      setError(null);
      const liga = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`;
      

      axios.get(liga)
        .then( async(reponse) => {
          const respuesta = reponse.data;
          setAllPokemones(respuesta.results);

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

  // Funcion para realizar la busqueda
  const buscar = async() => {
    setLoading(true);

      if(filtro.trim() != ''){
          //Vacimoas listado
          setListado([]); 
          // Ejecutamos la busqueda con un filtro
          setListado(allPokemones.filter(p=>p.name.includes(filtro)));
      }else{
          // Si esta vacio, tomamos todos los pokemones principales
          setListado([]);
          setListado(pokemones);
          
      }

      setTimeout(() => {
        setLoading(false);
      }, 1000);
  }

  // Funcion paginacion
  const goPage = async(p) => { 
    setListado([]);
    await getPokemones( (p==1) ? 0 : (p-1)*limit );
    setOffset(p);
  }

  return (
    <>
    <Nav returnHome={false}/>
    {loading && <Loader />}
    
    <Container className='shadow mt-3 mt-5'>
   
      <Row className='animate__animated animate__bounce'>
          <Col md='6 offset-md-3 text-center'>
           <InputGroup className='my-3 shadow'>
             <InputGroupText>
              <i className="fas fa-search"></i>
              </InputGroupText>
             <Input
               onChange={(e) => setFiltro(e.target.value)}
               value={filtro}
               onKeyUp={buscar}

               type="text"
               placeholder="Buscar..."
             />
           </InputGroup>
        </Col>
      </Row>

      <Row className='mt-3'>

      {
        // Componente de error
        error && <ErrorPoke msj={error} />
      }

       {
        // Listado de pokemones
         listado.map((pok, i) => (
            <PokeTarjeta poke={pok} key={i} />
         ))
       }

       {
          // Paginacion
          // Alerta si no hay resultados
          listado.length == 0 ? <Col md='4 offset-md-4 text-center'><Alert className='alert-dark'>
              <h4 className="alert-heading text-center">No hay resultados <i className="far fa-frown"></i></h4>
            </Alert></Col> : filtro == '' && <PaginationControl className="bg-dark" last={true} limit={limit} total={total} page={offset} changePage={page => goPage(page)} />
        }
       
      </Row>
    </Container>
    </>
  )
}
