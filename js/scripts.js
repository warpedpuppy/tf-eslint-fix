//creates array of pokemon with properties name, type, weight, and gender
//wrapped in IIFE
let pokemonRepository = (function () {
  const pokemonList = [];
  const modalContainer = document.querySelector('#modal-container');
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  //gets pokemon
  function getAll() {
    return pokemonList;
  }
  //adds pokemon to array
  function add(pokemon) {
    if (typeof pokemon !== 'object') {
      return 'Not an object';
    } else if ('name' in pokemon && 'type' in pokemon && 'weight' in pokemon) {
      return `Object doesn't have required properties`;
    } else {
      pokemonList.push(pokemon);
    }
  }

  //shows spinner
  function showLoadingMessage() {
    spinner.className = 'show';
  }
  //hides spinner
  function hideLoadingMessage() {
    spinner.className = 'hide';
  }

  //creates buttons for pokemon
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('list-item');
    listPokemon.classList.add('group-list-item');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn-sm', 'btn-dark', 'nameButton');
    addListener(button, pokemon);
    listPokemon.appendChild(button);

    pokemonList.appendChild(listPokemon);
  }

  // loads list of pokemon from api
  async function loadList() {
    try {
      showLoadingMessage();
      const response = await fetch(apiUrl);
      const json = await response.json(); //json is format for pulling data (like javascript object but not one)
      json.results.forEach(function (item) {
        //results is an array method (only works for arrays)
        let pokemon = {
          //creates object
          name: item.name,
          detailsUrl: item.url,
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
    const url = item.detailsUrl;
    try {
      showLoadingMessage();
      const response = await fetch(url);
      const details = await response.json();
      item.imageUrl = details.sprites.other.dream_world.front_default;
      item.weight = details.weight;
      item.height = details.height;
      item.types = [];
      for (let i = 0; i < details.types.length; i++)
        item.types.push(' ' + details.types[i].type.name);
      hideLoadingMessage();
    } catch (e) {
      hideLoadingMessage();
      console.error(e);
    }
  }
  //adds listener to listen for click so it will run show details
  function addListener(button, pokemon) {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      showDetails(pokemon);
    });
  }

  //shows pokemon details to console
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  //shows modal
  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalHeader = $('.modal-header');
    let modalTitle = $('.modal-title');
    let btn_close = $('#btnClose');

    $('#modal-container').modal('show');
    modalHeader.empty(), modalTitle.empty(), modalBody.empty();

    let titleElement = $('<h2>' + pokemon.name + '</h2>');
    let imageElement = $("<img class='modal-img'>");
    imageElement.attr('src', pokemon.imageUrl);

    let heightElement = $('<p>Height: ' + pokemon.height + ' m </p>');
    let weightElement = $('<p>Weight: ' + pokemon.weight + ' kg </p>');

    let typesElement = $('<p>Types: ' + pokemon.types + '</p>');

    modalHeader.append(titleElement);
    modalBody.append(imageElement);
    modalBody.append(typesElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalHeader.append(btn_close);
  }

  //hides modal
  function hideModal(event) {
    event.preventDefault();
    modalContainer.classList.remove('is-visible');
  }

  //eventListener
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal(event);
    }
  });

  //adds event listener
  modalContainer.addEventListener('click', (event) => {
    let target = event.target;
    if (target === modalContainer) {
      hideModal(event);
    }
  });
  //returns functions
  return {
    //new object is created with {}
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    addListener: addListener,
    loadList: loadList, //creates reference for .loadList to trigger
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

//writes pokemon list
pokemonRepository.loadList().then(function () {
  //loadList is only possible due to return statement
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

function searchPokemon() {
  let searchText = document.querySelector('#pokemon-search').value;
  let x = searchText.toLowerCase();
  let poke = document.querySelectorAll('list-item');
  for (let i = 0; i < poke.length; i++) {
    let y = poke[i].innerText;
    if (y.toLowerCase().indexOf(x) > -1) {
      poke[i].style.display = '';
    } else {
      poke[i].style.display = 'none';
    }
  }
}

windows.addEventListener('keydown', function (e) {
  if (e.keyCode == '13') {
    e.preventDefault();
  }
});
