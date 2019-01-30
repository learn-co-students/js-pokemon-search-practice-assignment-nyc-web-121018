document.addEventListener('DOMContentLoaded', () => {
  console.log(POKEMON)
  //YOUR CODE HERE
  function populatePokemon(){
    // <div class="pokemon-card">
    //   <div class="pokemon-frame">
    //     <h1 class="center-text">charizard</h1>
    //     <div class="pokemon-image">
    //       <img data-id="7" data-action="flip" class="toggle-sprite" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png">
    //     </div>
    //   </div>
    // </div>
    POKEMON.forEach(function(pokemon){
      let pokemonCard = document.createElement("div")
      pokemonCard.className = "pokemon-card"

      let pokemonFrame = document.createElement("div")
      pokemonFrame.className = "pokemon-frame"

      let centerText = document.createElement("h1")
      centerText.className = "center-text"
      centerText.innerHTML = pokemon.name

      let pokemonImage = document.createElement("div")
      pokemonImage.className = "pokemon-image"

      let toggleSprite = document.createElement("img")
      toggleSprite.src = pokemon.sprites["front"]
      toggleSprite.className = "toggle-sprite"
      toggleSprite.dataset.id = pokemon.id
      toggleSprite.dataset.action = "flip"
      toggleSprite.addEventListener("click", function(){
        if(toggleSprite.src === pokemon.sprites["front"]){
          toggleSprite.src = pokemon.sprites["back"]
        }else{
          toggleSprite.src = pokemon.sprites["front"]
        }
      })

      let pokemonContainer = document.querySelector("#pokemon-container")
      pokemonImage.appendChild(toggleSprite)
      pokemonFrame.appendChild(centerText)
      pokemonFrame.appendChild(pokemonImage)
      pokemonCard.appendChild(pokemonFrame)
      pokemonContainer.appendChild(pokemonCard)

    })
  }

  const search = document.querySelector("#pokemon-search-input")
  let pokemonContainer = document.querySelector("#pokemon-container")

  search.addEventListener('input', function(){
    // debugger
    const input = this.value
    let allPokemon = [...pokemonContainer.children]
    allPokemon.forEach(function(pokemon){
      if(pokemon.innerText.includes(input)){
        console.log(`found ${pokemon.innerText}`)
        pokemon.style = "display : '' "
      } else {
        pokemon.style = "display: none"
      }
    })
  })

  populatePokemon();
})
