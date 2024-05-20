//obtener los elementos del DOM/HTML
const ciudadInput = document.getElementById('ciudad');

const obtenerPronosticoBt = document.getElementById('obtenerPronostico');

const pronosticoDiv = document.getElementById('pronostico');

obtenerPronosticoBt.addEventListener('click', obtenerPronostico);

function obtenerPronostico(){
    const ciudad = ciudadInput.value.trim();
    if(ciudad===""){
        mostrarError("Porfavor ingresa una ciudad");
        return
    }
    //pega API KEY aqui abajo
    const apiKey ="7203a015b26751b8669719dda08e6ccd";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;

    //una solicitud HTTP utilizando fetch con la url construida

    fetch(url)
        .then(response => response.json())
        .then(data =>{
            mostrarPronostico(data);
        })
        .catch(error=>{
            mostrarError("Error al obtener el pronóstico, intentalo otra vez")
        });
    
        

};

function mostrarPronostico(data){
    const {name, main, weather} = data;
    const temperatura = main.temp;
    const sensacion = main.feels_like;
    const humedad = main.humidity;
    const descripcion = weather[0].description;

    let img = "";
    if (descripcion==="cielo despejado"||descripcion==="cielo claro"){
        img = "./img/despejado.png";
    }
    if(descripcion==="pocas nubes"||descripcion==="algo de nubes"){
        img = "./img/pocasNubes.png";
    }
    if(descripcion==="nubes rotas"||descripcion==="nubes dispersas"){
        img = "./img/nubesRotas.png";
    }
    if(descripcion==="nubes"||descripcion==="muy nuboso"){
        img = "./img/nublado.png";
    }
    if(descripcion==="niebla"){
        img = "./img/niebla.png";
    }
    if(descripcion==="chubasco de ligera intensidad"||descripcion==="lluvia moderada"||descripcion==="lluvia ligera"){
        img = "./img/rain.png";
    }
    if(descripcion==="lluvioso"||descripcion==="lluvia de gran intensidad"||descripcion=="ligera tormenta"){
        img = "./img/lluvioso.png";
    }
    if(descripcion==="nieve ligera"||descripcion==="nieve"||descripcion==="fuertes nevadas"||descripcion==="aguanieve"){
        img = "./img/snow.png";
    }


    const pronosticoHTML = `
        <div class="card">
            <div class="card-body">
                <h2 class="card-title">${name}</h2>
                <p class="card-text">Temperatura: ${temperatura} °C</p>
                <p class="card-text">Sensación ambiente: ${sensacion}°C</p>
                <p class="card-text">Porcentaje de humedad: ${humedad}%</p>
                <p class="card-text">Descripcíon: ${descripcion}</p>
            </div>
            <div class="box2">
                  <img src="${img}" alt="">
              </div>
        </div>
    `;
    //Insertar el Js dentro de HTML
    pronosticoDiv.innerHTML= pronosticoHTML;
};

function mostrarError(mensaje){
    const errorHTML = `
        <div class="alert alert-danger" role="alert">
            ${mensaje}
        </div>
    `;
    pronosticoDiv.innerHTML= errorHTML;
}