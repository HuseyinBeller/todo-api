const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('.todoItem span')
const todoComplete = document.querySelectorAll('.todoItem span.completed')

Array.from(deleteBtn).forEach((el) => {
          el.addEventListener('click', deleteTodo)
})




// Update ediyoruz burada addeventlistener Update için event listener ile
Array.from(todoItem).forEach((el) => {
          el.addEventListener('click', markComplete)
})



// Uncompleted 
Array.from(todoComplete).forEach((el) => {
          el.addEventListener('click', undo)
})


async function deleteTodo() {

          // We are gonna grab the text next to it
          const todoText = this.parentNode.childNodes[1].innerText
          try {

                    // We are fetching the database
                    const response = await fetch('deleteTodo', {

                              //Delete request
                              method: 'delete',

                              // Expect some Json
                              headers: { 'Content-type': 'application/json' },

                              //  We can send it  body request to fect as well and rainbowunicorn property olarak atadık istedigimiz atayabiliriz. todoText'in içindeki textleri tıkladığımız that had to work deletede
                              // body: Json.stringify ile we are sending request body
                              body: JSON.stringify({
                                        'rainbowUnicorn': todoText
                              })
                    })
                    const data = await response.json()
                    console.log(data)
                    location.reload() //  delete yaptğımız gibi sayfayı yeniliyoruz.
          } catch (err) {
                    console.log(err);
          }
}


// Update click up click on markcompleted function 
async function markComplete() {
          const todoText = this.parentNode.childNodes[1].innerText
          try {
                    const response = await fetch('markComplete', {
                              method: 'put',
                              headers: { 'Content-type': 'application/json' },
                              body: JSON.stringify({
                                        'rainbowUnicorn': todoText
                              })
                    })
                    const data = await response.json()
                    console.log(data);
                    location.reload()
          } catch (err) {
                    console.log(err);
          }
}


// Uncompleted Update
async function undo() {
          const todoText = this.parentNode.childNodes[1].innerText
          try {
                    const response = await fetch('undo', {
                              method: 'put',
                              headers: { 'Content-type': 'application/json' },
                              body: JSON.stringify({
                                        'rainbowUnicorn': todoText
                              })
                    })
                    const data = await response.json()
                    console.log(data);
                    location.reload()
          } catch (err) {
                    console.log(err);
          }
}