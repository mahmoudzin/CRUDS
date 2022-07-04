class Product {
  constructor(){
    this.index = 0;
    if (localStorage.getItem('products') == null){
      this.products = [];
    }else{
      this.products = JSON.parse(localStorage.getItem('products'));
    }
    this.productName = document.getElementById('productName');
    this.productCategory= document.getElementById('productCategory');
    this.productPrice = document.getElementById('productPrice');
    this.productDescription = document.getElementById('productDescription');
    this.openModal = document.getElementById('openModal');
    this.addBtn =  document.getElementById('addBtn');
    this.updateBtn =  document.getElementById('updateBtn');
    this.addBtn.addEventListener('click', ()=>{
      this.createProduct();
      this.clear();
      this.productName.classList.remove('is-valid')
      this.productCategory.classList.remove('is-valid')
      this.productPrice.classList.remove('is-valid')
    })
    this.updateBtn.addEventListener('click', this.updateProduct.bind(this))
    this.table = document.getElementById('tbody');
    this.table.addEventListener('click', (e)=>{
        if(e.target.hasAttribute('data-index') && e.target.dataset.type === 'edit'){
          this.getProduct(e.target.dataset.index)
          this.addBtn.classList.add('d-none');
          this.updateBtn.classList.remove('d-none')
        };
        if(e.target.hasAttribute('data-index') && e.target.dataset.type === 'delete'){
            
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              this.removeProduct(e.target.dataset.index)
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
              )
            }
          })
        };
    })
    
    this.openModal.addEventListener('click', ()=>{
        this.clear();
        this.addBtn.classList.remove('d-none');
        this.updateBtn.classList.add('d-none')
    })
    this.search = document.getElementById('search');
    this.searchType = document.getElementById('searchType');
    this.search.addEventListener('input',()=>{
      this.searchProduct(this.search.value)
    })
    this.selCat = document.getElementById('selCat');
    this.selCat.addEventListener('change',()=>{
      this.productCategory.value = this.selCat.value
    })
    this.productName.addEventListener('input',()=>{
      this.productNameValidation()
    })
    this.productCategory.addEventListener('input', ()=>{
      this.productCatValidation()
    })
    this.productPrice.addEventListener('input', ()=>{
      this.productPriceValidation()
      
    })
    if(this.products.length > 0){
      this.display(this.products)
      this.displayOldCategory()
  }
}
  praintAlert = (id, msg, show=true)=>{
    if(show){
      document.getElementById(id).innerHTML =
       `<div class="alert alert-danger" role="alert">
          ${msg}
        </div>`;
    }else{
      document.getElementById(id).innerHTML ="";
    }
  }
  addValidationClass = (elem, valid=true)=>{
      if(valid){
        elem.classList.remove('is-invalid')
        elem.classList.add('is-valid')
      }else{
        elem.classList.add('is-invalid')
        elem.classList.remove('is-valid')
      }
  }


  productNameValidation = ()=>{
    let RegExp = /^[\w\s_\.@]{4,20}$/;
      if(!RegExp.test(this.productName.value)){
        this.addValidationClass(this.productName, false)
        if(this.productName.value == '' || this.productName.value.length == 0){
          this.praintAlert('alertName', '', false)
        }
        else if(this.productName.value.length < 4){
          this.praintAlert('alertName', 'Product name should be 4 characters at less')
        }else if(this.productName.value.length > 20){
          this.praintAlert('alertName', 'Product name should\'nt more than 20 characters')
        }else{
          this.praintAlert('alertName', 'You can use letters, numbers, spaces and [@ . _]')
        }
        return false;
      }else{
        this.addValidationClass(this.productName)
        this.praintAlert('alertName', '', false)
        return true
      }
  }
  
  productCatValidation = ()=>{
    let RegExp = /^[\w\s_\.@]{4,20}$/;
      if(!RegExp.test(this.productCategory.value)){
        this.addValidationClass(this.productCategory, false)
        if(this.productCategory.value == '' || this.productCategory.value.length == 0){
          this.praintAlert('alertCat', '', false)
        }
        else if(this.productCategory.value.length < 4){
          this.praintAlert('alertCat', 'Product Category should be 4 characters at less')
        }else if(this.productCategory.value.length > 20){
          this.praintAlert('alertCat', 'Product Categry should\'nt more than 20 characters')
        }else{
          this.praintAlert('alertCat', 'You can use letters, numbers, spaces and [@ . _]')
        }
        return false;
      }else{
        this.addValidationClass(this.productCategory)
        this.praintAlert('alertCat', '', false)
        return true
      }
  }
  productPriceValidation = ()=>{
    let RegExp = /^[0-9]+$/;
      if(!RegExp.test(this.productPrice.value)){
        this.addValidationClass(this.productPrice, false)
        if(this.productPrice.value == '' || this.productPrice.value.length == 0){
          this.praintAlert('alertPrice', '', false)
        }
        else{
          this.praintAlert('alertPrice', 'You can only enter numbers')
        }
        return false;
      }else{
        this.addValidationClass(this.productPrice)
        this.praintAlert('alertPrice', '', false)
        return true
      }
  }
  displayOldCategory = () => {
    let options = '<option value=" ">chose Category....</option>'
    let uniqueCat = Array.from(new Set(this.products.map(p => p.pcat)))
      uniqueCat.forEach(item => {
        options += `<option value=${item}>${item}</option>`
      })     
      
      this.selCat.innerHTML = options;
  }

  createProduct = ()=>{
    const product = {
        pname: this.productName.value,
        pcat: this.productCategory.value,
        price: this.productPrice.value,
        pdescription: this.productDescription.value
    }

    if(this.productNameValidation() && this.productCatValidation() && this.productPriceValidation()){
      this.products.push(product);
      localStorage.setItem('products', JSON.stringify(this.products))
      this.display(this.products)
      this.displayOldCategory();
      Swal.fire({
        icon: 'success',
        title: 'Done..',
        text: 'you\'ve added a new product',
        showConfirmButton: false,
        timer: 1000
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There is something wrong, please try again',
      })
    }
  }
  display = (list) =>{
    let trs = "";
    for(let i = 0; i < list.length; i++){
      trs += `
       <tr>
      <td>${i + 1}</td>
      <td class='name'>${list[i].pname}</td>
      <td class='cat'>${list[i].pcat}</td>
      <td class='price'>${list[i].price}</td>
      <td>${list[i].pdescription}</td>
      <td>
        <button class="btn btn-outline-success" data-index='${i}' data-type='edit' data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa fa-solid fa-edit"></i></button>
      </td>
      <td>
        <button class="btn btn-outline-danger" data-index='${i}' data-type='delete'> <i class="fa fa-solid fa-trash-can"></i>  </button>
      </td>
    </tr>`
    }
    this.table.innerHTML = trs;
    }
  clear = ()=>{
      this.productName.value  = "";
      this.productCategory.value = "";
      this.productPrice.value = "";
      this.productDescription.value = "";
        
  }
  getProduct = (index)=>{
      this.productName.value  = this.products[index].pname;
      this.productCategory.value = this.products[index].pcat;
      this.productPrice.value = this.products[index].price;  
      this.productDescription.value = this.products[index].pdescription;
      this.index = index;
  }
  updateProduct = () =>{
    if(this.productNameValidation() && this.productCatValidation() && this.productPriceValidation()){
        this.products[this.index] = {
          pname: this.productName.value,
          pcat: this.productCategory.value,
          price: this.productPrice.value,
          pdescription: this.productDescription.value  
      };
      this.clear();
      localStorage.setItem('products', JSON.stringify(this.products));
      this.display(this.products);
      this.displayOldCategory()
      Swal.fire({
        icon: 'success',
        title: 'Done..',
        showConfirmButton: false,
        timer: 1000
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There is something wrong, please try again',
      })
    } 
    
  }
