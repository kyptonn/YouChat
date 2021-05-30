import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth, createUserDocument } from '../firebase';
import chatlogo from '../images/unnamed.png'
import MediaQuery from 'react-responsive'


class Login extends Component {
  state = { email: '', password: '' };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      try {
        await auth.signInWithEmailAndPassword(email, password);
        
    } catch (error) {
        console.log('error logging in', error);
        alert('Error al iniciar la sesión. Comprueba los campos')
      }/* alert('la sesion se ha iniciado correctamente') */
      if (window.confirm('La sesión se ha iniciado correctamente')) 
        {
        window.location.href='/';
        };


    }

    // this.setState({ email: '', password: '' });
  };

  render() {
    const { email, password } = this.state;
    return (
<>
        <div className="home space-between">
          <MediaQuery minWidth={800}>
            <div className="portada-izq column-center center">
                <img src={chatlogo}/>
            </div>
            </MediaQuery>
            <div className="portada-der">
                    <form style={{marginTop:'200px'}}className="signup-login" onSubmit={this.handleSubmit}>
                        <div className="container-master">
                            <div className="column-center">
                            <br></br>
                               
                            <MediaQuery maxWidth={800}>
                              <h2 style={{color:'white', marginTop:"10px"}} className="text-center">Iniciar Sesión</h2>
                            </MediaQuery>
                            <MediaQuery minWidth={800}>
                              <h2 style={{color:'white', marginTop:"100px"}} className="mt-6 text-center">Iniciar Sesión</h2>
                            </MediaQuery>
                               
                                <br/>
                               
                                {/* <label>Email</label> */}
                                <input className="input1"
                                type="email"
                                name="email"
                                value={email}
                                onChange={this.handleChange}
                                placeholder="Email"
                                />
                                <br></br>
                                {/* <label>Contraseña</label> */}
                                <input className="input1"
                                type="password"
                                name="password"
                                value={password}
                                onChange={this.handleChange}
                                placeholder="Contraseña"
                                />
                                
                            
                                <button className="button1 mt-4">Iniciar Sesión</button>
                            
                              

                                <p className="link1 mt-3"><Link to="/forgot-password"> ¿Has olvidado la contraseña?</Link></p>
                                <p className="link1 mt-1"><Link to="/registro">¿Aún no tienes cuenta?</Link></p>
                            </div>
                        </div>
                    </form>
                </div>
               
            </div>
     </>
    );
  }
}

export default Login;
