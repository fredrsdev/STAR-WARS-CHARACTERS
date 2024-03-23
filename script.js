
// Logica do código:

        // 1º Processa a variavel "currentPageUrl" recebendo a Url 'https://swapi.dev/api/people/'; 
        // 2º Processa a função "loadCharacters" recebendo a informação armazenada na variavel "currentPageUrl" ;
        // 3º Executa a função loadCharacters(url), reconstruindo os cards de acordo a Api;
        // 4º Ao clicar no butão proxima pagina monitoradoa pelo codigo  nextButton.addEventListener('click', loadNextPage), a função async function loadNextPage (), será chamada.
        // 5º A função async function loadNextPage () irá fazer um nova requisição para pagina atual na variavel currentPageUrl = 'https://swapi.dev/api/people/'; 
        // 6º chamando a expressão "await loadCharacters(responseJson.next)" passando a url da pagina 2 que é a next.
        // 7º A função  sync function loadCharacters(url) irá receber as informações da pagina 2,limpar as informações dos dados anteriores pelo comando  mainContent.innerHTML = '';
        // 8ª Reconstroi todos os cards da pagina 2 conforme API;
        // 9º A variavel currentPageUrl = url recebe as informações da pagina 2 apresentado em tela;  


//Variavel que vai armazenar o link da API: https://swapi.dev/api/people/  Documentotação da Api: https://swapi.dev/api/people/

// Usado e variavel "let" por que os valores armazenados na API sofre alterações, no qual, não é possivel com a variavel "const".

let currentPageUrl = 'https://swapi.dev/api/people/'; 

// "window.onload", usado para todas a vezes que a pagina for recarregada essa função será chamada.

window.onload = async () => {
    
    // try seguinifica tentativa. Se a tentativa for com sucesso executa a função, se não apresenta erro no console "catch".

    try {
        await loadCharacters(currentPageUrl);
    } catch (error){
        console.log(error);
        alert('Ero ao carregar cards');
    }

    //OBS: As variaveis do butão foi adicionado dentro da função window.onload, devido a variave let ser de execução local, assim que carregar a pagina a função será chamada sem problemas.

    const nextButton = document.getElementById('next-button') //O butão criado no html "next-button" está sendo anexado em variáveis;
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage) // o metodo "addEventListener" monitora eventos, neste caso o "click", "loadNextPage" é o nome da função criada para o evento click.
    backButton.addEventListener('click', loadPreviousPage) 
};

    // função irá estperar a resposta da função try para receber a url, armazenada na variavel currentPageUrl; 

