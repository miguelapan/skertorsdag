import {httpService} from "/app.js";

const todoList = document.querySelector('.todo-list')
const doneList = document.querySelector('.done-list')
const postBtn = document.querySelector('.btn-post')
const putBtn = document.querySelector('.btn-put')
const inputMain = document.querySelector('.input-main')
const modal = document.querySelector('.modal')
const modalClose = document.querySelector('.modalBtn')

let lastIndex = 6;

inputMain.focus()

async function dataHandler(type, todo) {
    const data = await httpService[type](todo);
// GET 
    if(type === "get") {
        data.forEach((element, index) => {
            todoCreator(element, index)
        });
// POST 
    }
    else if(type === "post"){
        const safardetva = {
            title: inputMain.value,
            completed: false
        }
        lastIndex++;
        todoCreator(safardetva, lastIndex)
        inputMain.value = ""
    }
}

// SKAPAR BOXES INNHÅLLER DELETE

function todoCreator(element, index) {
        console.log(element.title);
        const todoContainer = document.createElement('div')
        const todoPara = document.createElement('p')
        const todoBtn = document.createElement('button')
        const clrBtn = document.createElement('button')
        const modIndex = 1 + index;
        
        todoContainer.dataset.index = modIndex
        todoContainer.setAttribute('class', 'box-style')

        if(!element.completed){
            todoList.append(todoContainer)
            todoContainer.append(todoPara)
            todoContainer.append(todoBtn)
            todoBtn.innerText = "DONE"
        }else{
            doneList.append(todoContainer)
            todoContainer.append(todoPara)
            todoContainer.append(todoBtn)
            todoContainer.append(clrBtn)
            todoBtn.innerText = "UNDO"
            clrBtn.innerText = "CLEAR"
        } 
        todoPara.innerText = element.title;
        

        todoBtn.addEventListener('click', () => {
            clickHandler(todoBtn.innerText, todoBtn.parentElement, clrBtn, modIndex)
        })
        clrBtn.addEventListener('click', e => {
            // DELETE 
            dataHandler("delete", modIndex)
            clrBtn.parentElement.remove()
            console.log("TODO BORTTAGEN");
        })     
}

postBtn.addEventListener('click', e => {
    e.preventDefault()
    if(inputMain.value == ""){
        modal.showModal()
        return false
    }
    dataHandler("post", inputMain.value)
}) 


dataHandler("get")

function clickHandler(type, element, button, index) {

    // PUT 

    if(type === "DONE"){
        doneList.append(element)
        element.lastChild.innerText = "UNDO"
        element.append(button)
        button.innerText = "CLEAR"
        dataHandler("put", index, true)
    }else if(type === "UNDO"){
        todoList.append(element)
        element.lastChild.remove()
        element.lastChild.innerText = "DONE"
        dataHandler("put", index, false)
    }
}


modalClose.addEventListener('click', e => {
    modal.close()
})