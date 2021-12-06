import { useState, useEffect } from "react";
import axios from "axios";

const Top_tiempos = () => {

    var [tiempo1, setTiempo] = useState(0);
    var [topJugadores, setTopJugadores] = useState([])
   
    setTimeout(() => {
        setTiempo(tiempo1+=1)
    }, 1000);


    const obtener_top_jugadores = ()=> {
        //axios.get("http://localhost:3001/api/top-times")
        axios.get("https://juego2021ahorcados.herokuapp.com/api/top-times")
        .then((respuesta)=>{
            setTopJugadores(respuesta.data)
        }).catch((err)=>{
           console.log("error al traer datos: ", err)
        })
   };

   useEffect(()=>{
       obtener_top_jugadores()
   },[]);

    var contadorJ = 0
    const top = topJugadores.map((j)=>{
        contadorJ += 1
        return (
            <tr key={contadorJ}>
            <th scope="row">{contadorJ}</th>
            <td>{j.nombre}</td>
            <td>{j.tiempo}</td>
            </tr>  
        )
        
    })


    return ( 
            <div>

            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Nombre de Jugador</label>
                    <br />
                    <input type="text" className="datosJugador" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="nombre o nickname"  />
                </div>

                <div className="mb-3">
                    
                    <label htmlFor="exampleInputPassword1" className="form-label">Tiempo</label>
                    <br />
                    <label htmlFor="exampleInputPassword1" id="tiempo" className="form-label">
                        <strong>{tiempo1}</strong>
                    </label>

                </div>

                
            </form>

        <br /><br />

            <div id="top">

                <table className="table-dark">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {top}                   
                    </tbody>
                </table>

            </div>

        </div>
        
     );
}

export default Top_tiempos;