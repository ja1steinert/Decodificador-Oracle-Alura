// Lista usada pelas funções "encodeText" e "decodeText", determina as substituicoes.
const letterMapping = {
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat"
} 

function encodeText(text) {
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

function decodeText(text) {
    let decodedTxt = "";
    let i = 0;

    while (i < text.length) {
        let matched = false;
        
        // Verifica se uma substring começa com alguma das codificações
        for (const key in letterMapping) {
            if (text.startsWith(letterMapping[key], i)) {
                decodedTxt += key;
                i += letterMapping[key].length;
                matched = true;
                break;
            }
        }

        // Se não houver correspondência, adiciona o caractere atual
        if (!matched) {
            decodedTxt += text[i];
            i++;
        }
    }

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

