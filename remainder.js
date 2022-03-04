const newDuty = document.querySelector('.input-duty');
const addNewDutyBtn = document.querySelector('.btn-add-duty');
const dutyList = document.querySelector('.duty-list');
addNewDutyBtn.addEventListener('click',addDuty);

dutyList.addEventListener('click',addAndDelete);
document.addEventListener('DOMContentLoaded',readFromLocalStorage)


function addAndDelete(e){
    const clickedElement = e.target;
    
    if(clickedElement.classList.contains('duty-btn-finished')){
        //console.log('finished clicked');
        clickedElement.parentElement.classList.toggle('duty-finished');
    }
    if(clickedElement.classList.contains('duty-btn-deleted')){
        if(confirm('Are you sure')){
            //console.log('delete clicked');
        clickedElement.parentElement.classList.toggle('lost');
        const elementToBeDeleted = clickedElement.parentElement.children[0].innerText;
        deleteFromLocalStorage(elementToBeDeleted);

        clickedElement.parentElement.addEventListener('transitionend', function (){
            clickedElement.parentElement.remove();
        });
        }
        
        
    }
}

function addDuty(e){
    e.preventDefault();
    if(newDuty.value.length > 0){
        dutyCreateItem(newDuty.value);

    // save to local storage
    saveToLocalStorage(newDuty.value);
    } else {
        alert('There is no duty')
    }

    
}

function convertLocalStorageToArray(){
    let duties;
    if(localStorage.getItem('duties') === null){
        duties = [];
    } else{
        duties = JSON.parse(localStorage.getItem('duties'));
    }
    return duties;
}

function saveToLocalStorage(newDuty){
    let duties = convertLocalStorageToArray();

    duties.push(newDuty);
    localStorage.setItem('duties', JSON.stringify(duties));
}

function readFromLocalStorage(){
    let duties = convertLocalStorageToArray();
    duties.forEach(function (duty){
        dutyCreateItem(duty);
    });
}

function dutyCreateItem(duty){
    // create div
    const dutyDiv = document.createElement('div');
    dutyDiv.classList.add('duty-item');
    
    //create li
    const dutyLi = document.createElement('li');
    dutyLi.classList.add('duty-explanation');
    dutyLi.innerText = duty;
    dutyDiv.appendChild(dutyLi);

    //add finish button
    const dutyFinishedBtn = document.createElement('button');
    dutyFinishedBtn.classList.add('duty-btn');
    dutyFinishedBtn.classList.add('duty-btn-finished');
    dutyFinishedBtn.innerHTML = '<i class="far fa-check-circle"></i>'
    dutyDiv.appendChild(dutyFinishedBtn);

    

    // add delete button
    const dutyDeletedBtn = document.createElement('button');
    dutyDeletedBtn.classList.add('duty-btn');
    dutyDeletedBtn.classList.add('duty-btn-deleted');
    dutyDeletedBtn.innerHTML = '<i class="fas fa-trash"></i>'
    dutyDiv.appendChild(dutyDeletedBtn);

    // add div to ul
    dutyList.appendChild(dutyDiv);
}

function deleteFromLocalStorage(duty){
    let duties = convertLocalStorageToArray();
    

    // delete by using splice
    const indexOfElementToBeDeleted = duties.indexOf(duty);
    console.log(indexOfElementToBeDeleted);
    duties.splice(indexOfElementToBeDeleted, 1);
    localStorage.setItem('duties', JSON.stringify(duties));
}