import React, { Component } from 'react';
import { auth, createUserDocument } from '../firebase';
import {Link} from 'react-router-dom'
import chatlogo from '../images/unnamed.png'
import { Toast } from 'react-bootstrap';
import MediaQuery from 'react-responsive'

class Singup extends Component {
  state = { displayName: '', email: '', password: '' };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, displayName } = this.state;
  
    
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(user);
      await createUserDocument(user, { displayName });
      
    } catch (error) {
      console.log('error', error);
    }if (window.confirm('La cuenta se ha creado correctamente')) 
    {
    window.location.href='/';
    };

    this.setState({ displayName: '', email: '', password: '' });
    




};

  render() {
    const { displayName, email, password } = this.state;
    return (
      <>
          <div className="home space-between">
            <MediaQuery minWidth={800}>
            <div className="portada-izq column-center center">
                <img src={chatlogo}/>
            </div>
            </MediaQuery>

            <div className="portada-der">
            <form className="signup-login" onSubmit={this.handleSubmit}>
            <div className="column-center">
            <br></br>
            <MediaQuery maxWidth={800}>
            <h2 style={{color:'white', marginTop:"200px"}} className="text-center">Registrarse</h2>
            </MediaQuery>
            <MediaQuery minWidth={800}>
            <h2 style={{color:'white', marginTop:"250px"}} className="mt-6 text-center">Registrarse</h2>
            </MediaQuery>

            <br></br>
          
            {/* <label>Nombre usuario</label> */}
            <input className="input1"
              type="name"
              name="displayName"
              value={displayName}
              onChange={this.handleChange}
              placeholder="Nombre usuario"
            />
           
           {/*  <label>Email</label> */}
            <input className="input1 mt-4"
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
              placeholder="Email"
            />
           
            {/* <label>Contraseña</label> */}
            <input className="input1 mt-4"
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              placeholder="Contraseña"
            />
            
           

            <div className="center">
              <button className="button1 mt-4">Registrarse</button>
            </div>
           
            <div className="center">
              <p className="link1 mt-3"><Link to="/login"> ¿Ya tienes una cuenta?</Link></p>
            </div>
            <div className="center mt-4">
              <p>Esta es una versión de prueba <br></br>Puedes registrarte con un Email inventado</p>
            </div>
            </div>
          </form>
            </div>
          </div>
</>
    
    );
  }
}

export default Singup;