const BASE_URL = "https://jsonplaceholder.typicode.com/todos/"
const limit = "?_limit=7"

const handleHttpError = (error) => console.error(error);
const handleResponse = (response) => {
    if (!response.ok) {
        return handleHttpError();
    }
    return response.json()
};

export const httpService = {
    get: async () => {
        const response = await fetch(`${BASE_URL}${limit}`)
        if(!response.ok){
            return handleHttpError()
        }
        return response.json();
    },
    put: async (index, data) => {
        const response = await fetch(`${BASE_URL}${index}`, {
            method: "PUT",
            body: JSON.stringify({completed: data})
        })
        console.log(data);
        console.log("PUT COMPLETE");
        return handleResponse(response)
    },
    delete: async (index) => {
        const response = await fetch(`${BASE_URL}${index}`, {
            method: "DELETE",
        })
        console.log("DELETE COMPLETE");
        return handleResponse(response)
    },
    post: async (data) => {
        const response = await fetch(`${BASE_URL}`, {
            method: "POST",
            body: JSON.stringify({ completed: false, title: data })
        })
        console.log("POST COMPLETE");
        return handleResponse(response)
    }
}






























// const wrapper = document.querySelector('.wrapper')

// const todoList = document.querySelector('.todo-list')
// const doneList = document.querySelector('.done-list')

// const btnDelete = document.querySelector('.btn-delete')

// const input = document.querySelector('.input')

// const postData = {
//     title: input.value,
//     completed: false
// }

//     async function fetchHandler(url, type, info){
       

//         try{

//             const res = await fetch(url, {
//                 method: type,
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(info)
//             })
//             const data = await res.json()


//             // GET 

//         if(type == "GET"){
//             data.forEach((element, index) => {
//                 const todoContainer = document.createElement('div')
//                 todoContainer.setAttribute('class', 'todo-container')
//                 const todoPara = document.createElement('p')
//                 const doneBtn = document.createElement('button')
                
                
//                 todoPara.innerText = element.title;
//                 todoContainer.append(todoPara)
                
//                 if(element.completed){
//                     todoContainer.append(doneBtn)
//                     doneBtn.innerText = "UNDO"
//                     doneList.append(todoContainer)
//                 }else{
//                     todoContainer.append(doneBtn)
//                     doneBtn.innerText = "DONE"
//                     todoList.append(todoContainer)
//                 }

//                 const modIndex = 1 + index;

//                 // todoContainer.dataset.index = modIndex;
//                 // todoContainer.dataset.completed = element.completed;

//                 todoContainer.setAttribute('data-index', modIndex);
//                 todoContainer.setAttribute('data-completed', element.completed);

//                     // PUT 

//                     doneBtn.addEventListener('click', e => {
//                         fetchHandler(`${BASE_URL}${modIndex}`, "PUT")

//                         if(todoContainer.completed){
//                             todoList.append(todoContainer)
//                             todoContainer.completed = false;
//                             doneBtn.innerText = "DONE"
//                         } else {
//                             doneList.append(todoContainer)
//                             todoContainer.completed = true;
//                             doneBtn.innerText = "UNDO"
//                         }
//                         console.log(todoContainer.completed);
//                     })  
//             });
//         }
//         } catch(error){
//             console.error("Error:", error);
//         }  
//     }

//     // GET 
        
//         fetchHandler(`${BASE_URL}${limit}`, "GET")

//     // POST 
        
//         document.querySelector('.btn-post').addEventListener('click', e => {
//             e.preventDefault()
//             fetchHandler(`${BASE_URL}`, "POST", postData)
//             if (input.value == "") {
//                 console.log("TOM RUTA");
//                 return false                
//             }else{

//                 console.log(postData);
//                 const todoContainer = document.createElement('div')
//                 todoContainer.setAttribute('class', 'todo-container')
//                 const todoPara = document.createElement('p')
//                 const doneBtn = document.createElement('button')
                
//                 todoList.append(todoContainer)
//                 todoContainer.append(todoPara)
//                 todoContainer.append(doneBtn)

//                 todoPara.innerText = input.value
//                 doneBtn.innerText = "DONE"
//             }
// input.value = ""
            
//         })
    
//     // DELETE 

//     btnDelete.addEventListener('click', () => {
//         const todoContainers = document.querySelectorAll('.todo-container');
//         todoContainers.forEach((todoContainer) => {
//             const completed = todoContainer.dataset.completed === 'true' || todoContainer.completed === true;
//           if (completed) {
//             const modIndex = todoContainer.dataset.index;
//             fetchHandler(`${BASE_URL}${modIndex}`, 'DELETE');
//             todoContainer.remove();
//           }
//         });
//       });

