// login section

let loginbtn=document.getElementById("log-btn")
loginbtn.addEventListener("click",(event)=>{
    event.preventDefault()
    let email=document.getElementById("emailip")
    let pass=document.getElementById("passip")
    let obj={
        email:email.value,
        password:pass.value
    }
    loginUser(obj)
})

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
     window.location.href='index.html'
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

let reg_btn=document.getElementById('reg-button')
if(reg_btn){
    reg_btn.addEventListener("click",(event)=>{
        window.location.href='register.html'
    })
}




let user_id=localStorage.getItem('id')
if(user_id){
    loadCart(user_id)
}else{
    rendernotlogin()
}



function rendernotlogin(){
    let notlogin=document.getElementById('cart-mid-div')
    notlogin.innerHTML=`
    <div id="show-notlogin-msg">
            <img src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="">
            <h2>Missing Bag Items?</h2>
            <p>Login to see the items you added previously</p>
            <button id="mid-log-button">LOGIN</button>
        </div>
    `
    let midLog=document.getElementById('mid-log-button')
    midLog.addEventListener('click',(event)=>{
        window.location.href='register.html'
    })
}

async function loadCart(id){
    
    try {
        let bagData=await fetch(`https://modern-buckle-lion.cyclic.app/users/bagitems/${id}`)
        if(bagData.ok){
            let temp=bagData.json()
            .then(res=>{
            let itemsArray=res.itemsArray
            if(itemsArray.length==0){
               renderDataForZitem()
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
            bagData(renderData)
            renderPrize(renderData)
        })
    }else{
        console.log("error")
    }
    } catch (error) {
        console.log(error)
    }
}
function renderDataForZitem(){
    let notlogin=document.getElementById('cart-mid-div')
    notlogin.innerHTML=`
    <div id="show-notlogin-msg">
            <img src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="">
            <h2>Missing Bag Items?</h2>
            <p>Click to purchase products to buy</p>
            <button id="mid-log-button">Start Shopping</button>
        </div>
    `
    let midLog=document.getElementById('mid-log-button')
    midLog.addEventListener('click',(event)=>{
        window.location.href='index.html'
    })
}

function bagData(renderData){
    let alldatadiv=document.getElementById("show-proin-cart").innerHTML=""
    let showData=renderData.map(elem=>{
        return`
        <div class="pro-one">
            <div class="pro-img">
              <img src=${elem.sciQKALjsrc2} alt="">
            </div>
            <div class="pro-one-info">
              <h4 class="pro-title">${elem.title}</h4>
            </div>
            <div class="pro-prize">
              <p class="pro-strike-prize">${elem.strike_price}</p>
              <p class="pro-main-prize">$${elem.display_price}</p>
            </div>
            <p class="pro-colors-count">${elem.color_label}</p>
            <div class="pro-rate-count">
              <p class="pro-rate">${elem.star}</p>
              <p class="pro-count">${elem.sceXEjpC}</p>
            </div>
            <div class="pro-one-colors">
              <img src=${elem.color_imgsrc1} alt="">
              <img src=${elem.color_imgsrc2} alt="">
              <img src=${elem.color_imgsrc3} alt="">
            </div>
            <div class="pro-see-more">
              <select name="" class="pro-quan">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button class="see-more-btn" data-id=${elem._id}>See More</button></div>
              <div class="dlt-btn-div"><button class="dlt-btn" data-id=${elem._id}>Remove from bag</button></div>
              
          </div>
        `
    })
    document.getElementById("show-proin-cart").innerHTML=showData.join("")
    let all_mens_div = document.querySelectorAll(".see-more-btn");
    for(let card of all_mens_div){
        card.addEventListener("click",(event)=>{ 
      let data_id = event.target.dataset.id;
      localStorage.setItem("productID",data_id)
      window.location.href="product.html"
     
  });
  }

let all_pro_dlt = document.querySelectorAll(".dlt-btn");
let oldArray=renderData
for(let btn of all_pro_dlt){
btn.addEventListener("click",(event)=>{ 
let data_id = event.target.dataset.id;
let tempArray=oldArray.filter(elem=>{
   if (elem['_id']!=data_id){
    return elem['_id']
   }
})
let newArray=tempArray.map(elem=>{
    return elem['_id']
})
let obj={
    itemsArray:newArray,
    userID:localStorage.getItem('id')
}
updaterow(obj)
});
}


}

async function updaterow(obj){
try {
    let newarray=await fetch('https://modern-buckle-lion.cyclic.app/users/updateitems',{
        method:"PATCH",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(obj)
    })
    if(newarray.ok){
      window.location.reload()
    }
} catch (error) {
    
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
          <div id="checkout-sec">
            <button id="pay-btn">CHECKOUT NOW</button>
          </div>
          
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

    let ship_btn=document.getElementById("pay-btn")
    ship_btn.addEventListener('click',(event)=>{
        window.location.href='shipment_page.html'
    })
    
}