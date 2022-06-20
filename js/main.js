//get ui element
var productName = document.getElementById('productName');
var productCategory = document.getElementById('productCategory');
var productPrice = document.getElementById('productPrice');
var productDescription = document.getElementById('productDescription');
var table = document.getElementById('tbody');
//control btn 
var btnContainer =  document.getElementById('control')
console.log(btnContainer)
btnContainer.innerHTML = `<button onclick=" createProduct(); " class="btn btn-primary mt-3">add product</button>`;
//products container
var products = [];

//CRUDs FUNCTIONs
//Create Function
function createProduct(){
    var product = {
        pname: productName.value,
        pcat: productCategory.value,
        price: productPrice.value,
        pdescription: productDescription.value
    }
    if(product.pname != ""){
      products.push(product);
      console.log(products);
      display()
      clear();
    }else{
      alert('You Should put roduct Name!')
    }
    
}
//Clear Function 
function clear(){
    productName.value  = "";
    productCategory.value = "";
    productPrice.value = "";
    productDescription.value = "";
   
}
//Display Function
function display(){
    trs = "";
    for(var i = 0; i < products.length; i++){
       trs += `
       <tr>
      <td>${i + 1}</td>
      <td>${products[i].pname}</td>
      <td>${products[i].pcat}</td>
      <td>${products[i].price}</td>
      <td>${products[i].pdescription}</td>
      <td>
        <button class="btn btn-outline-success" onclick="getProduct(${i})"> <i class="fa fa-solid fa-edit"></i>  </button>
      </td>
      <td>
        <button class="btn btn-outline-danger" onclick="removeProduct(${i})"> <i class="fa fa-solid fa-trash-can"></i>  </button>
      </td>
    </tr>`
    }
  table.innerHTML = trs;
}
//Update function

function getProduct(index){
    btnContainer.innerHTML = `<button onclick=" update(${index}); " class="btn btn-primary mt-3">update</button>`
    productName.value  = products[index].pname;
    productCategory.value = products[index].pcat;
    productPrice.value = products[index].price;
    productDescription.value = products[index].pdescription; 
}
function update(index){
    products[index] = {
        pname: productName.value,
        pcat: productCategory.value,
        price: productPrice.value,
        pdescription: productDescription.value
    };
    clear();
    btnContainer.innerHTML = `<button onclick=" createProduct(); " class="btn btn-primary mt-3">add product</button>`;
    display();
}
//Dlete Function
function removeProduct(index){
    products.splice(index, 1);
    display();
}
//Search Function
function search(){
    var search = document.getElementById('search')
    var keyword = search.value
    var trs = '';
    for (var i = 0; i < products.length; i++){ 
        if(products[i].pname.includes(keyword)){
            trs += `
            <tr>
           <td>${i + 1}</td>
           <td>${products[i].pname}</td>
           <td>${products[i].pcat}</td>
           <td>${products[i].price}</td>
           <td>${products[i].pdescription}</td>
           <td>
             <button class="btn btn-outline-success" onclick="getProduct(${i})"> <i class="fa fa-solid fa-edit"></i>  </button>
           </td>
           <td>
             <button class="btn btn-outline-danger" onclick="removeProduct(${i})"> <i class="fa fa-solid fa-trash-can"></i>  </button>
           </td>
         </tr>`
        }
    }
    if (trs === ''){
        alert('Not Result!');
        display();
        search.value = "";
    }else{
        table.innerHTML = trs;
    }
}
