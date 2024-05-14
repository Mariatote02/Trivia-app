const contenedor_trivia = document.getElementById('trivia_juego');
const parametros = document.getElementById('cont');
const tr = document.getElementById('TR');


// juego normal
async function normal() {
    let normal = await fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=boolean");
    let trivia = await normal.json();
    let preguntas = trivia.results;
    console.log(preguntas);

    let html = "";
    for(let i=0; i<preguntas.length; i++) {
        html = html + generar_pregunta(preguntas[i],i) 
    }
    html = html + resultBtn();
    contenedor_trivia.innerHTML = html;
}


// juego avanzado
function avanzado() {
    let avanzado = fetch("https://opentdb.com/api_category.php")
    .then(avanzado => avanzado.json())
    .then(data => {
        console.log(data);
        let html = ""
        html = html + filtros(data.trivia_categories);
        parametros.innerHTML = html;
    });

    
}

function jugar() {
    comprobar_campos()
}

function generar_pregunta(preguntas, num_pregunta) {
    return `
          <h3>${num_pregunta + 1}). ${preguntas.question}</h3>
          ${generar_respuestas(
            preguntas.correct_answer,
            preguntas.incorrect_answers,
            num_pregunta
          )}
          <br>
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
        <button  class="btn btn-primary "
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
        <span value="100" style="color:green;">Correcto!</span>
      `
    } else {
      resultado_pregunta.innerHTML = `
        <span value="0" style="color:red;">Incorrecto!</span>
      `
    }
}

function filtros(cate) {
    //parametros.style.display = 'block';
    parametros.classList.add('open');
    
    return `
        <select id="category" class="form-select form-select-sm colors">
            <option value="" selected>Selecciona la categoria</option>
            ${categorias(cate)} 
        </select>
        <select id="dificulty" class="form-select form-select-sm colors">
            <option value="" selected>Selecciona la dificultad</option>
            <option value="easy">Facil</option>
            <option value="medium">Media</option>
            <option value="hard">Dificil</option>
        </select>
        <select id="type" class="form-select form-select-sm colors">
            <option value="" selected>Seleccione tipo</option>
            <option value="multiple">Opcion Multiple</option>
            <option value="boolean">Verdadero Falso</option>
        </select>
        <button id="play" onclick="jugar()" class="btn btn-danger" type="button">Jugar</button>
    `;
}

function categorias(arr) {
    let html = "";
    for (let i = 0; i < arr.length; i++) {
      html =  html + `
      <option value="${arr[i].id}">${arr[i].name}</option>
      `;
    }
    return html
}

function comprobar_campos() {
  let category = document.getElementById('category').value;
  let dificulty = document.getElementById('dificulty').value;
  let type = document.getElementById('type').value;

  let final = `https://opentdb.com/api.php?amount=10${type}${category}${dificulty}`;
  
  switch (true) {
    case category.length > 0 && dificulty.length <= 0 && type.length <= 0:
      console.log("solo categoria");
      lin = `https://opentdb.com/api.php?amount=10&category=${category}`;
      play(lin);
      break;
    case category.length > 0 && dificulty.length > 0 && type.length <= 0:
      console.log("solo tipe vacio");
      lin = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${dificulty}`;
      play(lin);
      break;
    case (category.length > 0) && (dificulty.length <= 0) &&  (type.length > 0) :
      console.log("todos");
      lin = `https://opentdb.com/api.php?amount=10&category=${category}&type=${type}`;
      play(lin);
      break;
    case (category.length <= 0) && (dificulty.length > 0) &&  (type.length <= 0):
      lin = `https://opentdb.com/api.php?amount=10&difficulty=${dificulty}`;
      play(lin);
      break;
    case (category.length <= 0) && (dificulty.length > 0) &&  (type.length > 0):
      lin = `https://opentdb.com/api.php?amount=10&difficulty=${dificulty}&type=${type}`;
      play(lin);
      break;
    case (category.length <= 0) && (dificulty.length <= 0) &&  (type.length > 0):
      lin = `https://opentdb.com/api.php?amount=10&type=${type}`;
      play(lin);
      break;
      case (category.length > 0) && (dificulty.length > 0) &&  (type.length > 0):
      lin = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${dificulty}&type=${type}`;
      play(lin);
      break;
    default:
      a = "https://opentdb.com/api.php?amount=10";
      play(a)
      break;
  }

}

async function play(a) {
  let normal = await fetch(a);
  let trivia = await normal.json();
  let preguntas = trivia.results;
  console.log(normal);

  let html = "";
  for(let i=0; i<preguntas.length; i++) {
      html = html + generar_pregunta(preguntas[i],i) 
  }
  html = html + resultBtn();
  contenedor_trivia.innerHTML = html;
}

function resultBtn() {
  return `
    <button  class="btn btn-primary TR" onclick="resultado()">
      Resultado
    </button>
  `;
}

function resultado() {
  let spant = document.querySelectorAll('span');
  console.log(spant);

  let num = 0;
  for (let i = 0; i < spant.length; i++) {
    if (spant[i].textContent == "Correcto!") {
      num += 100;
    } 
  }
  console.log(num);
  html = "";
  html = html + `
    <h2 clas="result"> tu puntaje fue ${num}</h2>
  `;

  contenedor_trivia.innerHTML = html;
}