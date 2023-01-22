function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
  

let dataId=localStorage.getItem("editId")||null
if(dataId==null){
   let edit_form= document.querySelector(".form_of_editing")
   edit_form.innerHTML=""
   let edit_btn=document.querySelector("#edit_bar")
   edit_btn.innerHTML=`
     <div id="add_bar">ADD DATA TO WEBSITE </div>
   `
   let add_form=document.querySelector(".form_of_editing")
   add_form.innerHTML=`
   <form id="edit_form">
   <div id="inside_form">
       <div class="comp_data" id="comp_nme">
           <label for="compmyName">Product Title : </label>
           <input type="text" id="company_name" placeholder="Enter product title..." required>
        </div>
        <div class="comp_data" id="comp_lgo">
           <label for="companylogo">URL of Image : </label>
        <input type="text" id="company-logo" placeholder="Enter URL of product here..." required>
        </div>
        <div class="comp_data" id="job_rle">
           <label for="jobrole">Strike Prize : </label>
           <input type="text" id="company_job_role" placeholder="Enter strike prize here..." required>
        </div>
        <div class="comp_data" id="comp_cntct">
           <label for="contact">Main Prize : </label>
           <input type="text" id="company_contact" placeholder="Enter main here..." required >
        </div>
        <div class="comp_data" id="comp_exp">
           <label for="experience">Color Labels :</label>
           <input type="text" id="company_exp" placeholder="Enter total colors or pattern" required>
        </div>
        <div class="comp_data" id="comp_slry">
           <label for="salary">Color label 1: </label>
           <input type="text" id="company_salary" placeholder="Enter URL of color 1..." required>
        </div>
        <div class="comp_data" id="comp_lct">
           <label for="location">Color label 2: </label>
           <input type="text" id="company_loca" placeholder="Enter URL of color 2..." required>
        </div>
        <div class="comp_data" id="comp_desc">
           <p><label for="description">Color label 3: </label></p>
           <input name="desc" id="company_desc" cols="30" rows="10" placeholder="Enter URL of color 3..." required></input>
        </div>
   </div>
   <div class="submit_btn">
       <div class="cancel_btn">
           <button id="cancel"><a href="./admin-home.html"> Cancel</a></button>
       </div>
       <div class="save_btn">
           <button id="save">Save</button>
       </div>
   </div>
   </form>
   ` 
   let save_add_btn=document.querySelector("#save")
   save_add_btn.addEventListener("click",(event)=>{
  event.preventDefault()
    let comp_name=document.querySelector("#company_name")
    let comp_logo=document.querySelector("#company-logo")
    let comp_job=document.querySelector("#company_job_role")
    let comp_contact=document.querySelector("#company_contact")
    let comp_exp=document.querySelector("#company_exp")
    let comp_salary=document.querySelector("#company_salary")
    let comp_lct=document.querySelector("#company_loca")
    let comp_desc=document.querySelector("#company_desc")
    let obj={
        wrapperhref:"https://www.eddiebauer.com/p/91900097/men's-terrange-hiking-shoe?sp=1&color=Sprig",
        sciQKALjsrc2:comp_logo.value,
        title:comp_name.value,
        strike_price:comp_job.value,
        display_price:comp_contact.value,
        color_label:comp_exp.value,
        star:"4.1",
        sceXEjpC:"15",
        color_imgsrc1:comp_salary.value,
        color_imgsrc2:comp_lct.value,
        color_imgsrc3:comp_desc.value
        }
    addtoserver(obj)
   }) 
}

async function addtoserver(obj){
try {
    let add_data=await fetch('https://modern-buckle-lion.cyclic.app/mens/additem',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(obj)
        })
        if( add_data.ok){
          alert("Data Added Successfully")
        }else{
            alert("Data not added.\nPlease Try Again")
        }
} catch (error) {
    alert("Bad Request")
}
}

window.addEventListener("load",()=>{
   if(dataId!=null){
    editData(dataId)
    let edit_strt_btn=document.querySelector("#edit_pge_btn")
    setTimeout(() => {
          edit_strt_btn.innerText="Start Editing"
           }, 1000);
       edit_strt_btn.innerText="Fetching Data..."
   }
})
    

// let edit_strt_btn=document.querySelector("#edit_pge_btn")
// edit_strt_btn.addEventListener("click",(event)=>{
//     setTimeout(() => {
//         edit_strt_btn.innerText="In Process..."
//         editData(dataId)
//     }, 1000);
//     edit_strt_btn.innerText="Fetching Data..."
   
