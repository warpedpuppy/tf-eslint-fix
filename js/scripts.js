//creates array of pokemon with properties name, type, weight, and gender
//wrapped in IIFE
let pokemonRepository = (function () {
    let pokemonList = [
        {
            name:'Vulpix',
            type:['fire'],
            weight: 55,
        },
        {
            name:'Bulbasoar',
            type:['grass'],
            weight:70,
        },
        {
            name: 'Torracat',
            type:['fire'],
            weight:120,
        }
    ];

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

    function showDetails(pokemon){
        console.log(pokemon);
    }


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
    //creates new object, sent to repository
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        addListener: addListener

    };
})();

//adds a pokemon to repository
pokemonRepository.add( {
    name: 'Pikachu',
    type: ['electric'],
    weight:30,
});

//writes pokemon list
pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});
