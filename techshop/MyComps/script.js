// if (comptable.children.length == 1) {
    //     let newrow = document.createElement('tr');
    //     comptable.appendChild(newrow);
    //     newrow.classList.add('m-5');
    //     let newheader = document.createElement('td');
    //     newheader.classList.add('text-center');
    //     newheader.colSpan = 5;
    //     newheader.innerHTML = "No data available";
    //     newrow.appendChild(newheader);
    //     console.log(comptable.children[1])
    // } 
    
    
// Modal Part ------------------------------------------------------------------
let categoryinputs = document.querySelectorAll('.categoryinput')
let photourl = document.querySelector('.photourl')
let compimg = document.querySelector('.compimg')
let dataclean = document.querySelector('.dataclean')
let datasave = document.querySelector('.datasave')
let params = document.querySelector('.params')
let comptable = document.querySelector(".comptable")
let tbody = comptable.querySelector('tbody');
let compid = 1000
let flag = false
let compStorage = []


emptyCheck()

photourl.addEventListener('input',() => {
    compimg.src = photourl.value
})

dataclean.addEventListener('click', () => {
    deleteInfo()
});

// Inputs check
categoryinputs.forEach(item => {
    item.addEventListener('input', () => {
        if(item.value != ""){
            item.classList.remove('is-invalid')
            item.classList.add('is-valid')
            item.nextElementSibling.innerText = 'Düzdür'
            item.nextElementSibling.classList.remove('text-danger')
            item.nextElementSibling.classList.add('text-success')
        }
        else{
            item.classList.remove('is-valid')
            item.classList.add('is-invalid')
            item.nextElementSibling.innerText = 'Boş qoymayın'
            item.nextElementSibling.classList.remove('text-success')
            item.nextElementSibling.classList.add('text-danger')
            flag = false
        }
    })
})

// Add to page part-----------------------------------------------

datasave.addEventListener('click',() => {
    let count = 0
    categoryinputs.forEach(item => {
        if(item.value != ""){
            count++
        }
    })
    if(count == 9){
        const newcomp = compcreator(); 
        console.log(newcomp)
        displayNewComp(newcomp, compid);
        compid++
        deleteInfo()
        emptyCheck()
    }
    else{
        alert("Problem occured")
    }
})

function deleteInfo(){
    categoryinputs.forEach(item => {
        item.value = ""
        item.classList.remove('is-valid')
        item.classList.add('is-invalid')
        item.nextElementSibling.innerText = 'Bosh qoymayin'
        item.nextElementSibling.classList.remove('text-success')
        item.nextElementSibling.classList.add('text-danger')
    });
} 

// Functions


// Create laptop
function compcreator(){
    let newcomp = {
        category: params.children[0].children[1].value,
        emeliyaddash: params.children[1].children[1].value,
        ad: params.children[2].children[1].value,
        cpu: params.children[3].children[1].value,
        cost: params.children[4].children[1].value,
        daimi: params.children[5].children[1].value,
        description: params.children[6].children[1].value,
        romcategory: params.children[7].children[1].value,
        usage: params.children[8].children[1].value,
        os: params.children[9].children[1].value,
        compimage: params.children[10].children[1].value,
        ram: params.children[11].children[1].value
    }
    compStorage.push(newcomp)
    return newcomp;
}


// Display new laptop in table
function displayNewComp(newcomp,compid){
   let comptr = document.createElement('tr')
   tbody.append(comptr)
//    ID
   let idtd = document.createElement('td')
   idtd.innerText = compid
   comptr.append(idtd)
//    Td for laptop
   let comptd = document.createElement('td')
   comptd.innerText = newcomp.category
   comptr.append(comptd)
//    Image
   let imagetd = document.createElement('td')
   comptr.append(imagetd)
   let imagecomp = document.createElement('img')
   imagecomp.src = newcomp.compimage
   imagecomp.classList.add('imagewidth')
   imagetd.append(imagecomp)
// Price 
    let priceOfLaptop = document.createElement('td')
    priceOfLaptop.innerText = `${newcomp.cost}$`
    comptr.append(priceOfLaptop)
//    Buttons
   let btntd = document.createElement('td')
   comptr.append(btntd)
   let deleteBtn = document.createElement('button')
   deleteBtn.innerText = 'Sil'
   deleteBtn.classList.add('btn', 'btn-danger', 'm-2', 'trdelete');
   btntd.append(deleteBtn)
   let modifyBtn = document.createElement('button')
   modifyBtn.innerText = 'Redakte'
   modifyBtn.classList.add('btn', 'btn-primary');
   btntd.append(modifyBtn) 
}

// Check is table is empty
function emptyCheck() {
    console.log(tbody.children.length);
    if (tbody.children.length === 0) {
        let datatr = document.createElement('tr');
        tbody.appendChild(datatr);
        let datath = document.createElement('td');
        datath.innerText = 'No data available';
        datath.classList.add('text-center');
        datath.colSpan = 5;
        datatr.appendChild(datath);
    } else {
        tbody.removeChild(tbody.children[0]);
    }
}

// Table row delete
tbody.addEventListener('click', (item) => {
    if(item.target.classList.contains('trdelete')){
        item.target.parentElement.parentElement.remove()
        emptyCheck()
    }
    else{
        console.log("not yet");
    }
})