//Search + CRUD
//U: edit a pokemon
//D: delete a pokemon
let allPokemons = []
document.addEventListener('DOMContentLoaded', () => {
  //******************************************************************************
  //R: SHOW ALL POKEMON
  //******************************************************************************
    const pokemonContainer = document.querySelector('#pokemon-container')

    function showAllPokemon(pokemons) {
      pokemonContainer.innerHTML = pokemons.map(addHTMLForPokemon).join("")
    }

    function fetchAllPokemon() {
      fetch('http://localhost:3000/pokemon')
        .then(resp => resp.json())
        .then(data =>{
          //ASSIGN allPokemons LOCAL VARIABLE TO THE API
          allPokemons = data
          showAllPokemon(allPokemons)
        })
    }
    fetchAllPokemon()
  //******************************************************************************
  //S: SEARCH FOR POKEMON
  //******************************************************************************
    const pokemonSearchInput = document.querySelector("#pokemon-search-input")

    pokemonSearchInput.addEventListener("input", e => {
      const filteredPokemons = allPokemons.filter(pokemon => {
        return pokemon.name.includes(e.target.value)
      })
      showAllPokemon(filteredPokemons)
    })
  //******************************************************************************
  //C: CREATE A NEW POKEMON
  //******************************************************************************
    const newPokemonForm = document.querySelector("#pokemon-new-form")

    newPokemonForm.addEventListener("submit", e => {
      e.preventDefault();
      const name = e.target.name.value
      const image = e.target.image.value

      fetch("http://localhost:3000/pokemon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: name,
          sprites: {
            front: image
          }
        })
      }).then(response => response.json())
        .then(newPokemon => {
          allPokemons.push(newPokemon)
          showAllPokemon(allPokemons)
        })
      newPokemonForm.reset()
    })
  //******************************************************************************
  //U: UPDATE AN EXISTING POKEMON
  //******************************************************************************
    pokemonContainer.addEventListener('click', e => {
      const currentId = e.target.dataset.id
      const currentPokemonObject = allPokemons.find(pokemon => pokemon.id === parseInt(currentId))
      const currentPokemonIndex = allPokemons.indexOf(currentPokemonObject)
      if (e.target.innerHTML === 'edit'){
        e.target.innerHTML += `<form id="pokemon-edit-form" class="" action="index.html" method="post">
              <input id="pokemon-edit-input" type="text" name="name" value="${currentPokemonObject.name}">
              <br>
              <input id="pokemon-edit-input" type="text" name="image" value="${currentPokemonObject.sprites.front}">
              <br>
              <input id="edit-btn" type="submit" name="submit" value="edit">
            </form>`

        let pokemonEditForm = document.querySelector("#pokemon-edit-form")

        pokemonEditForm.addEventListener('submit', e => {
          e.preventDefault();
          const name = e.target.name.value
          const image = e.target.image.value
          fetch(`http://localhost:3000/pokemon/${currentId}`, {
            method: 'PATCH',
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              name: name,
              sprites: {
                front: image
              }
            })
          })//fetch end
          allPokemons[currentPokemonIndex].name = name
          allPokemons[currentPokemonIndex].sprites.front = image
          showAllPokemon(allPokemons)
          pokemonEditForm.style.display = 'none'
        })
      }//end of edit if statment
    //******************************************************************************
    //D: DELETE AN EXISTING POKEMON
    //******************************************************************************
    if (e.target.innerHTML === 'delete'){
      fetch(`http://localhost:3000/pokemon/${currentId}`, {
        method: 'DELETE',
      })//fetch end
      allPokemons.splice(currentPokemonIndex, (currentPokemonIndex+1))
      e.target.parentElement.parentElement.remove()
    }//end of delete if statment
  })//end of pkmn container event listener
})//end of DOMContentLoaded


//helper function for creating HTML for each pokemon
function addHTMLForPokemon(pokemon) {
  return `<div class="pokemon-card">
            <div class="pokemon-frame">
              <h1 class="center-text">${pokemon.name}</h1>
              <div class="pokemon-image">
                <img data-id="${pokemon.id}" data-action="flip" class="toggle-sprite" src="${pokemon.sprites.front}" height="96" width="96">
              </div>
              <br>
              <button id="#new-submit-btn" data-id="${pokemon.id}" type="button" name="edit">edit</button>
              <button id="#new-submit-btn" data-id="${pokemon.id}" type="button" name="delete">delete</button>
            </div>
          </div>`
}