// })

async function editData(id){
    try {
        let edit_data=await fetch(`https://modern-buckle-lion.cyclic.app/mens/product/${id}`);
        if(edit_data.ok){
            let temp=await edit_data.json()
           .then(res=>{
            showdata(res.data[0])
           })
            // showdata(temp)
        }else{
            
        }
    } catch (error) {
        alert("Bad request")
    }
}

function showdata(data){

    let cname=document.querySelector("#company_name")
    cname.value=data["title"]
    cname.readOnly=true
    let clogo=document.querySelector("#company-logo")
    clogo.value=data["sciQKALjsrc2"]
    clogo.readOnly=true;
    let crole=document.querySelector("#company_job_role")
    crole.value=data["strike_price"]
    crole.readOnly=true
    let ccontact=document.querySelector("#company_contact")
    ccontact.value=data["display_price"]
    ccontact.readOnly=true
    let cexp=document.querySelector("#company_exp")
    cexp.value=data["color_label"]
    cexp.readOnly=true
    let csalary=document.querySelector("#company_salary")
    csalary.value=data["color_imgsrc1"]
    csalary.readOnly=true
    let cloc=document.querySelector("#company_loca")
    cloc.value=data["color_imgsrc2"]
    cloc.readOnly=true
    let cdesc=document.querySelector("#company_desc")
    cdesc.value=data["color_imgsrc3"]
    cdesc.readOnly=true
}

let temp_data=document.querySelector("#edit_pge_btn")
if(dataId!=null){
    temp_data.addEventListener("click",(event)=>{
        temp_data.innerText="Editing In Process..."
        let cname=document.querySelector("#company_name")
        cname.readOnly=false
        let clogo=document.querySelector("#company-logo")
        clogo.readOnly=false
        let crole=document.querySelector("#company_job_role")
        crole.readOnly=false
        let ccontact=document.querySelector("#company_contact")
        ccontact.readOnly=false
        let cexp=document.querySelector("#company_exp")
        cexp.readOnly=false
        let csalary=document.querySelector("#company_salary")
        csalary.readOnly=false
        let cloc=document.querySelector("#company_loca")
        cloc.readOnly=false
        let cdesc=document.querySelector("#company_desc")
        cdesc.readOnly=false
    })
}


let save_data=document.querySelector("#save")
if(dataId!=null){
    save_data.addEventListener("click",(event)=>{
        let temp_data=document.querySelector("#edit_pge_btn")
        temp_data.innerText="Start Editing"
        event.preventDefault()
        let data={}
            // sciQKALjsrc2:comp_logo.value,
    //     title:comp_name.value,
    //     strike_price:comp_job.value,
    //     display_price:comp_contact.value,
    //     color_label:comp_exp.value,
    //     star:"4.1",
    //     sceXEjpC:"15",
    //     color_imgsrc1:comp_salary.value,
    //     color_imgsrc2:comp_lct.value,
    //     color_imgsrc3:comp_desc.value
        let cname=document.querySelector("#company_name")
        data["title"]=cname.value
        let clogo=document.querySelector("#company-logo")
        data["sciQKALjsrc2"]=clogo.value;   
        let crole=document.querySelector("#company_job_role")
        data["strike_price"]=crole.value;   
        let ccontact=document.querySelector("#company_contact")
        data["display_price"]=ccontact.value;   
        let cexp=document.querySelector("#company_exp")
        data["color_label"]=cexp.value;   
        let csalary=document.querySelector("#company_salary")
        data["color_imgsrc1"]=csalary.value;   
        let cloc=document.querySelector("#company_loca")
        data["color_imgsrc2"]=cloc.value;   
        let cdesc=document.querySelector("#company_desc")
        data["color_imgsrc3"]=cdesc.value
        cname.readOnly=true
        clogo.readOnly=true;
        crole.readOnly=true
        ccontact.readOnly=true
        cexp.readOnly=true
        csalary.readOnly=true
        cloc.readOnly=true
        cdesc.readOnly=true
        finalData(data)
    })
}



async function finalData(obj){
    try {
        let edit_fetch=await fetch(`http:/https://modern-buckle-lion.cyclic.app/mens/update/${dataId}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(obj)
        })
        if(edit_fetch.ok){
          alert("Data edited and saved succefully!")
        }else{
            alert("Edited data not saved.")
        }
    } catch (error) {
        alert("Bad Request")
    }
}
