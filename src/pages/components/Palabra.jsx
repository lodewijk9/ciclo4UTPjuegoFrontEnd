import { useState } from "react/cjs/react.development";
import Swal from "sweetalert2";
import axios from "axios";
import { Redirect } from "react-router";


const palabra = () => {

    

    
    const onClick2 = () => {
        let palabra = document.getElementById("palabritas").value
        
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Vas a guardar la Palabra?',
            text: "no podras revertir la acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Guardar!',
            cancelButtonText: 'Cancelar!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {

              //axios.post("http://localhost:3001/api/nueva-frase",{
              axios.post("https://juego2021ahorcados.herokuapp.com/api/nueva-frase",{
                  frase: palabra
              }).then((respuesta)=>{
                  console.log(respuesta)
              }).catch((err)=>{
                  console.log("erro al guardar nueva palabra: ", err)
              })

              swalWithBootstrapButtons.fire(
                'Palabra Guardada!',
                'exitosamente.',
                'success'
              )
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Candelado',
                'no se guardo la palabra',
                'error'
              )
            }
          })
    }




    return ( 
        <div id="body">
            
            <div id="body_palabra">
                <form>

                    <div className="form-group">
                        <input type="email"  id="palabritas" aria-describedby="emailHelp" placeholder="Escribir Palabra"/>
                        <small id="palabraHelp" className="form-text text-muted">Vamos a guardar estas palabraas :)</small>
                    </div>
                    <button type="button" className="btn btn-primary" id="env_palabra" onClick={()=>onClick2()}>Guardar</button>

                </form>
            </div>

        </div>
     );
}
 
export default palabra;