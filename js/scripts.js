//creates array of pokemon with properties name, type, weight, and gender

      //wrapped in IIFE
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
//    let pleaseWait = 'Loading...'
    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if (typeof pokemon !== 'object') {
            return 'Not an object';
        } else if ("name" in pokemon && "type" in pokemon && "weight" in pokemon) {
            return `Object doesn't have required properties`;
        } else {
            pokemonList.push(pokemon);
        }
    }


    function showLoadingMessage() {
        spinner.className = "show";
        setTimeout(() => {
            spinner.className = "show";
        }, 5000);
    };

    function hideLoadingMessage() {
        spinner.className.remove('show');
    };

//creates buttons for pokemon
    function addListItem(pokemon){
        let pokemonList = document.querySelector('.pokemon-list');
        let listPokemon = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('nameButton');
        addListener(button, pokemon);
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
    }

    function addListener(button, pokemon){
        button.addEventListener('click', function(event) {
            event.preventDefault();
            showDetails(pokemon);
        })
    }

    async function loadList() {
//        showLoadingMessage();
        try {
            const response = await fetch(apiUrl);
            const json = await response.json();
            //            hideLoadingMessage();
            json.results.forEach(function(item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        } catch (e) {
            //            hideLoadingMessage();
            console.error(e);
        }
    }

//add timeout function to show loader while loading
    async function loadDetails(item) {
        let url = item.detailsUrl;
//        showLoadingMessage();
        try {
            const response = await fetch(url);
            const details = await response.json();
            //        hideLoadingMessage();
            item.imageUrl - details.sprites.front_default;
            item.weight = details.weight;
            item.types = details.types;
        } catch (e) {
            //            hideLoadingMessage();
            console.error(e);
        }
    }

    function showDetails(pokemon){
        pokemonRepository.loadDetails(pokemon).then(function () {
        console.log(pokemon);
        });
    }

    //creates new object, sent to repository
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        addListener: addListener,
        loadList:loadList,
        loadDetails: loadDetails,
        showDetails:showDetails
    };
})();


//writes pokemon list
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
