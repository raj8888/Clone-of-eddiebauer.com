
async function renderuserdata(){
    try {
        let data=await fetch("https://modern-buckle-lion.cyclic.app/users/all")
    if(data.ok){
        let temp=data.json()
        .then(res=>{
            let userData=res.data
            renderData(userData)
        })
    }else{
        alert("something went wrong")
    }
    } catch (error) {
        console.log(error)
    }
}


let datatemp = document.querySelector("#selectdata");
datatemp.addEventListener("change", (event) => {
 if (datatemp.value === "user" ) {
    renderuserdata()
  }else{
    
allmensdata()
  }
});

allmensdata()
async function allmensdata(page=0){
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
           let allmens=res.data
           let totalcount=res.totalcount
           rendermensdata(allmens)
           totalcount=Math.ceil(totalcount/20)
           renderPaginationButtons(totalcount)
        })
    }else{
        alert("Don't able to render data")
    }
    } catch (error) {
  
    }
}

function rendermensdata(data){
    let tabelCont = document.querySelector(".maincontainer");
  let tabelhead = document.querySelector(".pro_tbl_head");
  tabelhead.innerHTML = `
        <div class="comp_logo">
           <h4>Product Image</h4>
        </div>
        <div class="comp_name">
            <h4>Title of Product</h4>
        </div>
        <div class="job_role">
            <h4>Total Buys</h4>
        </div>
        <div class="Edit_sec">
            <h4>Edit Data</h4>
        </div>
        <div class="delet_sec">
            <h4>Delete Data</h4>
        </div>
       
  `;
  tabelCont.innerHTML = "";
  let newdata = data.map((item) => {
    return `
    <div class="task">
        <div class="comp_logo">
           <img src="${item.sciQKALjsrc2
           }" alt="${item.sciQKALjsrc2
           }">
        </div>
        <div class="comp_name">
            <h4>${item.title
                }</h4>
        </div>
        <div class="job_role">
            <h4>${item.sceXEjpC}</h4>
        </div>
        <div class="Edit_sec">
            <button class="edt_btn" data-id=${item._id}>Edit Data</button>
        </div>
        <div class="delet_sec">
            <button class="dlt_btn" data-id=${item._id}>Delete Data</button>
        </div>
        
    </div>
    `;
  });
  tabelCont.innerHTML = newdata.join(" ");    
  let all_delete_btn = document.querySelectorAll(".dlt_btn");
  for(let btn of all_delete_btn){
      btn.addEventListener("click",(event)=>{ 
        let data_id = event.target.dataset.id;
       dltproduct(data_id)
    });
  }

  let all_edit_btn = document.querySelectorAll(".edt_btn");
      for(let btn of all_edit_btn){
      btn.addEventListener("click",(event)=>{ 
        let data_id = event.target.dataset.id;
        localStorage.setItem("editId",data_id)
        window.location.href="admin-edit-page.html"
		});
}
}

async function dltproduct(data_id){
   try {
    let passid=await fetch(`https://modern-buckle-lion.cyclic.app/mens/delete/${data_id}`,{
        method:'DELETE',
    })
    if(passid.ok){
        alert("Item deleted succesfully")
        window.location.reload()
    }else{
        alert("Item not deleted.")
    }
   } catch (error) {
    console.log(error)
   }
}

function renderData(data){
    let tabelCont = document.querySelector(".maincontainer");
    let tabelhead = document.querySelector(".pro_tbl_head");
    tabelhead.innerHTML = `
      
      <div class="profile_pic">
          <h4>First Name</h4>
      </div>
      <div class="username">
          <h4>Last Name</h4>
      </div>
      <div class="email_id">
          <h4>Email ID</h4>
      </div>
      <div class="phone_num">
          <h4>Phone Number</h4>
      </div>
      <div class="date">
          <h4>Total buys</h4>
      </div>
           
      `;
    tabelCont.innerHTML = "";
    let newdata = data.map((item) => {
      return `
      <div class="task">
      <div class="profile_pic">
      <h4>${item.firstName}</h4>
      </div>
      <div class="username">
          <h4>${item.lastName}</h4>
      </div>
      <div class="email_id">
          <h4>${item.email}</h4>
      </div>
      <div class="phone_num">
          <h4>${item.mobile}</h4>
      </div>
      <div class="date">
          <h5>${item.location}</h5>
      </div>
     </div>
        `;
    });
    tabelCont.innerHTML = newdata.join(" ");
    let paginationWrapper = document.querySelector("#pagination-wrapper")
    paginationWrapper.innerHTML=""
}

let paginationWrapper = document.querySelector("#pagination-wrapper");

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
        allmensdata(page_number)
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

let add_btn=document.querySelector("#add_page_btn")
add_btn.addEventListener("click",(event)=>{
  localStorage.removeItem("editId")
  window.location.href="admin-edit-page.html"

})