//Dlete Function
  removeProduct = (index) =>{
      this.products.splice(index, 1);
      localStorage.setItem('products', JSON.stringify(this.products));
      this.display(this.products);
      this.displayOldCategory()
  }
//Search Function
  searchProduct = (keyword) =>{
    let trs = '' 
    let type;
    let markName = '';
    let markPrice = '';
    let markCat = '';
      for (let i = 0; i < this.products.length; i++){ 
        
        let targetName = this.products[i].pname
        let targetPrice = this.products[i].price
        let targetCat = this.products[i].pcat

        switch(this.searchType.value){
          case 'productPrice':
            type = this.products[i].price.includes(keyword);
            break;
          case 'productCat':
            type = this.products[i].pcat.includes(keyword);
            break
          default:
            type = this.products[i].pname.includes(keyword);
   
        }
        if(keyword.length > 0 && this.searchType.value === 'productName'){
          markName = targetName.replace(keyword, `<span class="bg-costume text-white">${keyword}</span>`)
        }else{
          markName = targetName
        }
        if(keyword.length > 0 && this.searchType.value === 'productPrice'){
          markPrice = targetPrice.replace(keyword, `<span class="bg-costume text-white">${keyword}</span>`)
        }else{
          markPrice = targetPrice
        }
        if(keyword.length > 0 && this.searchType.value === 'productCat'){
          markCat = targetCat.replace(keyword, `<span class="bg-costume text-white">${keyword}</span>`)
        }else{
          markCat = targetCat
        }
        if(type){
          trs += `
            <tr>
            <td>${i + 1}</td>
            <td class='name'>${markName}</td>
            <td class='cat'>${markCat}</td>
            <td class='price'>${markPrice}</td>
            <td>${ this.products[i].pdescription}</td>
            <td>
              <button class="btn btn-outline-success" data-index='${i}' data-type='edit' data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa fa-solid fa-edit"></i></button>
            </td>
            <td>
              <button class="btn btn-outline-danger" data-index='${i}' data-type='delete'> <i class="fa fa-solid fa-trash-can"></i>  </button>
            </td>
          </tr>`
        }
      }
      if (trs.length === 0){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Not Results!',
          })
          this.display(this.products);
          this.search.value = "";
      }else{
          this.table.innerHTML = trs;
      }
  }
}




new Product()



