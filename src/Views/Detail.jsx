import {useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Container, Row, Col, Card, CardBody, CardText, Badge, Progress } from 'reactstrap'
import axios from 'axios'
import Nav from '../Components/Nav'
import Loader from '../Components/Loader'
import ErrorPoke from '../Components/ErrorPoke'


export default function Detail() {

  const {id} = useParams();
  const [pokemon, setPokemon] = useState([]);
  const [habitat, setHabitat] = useState('Desconocido');
  const [descripcion, setDescripcion] = useState([]);
  const [imagen, setImagen] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [estadisticas, setEstadisticas] = useState([]);
  const [habilidades, setHabilidades] = useState([]);
  const [cardClass, setCardClass] = useState('d-none');
  const [loadClass, setLoadClass] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPokemones();
  }, [])

  // Funcion buscar detalles del pokemon
  const getPokemones = async () => {
    try {
    const liga = `https://pokeapi.co/api/v2/pokemon/${id}`;
    axios.get(liga)
      .then( async(reponse) => {
        const respuesta = reponse.data;
        setPokemon(respuesta);

        if(respuesta.sprites.other.dream_world.front_default != null){
          setImagen(respuesta.sprites.other.dream_world.front_default);
        }else{
          setImagen(respuesta.sprites.other['official-artwork'].front_default);
        }
        await getEspecie(respuesta.species.name);
        await getTipos(respuesta.types);
        await getHabilidades(respuesta.abilities);
        await getEstadisticas(respuesta.stats);

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

  // Obtener la especie del pokemon
  const getEspecie = async(esp) => { 
    try {

      const liga = `https://pokeapi.co/api/v2/pokemon-species/${esp}`;
      axios.get(liga)
        .then( async(reponse) => {
          const respuesta = reponse.data;

          //Buscamos detalles del habitad
          if(respuesta.habitat!=null){
              await getHabitat(respuesta.habitat.url);
          }

          await getDescripcion(respuesta.flavor_text_entries);

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

  // Obtener el habitat del pokemon
  const getHabitat = async(hab) => {
    try {

      axios.get(hab)
        .then( async(reponse) => {
          setHabitat(reponse.data.names[1].name);
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

  // Obtener la descripcion del pokemon con la version español
  const getDescripcion = async(desc) => {
    let texto ='';
    desc.forEach((d) => {
      if(d.language.name == 'es'){
        texto = d.flavor_text;
      }
      if(texto == '' && desc.length >0){
        texto = desc[0].flavor_text;
      }
    });
    setDescripcion(texto);
  }

  // Obtener los tipos del pokemon
  const getTipos = async(tip) => {
    try {

      let listaTipos = [];

      tip.forEach((t) => {

        axios.get(t.type.url)
        .then( async(reponse) => {
          listaTipos.push(reponse.data.names[5].name);
          setTipos(listaTipos);
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

      });

    }catch (error) {
      setError(error);
    }

  }

  // Obtener las habilidades del pokemon
  const getHabilidades = async(hab) => {
    try {
      let listaHab = [];

      hab.forEach((h) => {

        axios.get(h.ability.url)
        .then( async(reponse) => {
          listaHab.push(reponse.data.names[5].name);
          setHabilidades(listaHab);
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

      });
    }catch (error) {
      setError(error);
    }
  }

  // Obtener las estadisticas del pokemon
  const getEstadisticas = async(es) => {
    try {
      let listaEs = [];

      es.forEach((h) => {

        axios.get(h.stat.url)
        .then( async(reponse) => {
          listaEs.push({'nombre': reponse.data.names[5].name, 'valor': h.base_stat});
          setEstadisticas(listaEs);
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

      });
    }catch (error) {
      setError(error);
    }

  }

  return (
    <>
    <Nav returnHome={true}/>
    {loading && <Loader />}
    <Container className='mt-3 mt-5'>
      <Row>
        <Col>
          <Card className='shadow mt-3 mb-3 card-tarjeta'>
            <CardBody className='mt-3'>

                {
                  // Componente de error
                  error && <ErrorPoke msj={error} />
                }

                <Row className={loadClass}>
                  <Col md='3 offset-md-4 text-center'>
                    <img src="/img/pokeball.gif" className='img-fluid' />
                  </Col>
                </Row>
                

                <Row className={cardClass}>
                  <Col md='6'>
                    <h1 className='h1 text-capitalize text-white animate__animated animate__bounceInLeft'>{pokemon.name}</h1>
                    <CardText className='fs-3'>{descripcion}</CardText>
                    <CardText className='fs-5'>
                      Altura: <b >{(pokemon.height)/10} m</b> <br/>
                      Peso: <b >{(pokemon.height)/10} kg</b>
                    </CardText>
                    <CardText className='fs-5'>
                        Tipo: {
                          tipos.map((tip,i) => {
                            return <Badge pill key={i} color='danger' className='me-1'>
                              {tip}
                            </Badge>
                          })
                        }
                    </CardText>
                    <CardText className='fs-5'>
                        Habilidades: {
                          habilidades.map((hab,i) => {
                            return <Badge pill key={i} color='dark' className='me-1'>
                              {hab}
                            </Badge>
                          })
                        }
                    </CardText>
                    <CardText className='fs-5 text-capitalize'>
                        Habitat: <b>{habitat}</b>
                    </CardText>
                  </Col>
                  <Col md='6 order-first order-lg-0' >
                    <img src={imagen} className='img-fluid animate__animated animate__bounceInRight' alt=""/>
                  </Col>

                  <Col md='12 mt-3'>
                        <CardText className='fs-4 text-center'>
                          <b className='text-white'>Estadisticas:</b>
                        </CardText> 
                  </Col>
                  {
                    estadisticas.map((es,i) => {
                      return <Row key={i}>
                        <Col xs='6' md='3'>
                          <b className='text-white'>{es.nombre}</b>
                        </Col>
                        <Col xs='6' md='9'>
                            <Progress className='my-2' value={es.valor}>{es.valor}</Progress>
                        </Col>
                      </Row>
                    })
                  }

                </Row>

            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  )
}
