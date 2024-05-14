const contenedor_trivia = document.getElementById('trivia_juego');
const parametros = document.getElementById('cont');


// juego normal
async function normal() {
    let normal = await fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=medium");
    let trivia = await normal.json();
    let preguntas = trivia.results;
    console.log(preguntas);

    let html = "";
    for(let i=0; i<preguntas.length; i++) {
        html = html + generar_pregunta(preguntas[i],i) 
    }
    contenedor_trivia.innerHTML = html;
}


// juego avanzado
function avanzado() {
    let avanzado = fetch("https://opentdb.com/api_category.php")
    .then(avanzado => avanzado.json())
    .then(data => {
        console.log(data);
        filtros(data.trivia_categories);
    });

    
}

function jugar() {
    
}

function generar_pregunta(preguntas, num_pregunta) {
    return `
          <h3>${preguntas.question}<h3><br>
          ${generar_respuestas(
            preguntas.correct_answer,
            preguntas.incorrect_answers,
            num_pregunta
          )}
    `;
}

function generar_respuestas(respuesta_correcta, respuestas, num_pregunta) {
    let html = ""
    respuestas.push(respuesta_correcta)
    respuestas.sort((a,b) => Math.random() - 0.5)
    for (let i = 0; i < respuestas.length; i++) {
      html =
        html +
        `
        <button 
          onclick='comprobar_respuesta("${respuestas[i]}", "${respuesta_correcta}", ${num_pregunta})'>
          ${respuestas[i]}
        </button>
      `;
    }
    return html = html + `<div id="resultado_pregunta_${num_pregunta}"></div>`
  }

function comprobar_respuesta(respuesta, respuesta_correcta, num_pregunta) {
    let resultado_pregunta = document.getElementById(`resultado_pregunta_${num_pregunta}`)
    if(respuesta == respuesta_correcta) {
      resultado_pregunta.innerHTML = `
        <span style="color:green;">Correcto!</span>
      `
    } else {
      resultado_pregunta.innerHTML = `
        <span style="color:red;">Incorrecto!</span>
      `
    }
}

function filtros(cate) {
    //parametros.style.display = 'block';
    parametros.classList.add('open');
    
    parametros.innerHTML =
    `
        <select class="form-select form-select-sm colors">
            <option selected>Selecciona la categoria</option>
            ${categorias(cate)} 
             
        </select>
        <select class="form-select form-select-sm colors">
            <option selected>Selecciona la dificultad</option>
            <option value="1">Facil</option>
            <option value="2">Media</option>
            <option value="3">Dificil</option>
        </select>
        <select class="form-select form-select-sm colors">
            <option selected>Seleccione tipo</option>
            <option value="multiple">Opcion Multiple</option>
            <option value="verdad">Verdadero Falso</option>
        </select>
        <button onclick="jugar()" class="btn btn-danger" type="button">Jugar</button>
    `;
}

function categorias(arr) {
    console.log(arr);
    arr.forEach(element => {
        return `
        <option value="${element.id}">${element.name}</option>
        `;
    });
}