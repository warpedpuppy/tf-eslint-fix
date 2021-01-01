//creates array of pokemon with properties name, type, weight, and gender


let pokemonList = [
    {
        name:'Vulpix',
        type:['fire'],
        weight: 55,
        gender: 'female',
    },
    {
        name:'Bulbasoar',
        type:['grass'],
        weight:70,
        gender:'male',
    },
    {
        name: 'Torracat',
        type:['fire'],
        weight:120,
        gender: 'female',
    }
]


//Prints list of pokemon & their weight
for(i = 0; i < pokemonList.length; i++){
    document.write(pokemonList[i].name + ' (Weight: ' +  pokemonList[i].weight + ')');
        if (pokemonList[i].weight >= 100){
            document.write(' Wow! Thats big!' + '<br>');
        }
        else{
            document.write("<br>");
        }
}
