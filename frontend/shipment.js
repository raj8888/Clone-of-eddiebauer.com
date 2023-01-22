
let loginbtn=document.getElementById("log-btn")
loginbtn.addEventListener("click",(event)=>{
    event.preventDefault()
    let email=document.getElementById("emailip")
    let pass=document.getElementById("passip")
    if(email.value=="alfaadmin@gmail.com" && pass.value==="adalfa123"){
        let obj={
            email:email.value,
            password:pass.value
        }
        renderadminpage(obj)
    }else{
        let obj={
            email:email.value,
            password:pass.value
        }
        loginUser(obj)
    }
    
})
async function renderadminpage(obj){
    try {
        let data=await fetch("https://modern-buckle-lion.cyclic.app/admin/login",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(obj)
       })
       if(data.ok){
        alert('admin login successfull')
        window.location.href="admin-home.html"
        
       }else{
        alert("wrong credentials")
       }
       } catch (error) {
        console.log(error)
        
       }
}


async function loginUser(obj){
    try {
     let data=await fetch("https://modern-buckle-lion.cyclic.app/users/login",{
     method:"POST",
     headers:{
         "Content-type":"application/json"
     },
     body:JSON.stringify(obj)
    })
    if(data.ok){
     let temp=data.json()
     .then(res=>
     {
         let token=res.token
         let userID=res.userID
         let firstName=res.firstName
         localStorage.setItem('token',token)
         localStorage.setItem('id',userID)
         localStorage.setItem('firstName',firstName)
         showname()
     }    
     )
     alert('login successfull')
    }else{
     alert("wrong credentials")
    }
    } catch (error) {
     console.log(error)
     
    }
 }

 let locstrgName=localStorage.getItem('firstName')
 if(locstrgName){
    showname()
 }

function showname(){
    let fname=localStorage.getItem("firstName")
    if(fname){
    let log_btn=document.getElementById("log-reg-button")  
    log_btn.innerText=`
     Hi! ${fname}
    `
    log_btn.setAttribute("id", "shownamediv"); 

    let drpbtn=document.getElementById("drpcontent-div")
    drpbtn.innerHTML=`
    <div id="reg">
    <h3>Profile</h3>
    <h3>Notifications</h3>
    <h3>Change Address</h3>
    <h3>Check Orders</h3>
    <h3>Check Cart</h3>
    <h3>Favorites</h3>
        <button id="log-out">LOG OUT</button>
    </div>
    `
    }
    let timeout=setTimeout(() => {
       window.location.href='index.html'
      }, 500)

    clearTimeout(timeout);

    let log_out=document.getElementById("log-out")
    log_out.addEventListener("click",(event)=>{
    logOutfun()
})
   
}


function logOutfun(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('firstName');
    window.location.href='index.html'
}

let foot_sp=document.getElementById("foot-cna-btn")
foot_sp.addEventListener("click",(event)=>{
    window.location.href="register.html"
})

let newpage_btn=document.getElementById("newbtn-navbar")
newpage_btn.addEventListener('click',(event)=>{
    window.location.href='newpage.html'
})


let user_id=localStorage.getItem('id')
loadCart(user_id)
async function loadCart(id){
    
    try {
        let bagData=await fetch(`https://modern-buckle-lion.cyclic.app/users/bagitems/${id}`)
        if(bagData.ok){
            let temp=bagData.json()
            .then(res=>{
            let itemsArray=res.itemsArray
            if(itemsArray.length==0){
            //    renderDataForZitem()
            }else{
                let array=itemsArray
                let obj={
                    itemsArray:array
                }
                getcartData(obj)
            }
            })
        }
    } catch (error) {
        
    }
}

async function getcartData(itemsArray){
    // console.log(itemsArray)
    try {
    let data=await fetch("https://modern-buckle-lion.cyclic.app/mens/cartitem",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(itemsArray)
    })
    if(data.ok){
        let temp=data.json()
        .then(res=>{
            let renderData=res.data
            renderPrize(renderData)
        })
    }else{
        console.log("error")
    }
    } catch (error) {
        console.log(error)
    }
}


function renderPrize(data){
    let total=0.00
    let main=0
    let merch=0.00
    for(let i=0;i<data.length;i++){
        total+=+(data[i]["display_price"])+10
        main+=+(data[i]["display_price"])
    }
    let discout=total-main
    let shipfee;
    if(main>50){
        shipfee="free"
    }else{
        shipfee="$2"
    }
    let shipment=document.getElementById("total-amount-cart")
    shipment.innerHTML=`
    <h2 id="bag-sum">BAG SUMMARY</h2>
          <div class="all-ship-info">
            <div class="ship-ti">
              <p>Merchandise</p>
              <p>Total Prize</p>
              <p>Discount</p>
              <p>Shipping</p>
            </div>
            <div class="prize-div">
              <p id="merchad">$${merch}</p>
              <p id="tp">$${total}</p>
              <p id="discount">$${discout}</p>
              <p id="ship">${shipfee}</p>
            </div>
          </div>
          <hr id="sumhr">

          <div class="all-ship-info">
            <div class="ship-ti">Subtotal</div>
            <div class="prize-div">
            <p id="main-pp">$${main}</p>
            </div>
          </div>
          <div id="coupon-sec">
            <input type="text" placeholder="Enter coupon code(optional)" id="code-val">
            <button id="cc-apply">APPLY</button>
          </div>
          <div><p id="show-cc-msg"></p></div>
          
    `
    let ccode=document.getElementById("cc-apply")
    ccode.addEventListener("click",(event)=>{

        let codevalue=document.getElementById("code-val")
        if(codevalue.value==="adventurealpha20"){
            let merchtemp=document.getElementById("merchad")
            merchtemp.innerText="$20"
            let mainprize=document.getElementById("main-pp")
            main=main-20
            mainprize.innerText=`$${main}`
            let msg=document.getElementById('show-cc-msg')
            msg.style.color='green'
            msg.innerText="Succesully Applied !"
        }else{
            let msg=document.getElementById('show-cc-msg')
            msg.style.color='red'
            msg.innerText="Not Valid Code"
        }
    })

}

// timepass