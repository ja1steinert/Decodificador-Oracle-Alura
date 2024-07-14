function encodeText(text) {

    const letterMapping = {
        a: "ai",
        e: "enter",
        i: "imes",
        o: "ober",
        u: "ufat"
    }

    // Variável vazia que é incrementada com letras do texto fornecido.
    let encodedTxt = "";
    for (char of text) {
        /* Substitui letras do texto original pelos valores correspondentes em letterMapping,
           mantendo letras não mapeadas inalteradas. */
        if (letterMapping[char]) {
            encodedTxt += letterMapping[char]
        }
        else {
            encodedTxt += char;
        }
    }

    // Retorna o texto codificado.
    return encodedTxt;
}

/* Função que decodifica um texto codificado, percorrendo uma lista de letras 
   e pulando um número específico de índices para decodificar cada letra. */
function decodeText(text) {
    // String vazia para armazenar o texto decodificado.
    let decodedTxt = "";
    // Lista contendo todas as letras do texto codificado.
    let letters = text.split("");

    /* Loop que percorre cada letra do texto codificado e decodifica 
       seguindo as regras especificadas para cada letra. */
    for (i = 0; i < letters.length; i++) {
        if (letters[i] == "a") {
            decodedTxt += letters[i];
            i += 1;
        } else if (letters[i] == "e") {
            decodedTxt += letters[i];
            i += 4;
        } else if (letters[i] == "i" || letters[i] == "o" || letters[i] == "u") {
            decodedTxt += letters[i];
            i += 3;
        } else {
            decodedTxt += letters[i];
        }
    }

    // Retorna o texto decodificado após processamento.
    return decodedTxt;
}

// Função que deleta a mensagem inicial "Nenhuma Mensagem Encontrada"
function deleteTemporaryElements() {
    const temporaryElements = document.querySelectorAll('.temporary');

    temporaryElements.forEach(element => {
        element.parentNode.removeChild(element);
    });

    // Adicionando um "return" para não atrapalhar o fluxo do EventListener
    return;
}

// Animação para o título do Header
document.addEventListener("DOMContentLoaded", () => {
    const titleElement = document.getElementById("title");
    const targetText = "Decodificador";
    const animationDelay = 75;
    let currentIndex = 0;

    const animateTitle = () => {
        if (currentIndex <= targetText.length) {
            titleElement.textContent = targetText.slice(0, currentIndex);
            currentIndex++;
            setTimeout(animateTitle, animationDelay);
        }
    };

    animateTitle();
});

let encodeButton = document.getElementById("encodeButton");
let decodeButton = document.getElementById("decodeButton");

let textOutput = document.getElementById("output");
let textSession = document.getElementById("section2");

// Botão com EventListener que codifica o texto do elemento "textarea"
encodeButton.addEventListener("click", function () {

    let textArea = document.getElementById("writtenText");
    let textToProcess = textArea.value;

    deleteTemporaryElements()

    // Mostra o resultado + animacao de scroll down
    textOutput.innerHTML = encodeText(textToProcess)
    textSession.scrollIntoView({behavior: 'smooth'});

});

// Outro Botão com EventListener, mas que decodifica o texto do mesmo elemento.
decodeButton.addEventListener("click", function () {

    let textArea = document.getElementById("writtenText");
    let textToProcess = textArea.value;

    textOutput.innerHTML = decodeText(textToProcess)

});

