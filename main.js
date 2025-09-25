const input = document.querySelectorAll(".form-control");

const bookmark = document.querySelector(".bookmark");
let sites = JSON.parse(localStorage.getItem("site") || "[]");
const removeAll = document.querySelector(".btnremve");
const searchinput = document.querySelector(".search");
const TextDanger = document.querySelectorAll(".text-danger");
const Addbtn = document.querySelector(".Addbtn");
const updatebtn = document.querySelector(".updatebtn");
const vlidateName =()=>{

const regex = /^[A-Z][a-zA-Z]{2,}$/;
let itemindex=null;

if(regex.test(input[0].value)){
  input[0].classList.remove("is-invalid");
  input[0].classList.add("is-valid");
    TextDanger[0].textContent = "";

  return true;

}
else{
  input[0].classList.remove("is-valid");
  input[0].classList.add("is-invalid");
    TextDanger[0].textContent = "invalid Name please try again";

  return false;
}
}

const passwordvalidation = ()=>{
const regexpassword = /^[0-9]{5,}$/;

if(regexpassword.test(input[3].value)){
  input[3].classList.remove("is-invalid");
  input[3].classList.add("is-valid");
      TextDanger[3].textContent = "";

  return true;
}
  else{
    input[3].classList.remove("is-valid");
    input[3].classList.add("is-invalid"); 
        TextDanger[3].textContent = "invalid Passwored please try again";

    return false;
   }



}

const EmailValidation = ()=>{
  const regexemail = /^[a-z]{3,}@gmail.com$/;

  if(regexemail.test(input[2].value)){
    input[2].classList.remove("is-invalid");
    input[2].classList.add("is-valid");
          TextDanger[2].textContent = "";

    return true;
  }
  else{
   input[2].classList.remove("is-valid");
   input[2].classList.add("is-invalid");
           TextDanger[2].textContent = "invalid email please try again";

   return false;



  }
}

input[2].addEventListener("blur",EmailValidation);
input[3].addEventListener("blur",passwordvalidation);




input[0].addEventListener("blur",vlidateName);
const displaytable = ()=>{
const res = sites.map((si,index)=>{

   return `<tr>
   <td>${index}</td>
   <td>${si.name}</td>
   <td>${si.url}</td>
   <td>${si.email}</td>
   <td>${si.password}</td>
   <td><button class="btn btn-outline-danger" onclick="remveBookeitem(${index})">Delete</button></td>
      <td><button class="btn btn-outline-primary Editbtn" onclick="EditBookeitem(${index})">Edit</button></td>

   </tr>`


 }).join(' ');

document.querySelector(".sitedata").innerHTML =res;

} 
 Addbtn.addEventListener("click",(e)=>{

  let isvalid =true; 
if(!vlidateName() || !passwordvalidation() || !EmailValidation()){
  isvalid=false;
}
if(isvalid==false)return;


 e.preventDefault();
const site = {
    name:input[0].value,
    url:input[1].value,
    email:input[2].value,
    password:input[3].value
}
sites.push(site);
localStorage.setItem("site",JSON.stringify(sites));
console.log(sites);
bookmark.reset();
 displaytable();

 })





 


 displaytable();


 removeAll.addEventListener("click",(e)=>{
e.preventDefault();
localStorage.removeItem("sites");
sites = [];
displaytable();

 })
 
const  remveBookeitem = (index)=>{
sites.splice(index,1);
localStorage.setItem("sites",JSON.stringify(sites));
displaytable();


}
const EditBookeitem = (index)=>{
itemindex=index;
Addbtn.classList.add("d-none");
updatebtn.classList.remove("d-none");
input[0].value = sites[index].name;
input[1].value = sites[index].url;
input[2].value = sites[index].email;
input[3].value = sites[index].password;


}







updatebtn.onclick=

function(e){
e.preventDefault();
/*
 const site ={
   name:input[0].value,
    url:input[1].value,
    email:input[2].value,
    password:input[3].value
}
const item = sites.findIndex((s)=>{
  return site.name ==s.name;
})
*/
console.log(itemindex);

const site2={
name :input[0].value,
url :input[1].value,

email :input[2].value,
password :input[3].value

  }
  console.log(site2);
  sites.splice(itemindex,1,site2);

localStorage.setItem("site",JSON.stringify(sites));
 displaytable();



};






  




searchinput.addEventListener("input",()=>{

const filtersite = searchinput.value.toLowerCase();
const filterSitesArray = sites.filter((site)=>{


return site.name.toLowerCase().includes(filtersite);


})
console.log(filterSitesArray);
})













