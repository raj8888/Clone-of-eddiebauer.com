let reg_btn=document.getElementById("signup-btn")
reg_btn.addEventListener("click",(event)=>{
    event.preventDefault()
    let firstName=document.getElementById("fname")
    let lastName=document.getElementById("lname")
    let email=document.getElementById("email")
    let location=document.getElementById("loc")
    let mobile=document.getElementById("mob")
    let pass=document.getElementById('password')
    let repass=document.getElementById("repassword")
    let locval=location.value || "NA"
    let mobval=mobile.value || "NA"
    let repasscheck=repass.value
    let obj={
        firstName:firstName.value,
        lastName:lastName.value,
        email:email.value,
        location:locval,
        mobile:mobval,
        password:pass.value
    }
let tempDiv=document.getElementById("div-show-msg")
if( obj["password"]!=repasscheck){
    tempDiv.innerHTML=`
    <h3 id="pass-match-msg" style="color:red;">Password didn't match</h3>
    `
}else{
    tempDiv.innerHTML=`
    <h3 id="pass-match-msg" style="color:green;">Password matched</h3>
    `
    regUser(obj)
}
})

async function regUser(obj){
    try {
        let data=await fetch("http://localhost:4500/users/register",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(obj)
       })
       if(data.ok){
        alert(`User Registered Successfully \n For Login check on Home Page`)
        window.location.href="index.html"
       }else{
        alert("User Registered with same Email-ID")
        
       }
       } catch (error) {
        console.log(error)
       }
}

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

