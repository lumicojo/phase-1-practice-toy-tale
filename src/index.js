let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetchToys()          
const toyForm = document.getElementById('toy-form')
console.log(toyForm)
//toyForm.addEventListener('submit', createNewToy)  this is automatic
toyForm.addEventListener('submit', (event) => createNewToy(event, toyForm))

});
//A `POST` request should be sent to http  witch i save it all ready to a variable
const baseUrl = 'http://localhost:3000/' 
const toysUrl = baseUrl + 'toys/' 



function createNewToy(event, toyForm) {
  event.preventDefault()
  console.log(toyForm)

  let postRequest = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Accepts': 'application/json',
    },
    body: JSON.stringify({
      name: toyForm.name.value,
      image: toyForm.image.value,
      likes: 0
    })
  }

  fetch(toysUrl, postRequest)
  .then(response => response.json())
  .then(data => renderToy(data))
}

function clearElement(element) {
  while ( element.firstChild)
    element.firstChild.remove()
}

function fetchToys() {
  fetch(toysUrl)
  .then(res => res.json())
  .then(toys => renderToys(toys))
}

function renderToys(toys) {
  toys.forEach(toy => renderToy(toy))   //render for one toy at the time                                  
}

function renderToy(toy, div) {
    
    const toyCollectionDiv = document.getElementById('toy-collection')
    div = document.createElement('div')
    div.classList += 'card'
    toyCollectionDiv.appendChild(div)
  }

  const h2 = document.createElement('h2')
  h2.textContent = toy.name
  div.appendChild(h2)

  const img = document.createElement('img')
  img.src = toy.image
  img.className = 'toy-avatar'
  div.appendChild(img)

  const p = document.createElement('p')
  p.textContent = `${toy.likes} Likes`
  div.appendChild(p)

  const button = document.createElement('button')
  button.className = 'like-btn'
  button.id = toy.id
  button.textContent = 'Like ❤️'
  button.addEventListener('click', () => increaseLikes(toy, p)) 
  div.appendChild(button)
    
}

function increaseLikes(toy, p) {
  //console.log("I like this toy!",toy)
  //patch request 
  let patchRequest = {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      'Accepts': 'application/json',
    },
    body: JSON.stringify({
      likes: toy.likes + 1
    })
  }
  fetch(toysUrl + toy.id, patchRequest)
  .then(resp => resp.json())
  .then(toyData => {
    p.textContent = `${toyData.likes} likes`
    console.log('likes:', toyData.likes) 
  })
}
