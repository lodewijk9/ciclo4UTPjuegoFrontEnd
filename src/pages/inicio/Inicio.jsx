import { useEffect, useState } from "react";
import Top_tiempos from "../components/Top_tiempos"
import Swal from "sweetalert2";
import axios from "axios";

const Inicio = () => {
   
    //recibir frase y separar en array
        const [frases, setFrases] = useState([]) 
        const [frase, setFrase] = useState("utp")
        const [rnd, setRND] = useState(0)


    //Guardar los objetos de frases
        window.onload =()=>{
            //axios.get("http://localhost:3001/api/traer-frases")
            axios.get("https://juego2021ahorcados.herokuapp.com/api/traer-frases")
            .then((respuesta)=>{
                setFrases(respuesta.data);         
            }).catch((err)=>{
                console.log("error al traer frases")
            })

        }

        useEffect(()=>{
            frases.map((f, i)=>{
                if(rnd === i){
                    setFrase(f.frase);
                }
            })
            setRND(Math.round(Math.random()*(frases.length+0)))
            
        },[rnd, frases])
     

    const letras = frase.toLocaleLowerCase().split("");
    //traer letras de usuario
    const [userLetra, setUserLetra] = useState("");
    //array inicial vacio
    const [ini, setIni] = useState(new Array(letras.length-1))

    var contador = -1;

    const cambia_letra = letras.map((e) => {
        contador +=1
        return <input type="text" className="miLetra" key={contador} defaultValue={ini[contador]} placeholder="_____" disabled/>
    });

    var [intentos, setIntentos] = useState(8);

    const equivocado = () =>{
        setUserLetra('');
        setIntentos(intentos-1);
    };


    const gano = () => {
        let ganaste = 0;
        
        for (let  i=0; i<letras.length; i++) {
           if(letras[i]===ini[i]){
                ganaste += 1
           }
        }
        return ganaste;
    }

    var pos = -1;
    const onClick = () => {

            if(letras.includes(userLetra)){
                console.log(" si esta la letra ")
                letras.map((L)=>{
                    pos += 1;
                    if (L === userLetra){
                        ini[pos] = userLetra;
                        setIni(ini);  
                    }
                    return setUserLetra("");
                });
            }else{
                console.log("no esta la letra")
                setUserLetra("");
                equivocado();
            }    
            
            if (intentos === 0){
                setIntentos(0);
                Swal.fire({
                    icon: 'error',
                    title: `Era '${frase}' estas ahorcados`,
                    text: 'Ooops',
                    footer: '<a href="">Sigue Intentando!</a>'
                  }).then(()=> window.location.reload())                                 
            }

            const gano2 = gano();           
            if(gano2===letras.length){
                let nombre = document.getElementById('exampleInputEmail1').value;
                
                if (nombre === ""){
                    nombre = "user_nick"
                }

                const tiempo = document.getElementById("tiempo").textContent


                Swal.fire({
                    title: `${nombre} has completado el ahorcado en ${tiempo} segundos`,
                    width: 600,
                    padding: '3em',
                    background: 'url(https://img.freepik.com/vector-gratis/ola-texturas-vector-fondo-blanco_53876-60286.jpg?size=626&ext=jpg)',
                    backdrop: `rgba(0,123,123,0.4)
                               url(https://c.tenor.com/jfuS4kZzmqUAAAAC/adventuretime-jake.gif)
                               left top
                               no-repeat`,
                  }).then(()=>window.location.reload());

                  //axios.post("http://localhost:3001/api/nuevo-jugador", {
                  axios.post("https://juego2021ahorcados.herokuapp.com/api/nuevo-jugador", {
                      nombre:nombre,
                      tiempo:tiempo,
                  }).then((respuesta)=>{
                      console.log(respuesta)
                  }).catch((err)=>{
                      console.log("error al guardar nuevo tiempo: ",err)
                  })
                  
            }

    }
    
    switch (intentos){
        case 1: 
            document.getElementById('pie2').style.visibility = 'visible';break;
        case 2: 
            document.getElementById('pie1').style.visibility = 'visible';break;
        case 3: 
            document.getElementById('mano2').style.visibility = 'visible';break;
        case 4: 
            document.getElementById('mano1').style.visibility = 'visible';break;
        case 5: 
            document.getElementById('tronco').style.visibility = 'visible';break;
        case 6: 
            document.getElementById('cabeza').style.visibility = 'visible';break;
        case 7: 
            document.getElementById('cuerda').style.visibility = 'visible';break;
        default : console.log("error");
    }


    return ( 
        
        <div id="body">

            <div className="container">
                <div className="row row-cols-2">
                    <div className="col">  INTENTOS  <br />
                        <label htmlFor="" id="intentos">{intentos}</label> <br /> <br />
                        <form>
                            {cambia_letra}
                             <br/><br/><br/><br/>
                            <input type="text" className="letrausuario" defaultValue={userLetra} onChange={(e) => {setUserLetra(e.target.value)}} placeholder="escribe una letra aqui" required/>
                            <br /><br />
                            <button type="button" className="btn btn-primary" onClick={()=>onClick()}>Probar</button>
                        </form>
                    </div> 
                    <div className="col">DETALLES
                        
                        <Top_tiempos />
                        
                    </div>
                </div>
            </div>

            <div id="cuerpo">
                <div id="cuerda"></div>
                <div id="cabeza"></div>
                <div id="tronco"></div>
                <div id="mano1"></div>
                <div id="mano2"></div>
                <div id="pie1"></div>
                <div id="pie2"></div>
            </div>
        </div>
    );
}
 
export default Inicio;