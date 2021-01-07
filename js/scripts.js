//creates array of pokemon with properties name, type, weight, and gender
//wrapped in IIFE
let pokemonRepository = (function () {
    //let modalContainer = document.querySelector('#modal-container');
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    //gets pokemon
    function getAll() {
        return pokemonList;
    }
    //adds pokemon to array
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
    };

    function hideLoadingMessage() {
        spinner.className = 'hide';
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


//shows pokemon details to console
    function showDetails(pokemon){
        pokemonRepository.loadDetails(pokemon).then(function () {
        console.log(pokemon);
        });
    }


// loads list of pokemon from api
    async function loadList() {
        try {
            showLoadingMessage();
            const response = await fetch(apiUrl);
            const json = await response.json();
            json.results.forEach(function(item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
            hideLoadingMessage();
        } catch (e) {
            hideLoadingMessage();
            console.error(e);
        }
    }

// loads specific details of api
    async function loadDetails(item) {
        let url = item.detailsUrl;
        try {
            showLoadingMessage();
            const response = await fetch(url);
            const details = await response.json();
            item.imageUrl - details.sprites.front_default;
            item.weight = details.weight;
            item.types = details.types;
        //    hideLoadingMessage();
        } catch (e) {
            hideLoadingMessage();
            console.error(e);
        }
    }
//adds listener to listen for click so it will run show details
    function addListener(button, pokemon){
        button.addEventListener('click', function(event) {
            event.preventDefault();
            showDetails(pokemon);
        })
    }




//creates model
    /*function showModal(title, text) {
        modalContainer.innerHtml = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);
        let titleElement = document.createElement('h1');
        titleElement.innerText = title;
        let contentElement = document.createElement('p');
        contentElement.innerText = text;
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);
        modalContainer.classList.add('is-visibile');

    }

//hides modal
    function hideModal() {
        modalContainer.classList.remove('is-visibile');
    }

//makes listner for click to show the modal
    document.querySelector('#show-modal').addEventListener('click', () => {
        showModal('Modal title', 'This is the modal content');
    });

//adds listener to close modal on escape
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visibile'))
        {
            hideModal();
        }
    });

//adds listener for click to close modal
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });*/

    //returns functions
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
