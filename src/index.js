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
  getToys()
  document.querySelector('form').addEventListener('submit', handleSubmit)
});

function getToys() {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toyData => toyData.forEach(renderToys))
}

function renderToys(toy) {
  let toyCollection = document.getElementById("toy-collection")
  let newToyDiv = document.createElement("div")
  newToyDiv.classList.add("card")
  toyCollection.appendChild(newToyDiv)
  let toyName = document.createElement("h2")
      toyName.innerText = toy.name 
  let img = document.createElement("img")
      img.src = toy.image
      img.classList.add("toy-avatar")
  let likes = document.createElement("p")
      likes.innerText = `${toy.likes} Likes`
      likes.id = toy.id
  let likesButton = document.createElement("button")
      likesButton.classList.add("like-btn")
      likesButton.innerText = "Like <3"
      likesButton.id = toy.id
      likesButton.value = `${toy.likes}`
      likesButton.addEventListener('click', likeToy)  
  newToyDiv.append(toyName, img, likes, likesButton)

}
function likeToy(e) {
  let newLikes = {
    likes: +e.target.value + 1
  }
  let reqObj = {
    headers: {"Content-Type": "application/json", Accept: "application/json"}, 
    method: "PATCH", 
    body: JSON.stringify(newLikes)
  }
  fetch('http://localhost:3000/toys/' + e.target.id, reqObj)
  .then(r => r.json())
  .then(updated => {
    document.getElementById(updated.id).innerText = `${updated.likes} Likes`
  })
}

function handleSubmit(e) {
  e.preventDefault()
  let newToy = {
    name: e.target[0].value, 
    image: e.target[1].value, 
    likes: 0
  }
  let reqObj = {
    headers: {"Content-Type": "application/json", Accept: "application/json"}, 
    method: "POST", 
    body: JSON.stringify(newToy)
  }
  fetch('http://localhost:3000/toys', reqObj)
  .then(r => r.json())
  .then(renderToys)
}