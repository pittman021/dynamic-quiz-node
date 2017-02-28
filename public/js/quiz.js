window.onload = init();

function init() {
    
  const addChoice = document.getElementById('add-choice');  
  const choiceDiv = document.getElementById('choices');
  const radios = document.getElementById('radios');
  
  addChoice.addEventListener('click', createChoice);
  addChoice.addEventListener('click', createRadio);
  choiceDiv.addEventListener('keyup', setChoiceVal);
  

  // Create Choice Function // 
  function createChoice() {
      var nodes = document.getElementsByClassName('choice');
      var b = nodes.length + 1;
      const label = document.createElement('label');
      const input = document.createElement('input');
      const div = document.createElement('div');
      div.setAttribute('class', 'form-group');
      label.setAttribute('for', 'Choice ' + b);
      label.innerHTML = "Choice " + b;
      input.setAttribute('type', 'text');
      input.setAttribute('class', 'form-control choice');
      input.setAttribute('name', 'choice[' + b + ']');
      input.setAttribute('id', 'choice' + b);
      input.setAttribute('placeholder', 'Choice ' + b);
     div.appendChild(label);
     div.appendChild(input);
    choiceDiv.appendChild(div);
  }
  
  function createRadio() {
    var radioItems = document.getElementsByClassName('form-check-input');
    var radioNum = radioItems.length + 1;
    var text = document.createTextNode(" Choice " + radioNum);
    const div = document.createElement('div');
    const label = document.createElement('label');
    const input = document.createElement('input');
    div.setAttribute('class', 'form-check form-check');
    label.setAttribute('class','form-check-label');
    input.setAttribute('class','form-check-input');
    input.setAttribute('type','radio');
    input.setAttribute('name','answer');
    input.setAttribute('value', radioNum);
    div.appendChild(label);
    label.appendChild(input);
    label.appendChild(text);
    radios.appendChild(div);
  }
  
  function setChoiceVal() {
     
  }
  
}