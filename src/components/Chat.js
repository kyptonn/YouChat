import React, { useRef } from 'react'
import {auth} from '../firebase'

export default function Chat(params) {
    const endOfMessageRef = useRef(null)

   


    return (
        <div>
             {params.params.map((data) => data.mensajes.map((sub) => 
                                    <>
                                        {sub.uid === auth.currentUser.uid ?
                                            <div className="bocadillo-conver">                                          
                                                <h3>{sub.content}</h3>      
                                            </div>
                                        :
                                            <div className="bocadillo-conver-notself">                                             
                                                <h3>{sub.content}</h3>                                          
                                            </div>
                                        }   
                                    </>
                                )) }
                                
        </div>
    )
}
