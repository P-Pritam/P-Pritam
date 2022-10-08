
//chrome://extensions/

const input_El=document.getElementById("input-el")
const input_btn=document.getElementById("input-btn")
const out_put=document.getElementById("output")
const delbtn=document.getElementById("del-btn")
const tab_btn = document.getElementById("tab-btn")

let newstore=[]
let listitems


const localleads = JSON.parse(localStorage.getItem("storeleads"))

if (localleads) {
        newstore=localleads
        storeitems(newstore)
}

function storeitems(store){
    listitems = ""
    for (let i = 0; i < store.length; i++) {
        // out_put.innerHTML += "<li>" + store[i] + "</li>"
        // console.log(store[i])
        // const li = document.createElement("li")
        // li.textContent = store[i]
        // out_put.append(li)
        //listitems += "<li><a target=_blank href = '"+store[i]+"'>" + store[i] + "</a></li>"

        listitems += `
                <li>
                    <a target='_blank' href ='${store[i]}'>
                        ${store[i]}
                    </a>
                </li>
            `
    }
    out_put.innerHTML  = listitems
}

input_btn.addEventListener("click",function(){
    newstore.push(input_El.value)
    console.log("Button clicked!")
    localStorage.setItem("storeleads",JSON.stringify(newstore))
    input_El.value = ""
    storeitems(newstore)
})

delbtn.addEventListener("click",function(){
    console.log("Button double clicked!")
    localStorage.clear()
    newstore = []
    storeitems(newstore)
})

tab_btn.addEventListener("click",function(){

    chrome.tabs.query({active : true, currentWindow: true},function(tabs){
        newstore.push(tabs[0].url)
        localStorage.setItem("storeleads",JSON.stringify(newstore))
        storeitems(newstore)
    })
    //console.log(tabs[0].url)
})