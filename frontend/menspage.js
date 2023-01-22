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







getalldata()
async function getalldata(page=0){
    try {
        let data=await fetch(`https://modern-buckle-lion.cyclic.app/mens?p=${page}`,{
            method:"GET",
            headers:{
                "Content-type":"application/json"
            }
        })
    if(data.ok){
        let temp=data.json()
        .then(res=>{
            let allData=res.data
            let totalcount=res.totalcount
            renderAllData(allData)
            totalcount=Math.ceil(totalcount/20)
            renderPaginationButtons(totalcount)

        })
    }else{
        alert("Don't able to render data")
    }
    } catch (error) {
  
    }
}
// https://eddiebauer.scene7.com/is/image/EddieBauer/D0880163_182C1?$328V1$
// sciQKALjsrc2

function  renderAllData(allData){
    let alldatadiv=document.getElementById("mens-data-render").innerHTML=""
    let showData=allData.map((elem)=>{
        return`
        <div class="men-one">
          <div class="men-img" >
            <img src=${elem.sciQKALjsrc2} alt="">
            
          </div>
          <div class="mens-one-info">
            <h4 class="mens-title">${elem.title}</h4>
           <div class="mens-prize">
           <p class="strike-p">${elem.strike_price}</p>
            <p class="main-p">$${elem.display_price}</p>
           </div>
            <p class="mens-colors-count">${elem.color_label}</p>
            <div class="men-rate-count">
              <p class="mens-rate">${elem.star}</p>
              <p class="main-count">${elem.sceXEjpC}</p>
            </div>
            <hr>
          </div>
          <div class="men-one-colors">
            <img src=${elem.color_imgsrc1} alt="">
            <img src=${elem.color_imgsrc2} alt="">
            <img src=${elem.color_imgsrc3} alt="">
          </div>
          <div class="men-see-more"><button class="see-more" data-id=${elem._id}>See More</button></div>
        </div>
        `
    })
    document.getElementById("mens-data-render").innerHTML=showData.join("")
    let all_mens_div = document.querySelectorAll(".see-more");
    for(let card of all_mens_div){
        card.addEventListener("click",(event)=>{ 
      let data_id = event.target.dataset.id;
      localStorage.setItem("productID",data_id)
      window.location.href="product.html"
     
  });
  // console.log(card.target)
    }
}

let paginationWrapper = document.querySelector("#pagination");

function renderPaginationButtons(total_pages){
    paginationWrapper.innerHTML = `
      <div className="pagination-btn-list">
	  ${CreatePagButton(total_pages).join(" ")}
      </div>
    `;
    // handle click of pagination-btn(s)
    let paginationButtons =  document.querySelectorAll('.pagination-btn');
    for (let paginationButton of paginationButtons) {
      paginationButton.addEventListener('click', function(e){
        let page_number = e.target.dataset.id;
        page_number=+(page_number)-1
        getalldata(page_number)
      })
    }
  }




function getAsButton(text, cls, dataId ) {
	return `<button class="${cls}" ${dataId ? `data-id = ${dataId}` : ''} >${text}</button>`
}

function CreatePagButton(total_page){
   let array = [];
   for(let page=1; page<=total_page;page++){
   	array.push(getAsButton(page,"pagination-btn",page))
   }
   return array;
}
