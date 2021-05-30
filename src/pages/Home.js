import React, { useEffect, useRef, useState } from 'react'
import {auth} from '../firebase'
import {useHistory} from 'react-router-dom'
import Header from '../components/Header'
import avatar from '../images/avatar.png'
import newConver from '../images/newconver.png'
import app from '../firebase'
import enviar from '../images/enviar.png'
import martaAvatar from '../images/marta-avatar.png'
import Moment from 'react-moment';
import equis from '../images/equis.png'
import Chat from '../components/Chat'
import ReactScrollableFeed from 'react-scrollable-feed'
import MediaQuery, { useMediaQuery } from 'react-responsive'
import back from '../images/back.png'
import { Spinner } from 'react-bootstrap'

const db = app.firestore()


export default function Home() {

    let history = useHistory()

    if(auth.currentUser == null){
        history.push('/login')
    }
    const [loading, setLoading] = useState(true)
    const [convers, setConvers] = useState(false)
    const [converActual, setConverActual] = useState(null)
    const [envioToggle, setEnvioToggle] = useState(false)
    const [newChat, setNewChat] = useState(null)
    const endOfMessageRef = useRef(null)


    const [marta, setMarta] = useState()
    useEffect(() => {
         const checkPrueba = db.collection('users').doc(auth.currentUser.uid).collection('conversaciones').doc('EL2MD7fiuEOVutmSzGnJXqcgoYo1').get()
        .then(data => {setConverActual([data.data()]) })
    },[])

    useEffect(() => {
        const userDemo =  db.collection('users').doc('EL2MD7fiuEOVutmSzGnJXqcgoYo1')
        const userDemoGet = userDemo.get()
        .then(data => {setMarta(data.data()); })

       /*  const checkPrueba = db.collection('users').doc(auth.currentUser.uid).collection('conversaciones').doc('EL2MD7fiuEOVutmSzGnJXqcgoYo1').get()
        .then(data => {setConverActual([data.data()]) }) */
     
        let arrayConversaciones = []
        const conversaciones = db.collection('users').doc(auth.currentUser.uid).collection('conversaciones').get()
        .then(data => data.forEach(element => arrayConversaciones.push(element.data())))
        .then(data => {setConvers(arrayConversaciones); setLoading(false)})
       
    },[envioToggle])




    const [converPopup, setConverPopup] = useState('conver-popup-inactiva')
    const [converPopupOverlay, setConverPopupOverlay] = useState('conver-popup-overlay-inactiva')

    const NewConver = () => {
        setConverPopup('conver-popup-activa')
        setConverPopupOverlay('conver-popup-overlay-activa')

    }
    const ChangeConverActual = () => {

    }




    /* console.log(marta) */

    const StartChat = (remitente) => {
        console.log(remitente)
        const checkPrueba = db.collection('users').doc(auth.currentUser.uid).collection('conversaciones').doc(remitente).get()
        .then(data => setConverActual([data.data()]))
        if(checkPrueba == null || checkPrueba == undefined){
            console.log('no existe ese archivo')
            db.collection('users').doc(auth.currentUser.uid).collection('conversaciones').doc(remitente).set({
                mensajes: [{
                    content: "Hola! ¿Has recibido el mensaje confidencial por Email?", 
                    createdAt: Date.now(),
                    uid:"EL2MD7fiuEOVutmSzGnJXqcgoYo1"}],
                createdAt: Date.now(),
                uid: auth.currentUser.uid
    
            })

        }else{  console.log('SI existe')}

      
    }
 



    const [mensaje, setMensaje] = useState()
    const EnviarMensaje = () => {
        

        let arrayMensajes = converActual[0].mensajes
        console.log(converActual)
        arrayMensajes.push({content: mensaje, createdAt: Date.now(), uid: auth.currentUser.uid})
       
        try{
            db.collection('users').doc(auth.currentUser.uid).collection('conversaciones').doc(converActual[0].uidRemitente).update({
                mensajes: arrayMensajes
            })
            db.collection('users').doc(converActual[0].uidRemitente).collection('conversaciones').doc(auth.currentUser.uid).update({
                mensajes: arrayMensajes
            })
            setEnvioToggle(envioToggle ? false : true)
            
            document.getElementById('mensajeInput').value = '';
           /*  scrollToBottom(); */

        }catch(err){
           alert(err)
        }
    }


    const IniciarChat = async() => {
        // HAY QUE BUSCAR EN TODOS LOS 'users' QUIEN TENGA ESE NOMBRE DEFINIDO (NOMBRE DE USUARIO)
        // CUANDO LO ENCUENTRE, LO AÑADIMOS COMO NUEVA CONVERSACION A LA DB DEL CURRENT USER
        try{
            let newChatArray = []
            await db.collection('users').where('displayName', '==', newChat).get()
                .then((data) => data.forEach((datos) => newChatArray.push(datos.data())))
            console.log(newChatArray)
    
            await db.collection('users').doc(auth.currentUser.uid).collection('conversaciones').doc(newChatArray[0].usuario).set({
                avatarRemitente: newChatArray[0].avatar,
                createdAt: Date.now(),
                mensajes: [{content: "", createdAt: Date.now(), uid: auth.currentUser.uid}],
                nombreRemitente: newChatArray[0].displayName,
                uid: auth.currentUser.uid,
                uidRemitente: newChatArray[0].usuario,
            }) 
            history.go(0)
        }catch(err){
            alert('Parece que hay un error con el Nombre de Usuario introducido')
        }
        

        /* setConverPopup("conver-popup-inactiva")
        setConverPopupOverlay("conver-popup-inactiva") */


    }
        /* console.log(converActual) */
          

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            EnviarMensaje()
        }
    }

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 800px)' })   
    const isBigScreen = useMediaQuery({ query: '(min-width: 801px)' }) 

    const [convChat, setConvChat] = useState('app-column-der-hidden')

    if(loading){
        return (
            <div className="column-center center">
             {/*    <h1>Cargando</h1> */}
             <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
               
            </div>
        )
    }

    return (
        <div style={{overflowY:"unset"}}>
            <Header/>


            <div className={converPopup} style={{overflowY:"hidden"}}>
                <img onClick={() => {setConverPopup('conver-popup-inactiva'); setConverPopupOverlay('conver-popup-overlay-inactiva')}}src={equis}/>
                <h4 style={{marginBottom:0}}>Introduce el Nombre de Usuario</h4>
                <h4>para iniciar una conversación</h4>
                <input onChange={(e) => setNewChat(e.target.value)}></input>
                <br></br>
                <button onClick={() => IniciarChat()}>Iniciar Chat</button>
            </div>


            <div className={converPopupOverlay}></div>


            <div  className="master-container">


                {/* PANTALLA PEQUEÑA */}
                {isTabletOrMobile && <>
                <div className="app-column-izq">
                    <div className="conversaciones space-between">
                        <h3>Conversaciones</h3>
                        <img onClick={() => NewConver()} src={newConver}/>

                    </div>

                    {convers.map((data) => (
                        <div onClick={() => {StartChat(data.uidRemitente); setConvChat('app-column-der column-center')}}className="contactos mt-3">
                            <div className="flex">
                                {data.avatarRemitente === null ?
                                <>
                               
                               <img src={avatar}/>
                               </>
                                :
                                <>
                                
                               
                                <img src={data.avatarRemitente}/>
                                </>
                                }
                                <div className="column">
                                    <h5>{data.nombreRemitente}</h5>
                                    <h6>{data.mensajes[data.mensajes.length-1].content.substring(0,15)}...</h6>
                                </div>
                                <div className='info column'>
                                    <Moment format="HH:mm">
                                    {Date(data.mensajes[data.mensajes.length-1].createdAt)}

                                    </Moment>
                                    <h6 className="notificaciones">1</h6>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                                

                <div style={{placeItems:'center'}}className={convChat}>

                    <div className="container-chat">
                        <div style={{padding:'10px', borderBottom:'solid 1px grey'}} className="linea-contacto flex">
                            {converActual[0].avatarRemitente === null ? 
                             <>
                            <img onClick={() => setConvChat('app-column-der-hidden')} src={back}/>
                             <img src={avatar}/> 
                             </>                   
                            :
                             <>
                            <img onClick={() => setConvChat('app-column-der-hidden')} src={back}/>
                            <img src={converActual[0].avatarRemitente}/>
                             </>                   
                            }
                            <div className="container-chat-columna-contacto">
                                <h3>{converActual[0].nombreRemitente}</h3>
                                <h5>Última conexión hace 1 hora</h5>
                            </div>
                        </div>
                        <div className="container-conversaciones">
                            <div className="column columna-conversaciones">
                              
                            {converActual === null ? 
                            <div></div>
                        :
                            <ReactScrollableFeed>

                            {converActual.map((data) => data.mensajes.map((sub) => 
                            <>
                                    {sub.uid === auth.currentUser.uid ?
                                        <div className="bocadillo-conver">                                          
                                            <h3 key={sub.createdAt}>{sub.content}</h3>  
                                            <h5>
                                                <Moment format="HH:mm">    
                                                    {(sub.createdAt*1)}
                                                </Moment>     
                                            </h5>
                                        </div>
                                    :
                                        <div className="bocadillo-conver-notself">                                             
                                            <h3 key={sub.createdAt}>{sub.content}</h3>                                          
                                            <h5>
                                                <Moment format="HH:mm">    
                                                    {(sub.createdAt*1)}
                                                </Moment>     
                                            </h5>                                       
                                        </div>
                                    }   
                            </>
                            )) }


                    </ReactScrollableFeed>
                       
                        }
                           
                           
                                <br></br>
                          
                        
                            
                            </div>
                               
                        </div>
                        <div className="container-escribir">
                           <div className="escribir">
                                <input id="mensajeInput" onKeyPress={(e) => handleKeyPress(e)} onChange={(e) => setMensaje(e.target.value)} type="text"placeholder="Escribir mensaje"></input>
                               <img id="myBtn"onClick={()=> EnviarMensaje()} src={enviar}/>
                           </div>
                        </div>
                    </div>
                
                </div>
                </>}

          




                {/* PANTALLA GRANDE */}
                {isBigScreen && <>
                    <div className="app-column-izq">
                    <div className="conversaciones space-between">
                        <h3>Conversaciones</h3>
                        <img onClick={() => NewConver()} src={newConver}/>

                    </div>

                    {convers.map((data) => (
                        <div onClick={() => StartChat(data.uidRemitente)}className="contactos mt-3">
                            <div className="flex">
                                {data.avatarRemitente === null ?
                               <img src={avatar}/>
                                :
                                <img src={data.avatarRemitente}/>
                                }
                                <div className="column">
                                    <h5>{data.nombreRemitente}</h5>
                                    <h6>{data.mensajes[data.mensajes.length-1].content.substring(0,15)}...</h6>
                                </div>
                                <div className='info column'>
                                    <Moment format="HH:mm">
                                    {Date(data.mensajes[data.mensajes.length-1].createdAt)}

                                    </Moment>
                                    <h6 className="notificaciones">1</h6>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                


                <div style={{placeItems:'center'}}className="app-column-der column-center ">

                    <div className="container-chat">
                        <div style={{padding:'10px', borderBottom:'solid 1px grey'}} className="linea-contacto flex">
                            {converActual[0].avatarRemitente === null ? 
                             <>
                             <img onClick={() => setConvChat('app-column-izq')} src={back}/>
                              <img src={avatar}/> 
                              </>                   
                             :
                              <>
                             <img onClick={() => setConvChat('app-column-izq')} src={back}/>
                             <img src={converActual[0].avatarRemitente}/>
                              </>  
                            }
                            <div className="container-chat-columna-contacto">
                                <h3>{converActual[0].nombreRemitente}</h3>
                                <h5>Última conexión hace 1 hora</h5>
                            </div>
                        </div>
                        <div className="container-conversaciones">
                            <div className="column columna-conversaciones">
                              
                            {converActual === null ? 
                            <div></div>
                        :
                            <ReactScrollableFeed>

                            {converActual.map((data) => data.mensajes.map((sub) => 
                            <>
                                    {sub.uid === auth.currentUser.uid ?
                                        <div className="bocadillo-conver">                                          
                                            <h3 key={sub.createdAt}>{sub.content}</h3>  
                                            <h5>
                                                <Moment format="HH:mm">    
                                                    {(sub.createdAt*1)}
                                                </Moment>     
                                            </h5>
                                        </div>
                                    :
                                        <div className="bocadillo-conver-notself">                                             
                                            <h3 key={sub.createdAt}>{sub.content}</h3>                                          
                                            <h5>
                                                <Moment format="HH:mm">    
                                                    {(sub.createdAt*1)}
                                                </Moment>     
                                            </h5>                                       
                                        </div>
                                    }   
                            </>
                            )) }


                    </ReactScrollableFeed>
                       
                        }
                           
                           
                                <br></br>
                          
                        
                            
                            </div>
                               
                        </div>
                        <div className="container-escribir">
                           <div className="escribir">
                                <input id="mensajeInput" onKeyPress={(e) => handleKeyPress(e)} onChange={(e) => setMensaje(e.target.value)} type="text"placeholder="Escribir mensaje"></input>
                               <img id="myBtn"onClick={()=> EnviarMensaje()} src={enviar}/>
                           </div>
                        </div>
                    </div>
                
                </div>
                
                
                
                </>}

                




               
            </div>
        </div>
    )
}
