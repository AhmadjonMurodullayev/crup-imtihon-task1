const result = document.getElementById("result");
const save = document.getElementById("save")
const open_moda = document.getElementById("open-modal")
const user_modal = document.getElementById("user-modal")
const close = document.getElementById("close")
let form = {}
document.addEventListener("DOMContentLoaded", function(){
    open_moda.addEventListener("click",openMadal)
    save.addEventListener("click",saveProdact)
})
function openMadal(){
    toggelModal("block")
}
function handleChange(event){
    const {name,value} = event.target
    form = {...form, [name]:value}
  }

function toggelModal(status){
    user_modal.style.display = status
}

window.addEventListener("click", function(event){
    if(event.target === user_modal){
        toggelModal("none")
    }
  })
 async function saveProdact(){
    try{
        const response  = await fetch("http://localhost:3000/Prodact",{
            method: 'POST',
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(form)
        })
     console.log(response);
     
    }catch(error){
        console.log(error)
        
    }
  }