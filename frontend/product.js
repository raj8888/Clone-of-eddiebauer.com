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
     let data=await fetch("http://localhost:4500/users/login",{
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


let proId=localStorage.getItem("productID")
// localhost:4500/mens/product/63c8e6fc04199f22ca1758f4

if(proId){
    showPro()
    async function showPro(){
        let profetch=await fetch(`http://localhost:4500/mens/product/${proId}`)
        if(profetch.ok){
            profetch.json()
            .then(res=>
                renderProduct(res.data[0]))
        }
    }
}


function renderProduct(elem){
    let showproduct=document.getElementById("pro-mid-div")
    showproduct.innerHTML=`
    <div id="pro-img">
            <img src=${elem.sciQKALjsrc2} alt="">
        </div>
        <div id="mid-info-pro">
            <h1>${elem.title}</h1>
            <div id="pro-prize">
               <p id="strike-prize-pro">${elem.strike_price}</p>
               <p id="main-prize-pro">$${elem.display_price}</p>
            </div>
            <p id="totbuy">Totle Buys:${elem.sceXEjpC}</p>
            <p class="fa fa-star checked" id="rate">${elem.star}</p>
            <p id="offer-line">W/ Code TOPSDEAL Buy 2 Save 10%, Buy 3 Save 20%, Buy 4+ Save 30%</p>
            <hr>
                <button id="regular-btn">Regular</button>
                <button id="tall-btn">Tall</button>
                <p id="colors-ava">Available Colors: ${elem.color_label}</p>
                <img src=${elem.color_imgsrc1} alt="">
                <img src=${elem.color_imgsrc2} alt="">
                <img src=${elem.color_imgsrc3} alt="">
                <p id="selec-size">Selected Size: S</p>
                <div id="sizes-div">
                <button value="S" id="ssize">S</button>
                <button value="M" id="msize">M</button>
                <button value="L" id="lsize">L</button>
                <button value="XL" id="xlsize">XL</button>
                <button value="XXL" id="xxlsize">XXl</button>
                <button value="XXXL" id="xxxlsize">XXXl</button>
                </div>
                <select name="" id="selecquan">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                </select>
                <button id="addtobag">ADD TO BAG</button>
        </div>
    `
    let sizediv=document.getElementById("sizes-div")

    let s=document.getElementById("ssize")
    s.addEventListener("click",(event)=>{
       let showsize=document.getElementById("selec-size")
       showsize.innerText="Selected Size: S"
    })
    let m=document.getElementById("msize")
    m.addEventListener("click",(event)=>{
       let showsize=document.getElementById("selec-size")
       showsize.innerText="Selected Size: M"
    })
    let l=document.getElementById("lsize")
    l.addEventListener("click",(event)=>{
       let showsize=document.getElementById("selec-size")
       showsize.innerText="Selected Size: L"
    })
    let xl=document.getElementById("xlsize")
    xl.addEventListener("click",(event)=>{
       let showsize=document.getElementById("selec-size")
       showsize.innerText="Selected Size: XL"
    })
    let xxl=document.getElementById("xxlsize")
    xxl.addEventListener("click",(event)=>{
       let showsize=document.getElementById("selec-size")
       showsize.innerText="Selected Size: XXL"
    })
    let xxxl=document.getElementById("xxxlsize")
    xxxl.addEventListener("click",(event)=>{
       let showsize=document.getElementById("selec-size")
       showsize.innerText="Selected Size: XXXL"
    })
}









    