async function loadCharacters(url){

    const mainContent = document.getElementById('main-content'); // Recebe os dados do lik armazenado na variavel. 
    mainContent.innerHTML = ''; // limpar os resultados anteriores. Ex: limpa os resultados da pagina 1 e mostra  o proximo resultado.

    try{
        const response = await fetch (url); //"await" usado para aguardar a requisição acontecer antes de prosseguir com a função.
        const responseJson = await response.json(); //Variavel aplicada para converser os dados recebido pela URL em Json.

        //Essa função irá pegar apenas os dados do campo results armazenados na variavel e adiciondo em forma de array com o "forEach".

        // A partir dos dados com essa função será construido um novo html conforme exemplo, porem no javascript:

                    //<div class="main-content" id="main-content">
           
                    //<!-- Essa div dentro do main-container e para criação dos cards dos personagens-->

                    //<div class="cards" style="background-image: url('https://starwars-visualguide.com/assets/img/characters/1.jpg');">
                    //   <div class="character-name-bg">
                    //    <span class="character-name">Luke Skywalker</span>       
                    //</div>
                    // </div>

        responseJson.results.forEach((character) => { 

            const card = document.createElement("div"); // "document.createElement" irá construir um HTML com a função div.
            
            //${character.url.replace(/\D/g, "") usado esse expressão para mudança de personagens ocorerá através do metodo replace, o replace irá extrair o ID "1" no fim da url atraves de uma expressão regular RegExp (/\D/g, "") buscando um padão dentro de um grupo de caracteres.  
            
            card.style.backgroundImage = 
            `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')` 
            card.className = "cards"

            const characterNameBG = document.createElement("div")
            characterNameBG.className = "character-name-bg";
            
            const characterName = document.createElement("span")
            characterName.className = "character-name"
            characterName.innerText = `${character.name}` //busca a informação da chave name dentro da API.

            characterNameBG.appendChild(characterName) //"appendChild" irá levar a função characterName dentro da dive characterNameBG ou seja, div dentro de div.
            card.appendChild(characterNameBG)
          
          // Função para apresentar as informações dos personagens no modal.

          card.onclick = () => {
               const modal = document.getElementById("modal")
               modal.style.visibility = "visible" 

               const modalcontent = document.getElementById("modal-content")
               modalcontent.innerHTML = ''

                // Função para criação da imagem no modal:

               const characterImage = document.createElement("div")
               characterImage.style.backgroundImage = 
               `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
               characterImage.className = "character-image"

               // Função para buscar informações dos personagens na API:

               const name = document.createElement("span")
               name.className = "character-details"
               name.innerText = `Nome: ${character.name}`

               const characterHeight = document.createElement("span")
               characterHeight.className = "character-details"
               characterHeight.innerText = `Altura: ${convertHeight(character.height)}` // ? Por que ` Aspas `?

               const mass = document.createElement("span")
               mass.className = "character-details"
               mass.innerText = `Peso: ${convertMass(character.mass)}`

               const eyeColor = document.createElement("span")
               eyeColor.className = "character-details"
               eyeColor.innerText = `Cor dos olhos: ${convertEyeColor(character.eye_color)}`

               const birthYear = document.createElement("span")
               birthYear.className = "character-details"
               birthYear.innerText = `Nascimento: ${convertBirthYear(character.birth_year)}`

               //Função para mostrar as informações em tela:

               modalcontent.appendChild(characterImage)
               modalcontent.appendChild(name)
               modalcontent.appendChild(characterHeight)
               modalcontent.appendChild(mass)
               modalcontent.appendChild(eyeColor)
               modalcontent.appendChild(birthYear)
          }
          
            mainContent.appendChild(card)
        });

        // As variaveis do butão foram redeclaradas, devido estamos dentro de outra função.

        const nextButton = document.getElementById('next-button') 
        const backButton = document.getElementById('back-button')

        // "!responseJson.next" está analisandoas linhas  ("next": "https://swapi.dev/api/people/?page=2" = true e "previous": null = false) dentro da API, no qual, iremos obter a informação de comando dos butões.   

        nextButton.disabled = !responseJson.next; // A função "disabled = !responseJson.next" irá informar quando a função será true ou false, sendo que a "!" esta negando reponseJson.next, a logica: se disabled = true está desabilitado, se disabled = false habilitado.
        backButton.disabled = !responseJson.previous;

        // Esta função tem a missão de stylizar o butão backButton tornando visivel, logica: se existir responseJson.previous? então butão visivel, se não invisivel.

        backButton.style.visibility = responseJson.previous? "visible" : "hidden";

        currentPageUrl = url

    }catch (error) {
        alert('Erro ao carregar os personagens')
        console.log(error);
    }

}

//Função do comando dos butões:

// lógica: quando o usuario clicar no butão NextButton a função LoadNextPage será chamada:

async function loadNextPage () {

    // logica para tratar erros ao carregar a pagina, logica: se currentPageUrl for false ou nulo irá interromper a execução da função, retornando a mensagem de erro:

    if (!currentPageUrl) return; 

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a próxima página')
    }
}

async function loadPreviousPage () {
    if (!currentPageUrl) return; 

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.previous)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a página anterior')
    }
}

// Função torna a tela de modal invisivel:

function hideModal() {
    const modal = document.getElementById("modal")
    
    //  função irá manter o item invisivel até que seja clicado:

    modal.style.visibility = "hidden" 
}


// Função para converter as cores para o português:

function convertEyeColor(eyeColor) {
    const cores = {
        blue: "azul",
        brown: "castanho",
        green: "verde",
        yellow: "amarelo",
        black: "preto",
        pink: "rosa",
        red: "vermelho",
        orange: "laranja",
        hazel: "avela",
        unknown: "desconhecido"
    };

         // comando para comparar as cores vindas da API:

            // toLowerCase(), irá converter os dados em minusculo para maiusculo;
            // return foi usado na função para retornar o resultado do processamento da função;

    return cores[eyeColor.toLowerCase()] || eyeColor;

}

    // Função para converte o valor interio da altura da API em decimais:

function convertHeight(height) {
    if (height === "unknown") {
        return "desconhecida"
    }

    // O valor recebido da API será dividido por 100 e o resultado é apresentado pelo toFixed com 2 casas decimais.

    return (height / 100).toFixed(2);
}

    // Função para converter a informação do peso vindo da API: 

        // Logica IF: Se o valor do campo height estiver "unknown" irá retorna valor desconhecido, senão retorna valor kg.

function convertMass(mass) {
    if (mass === "unknown") {
        return "desconhecido";
    }

    return `${mass} kg`;
}

function convertBirthYear(birthYear) {
    if (birthYear === "unknown") {
        return "desconhecido";
    }

    return birthYear;

}