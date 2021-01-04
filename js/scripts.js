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
        if(typeof pokemon !== 'object'
         && "name" in pokemon
         && "type" in pokemon
         && "weight" in pokemon

     ){
        return document.write('Not an object');
      }
        else{
            pokemonList.push(pokemon);
            }
    }
    return {
        getAll: getAll,
        add: add,
    };
})();

//adds a pokemon to repository
pokemonRepository.add({
    name: 'Pikachu',
    type: ['electric'],
    weight:30,
});

//writes pokemon list
pokemonRepository.getAll().forEach(function(pokemon) {
    document.write(pokemon.name + " (type: " + pokemon.type + ")" + " (weight " + pokemon.weight + ")" + "<br>");
});
