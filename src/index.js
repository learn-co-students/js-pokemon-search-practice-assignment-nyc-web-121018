document.addEventListener('DOMContentLoaded', () => {
  //console.log(POKEMON)

  let pContainer = document.querySelector("#pokemon-container")

  function populate() {
    for (let poke of POKEMON) {
      let divCard = document.createElement('div')
      let divframe = document.createElement('div')
      let divImage = document.createElement('div')
      let title = document.createElement('h1')
      let image = document.createElement('img')

      divCard.className = "pokemon-card"
      divframe.className = "pokemon-frame"
      title.className = "center-text"
      title.innerText = poke["name"]
      divImage.className = "pokemon-image"
      image.dataset.id = poke["id"]
      image.dataset.action = "flip"
      image.className = "toggle-sprite"
      image.src = poke["sprites"]["front"] //|| poke["sprites"]["back"]

      pContainer.appendChild(divCard)
      divCard.appendChild(divframe)
      divframe.appendChild(title)
      divframe.appendChild(divImage)
      divImage.appendChild(image)
    }
  }
  populate()

  let form = document.querySelector("#pokemon-search-form")
  form.addEventListener('input', function(search) {
    let text = search.target.value
    const names = document.querySelectorAll(".pokemon-card")

    for (let name of names) {
      if (name.innerText.includes(text)) {
        name.style.display = "block"
      } else {
        name.style.display = "none"
      }
    }
  })

  pContainer.addEventListener('click', function(flip) {

    console.log(flip.target);
    console.log(flip.target.dataset.id);

    let found = flip.target.dataset.id

    for (let poke of POKEMON) {

      if (poke["id"] === parseInt(found)) {
        if (flip.target.src === poke["sprites"]["front"]) {
          let newImg = poke["sprites"]["back"]
          flip.target.src = newImg
        } else {
          let newImg = poke["sprites"]["front"]
          flip.target.src = newImg
        }


      }
    }
  })

})
//
// <div class="pokemon-card">
//   <div class="pokemon-frame">
//     <h1 class="center-text">charizard</h1>
//     <div class="pokemon-image">
//       <img data-id="7" data-action="flip" class="toggle-sprite" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png">
//     </div>
//   </div>
// </div>
