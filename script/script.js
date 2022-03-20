
let root = document.getElementById('root');



//let users = [];

//function createUser(){
//	let userName = document.getElementById('user');
//	let age = document.getElementById('age');
//	let married = document.getElementById('married');
//	console.log(userName.value, age.value, married.checked);
//	users.push(initiateUser(userName.value, age.value, married.checked));
//	root.innerHTML = '';
//	users.forEach(printToHTML);
//	userName.value ="";
//	age.value = "";
//	married.checked = false;
//}


//function initiateUser(name, age,status){
	
//	return {name, age, status};
//}

//function printToHTML(obj){
//	Object.values(obj).forEach(elem => {
//		root.innerHTML = root.innerHTML + elem + "<br>";
//	})
//}




let products = [
	['Яблоко','Фрукт','сладкий','Антоновка','6 шт'],
	['Груша','Фрукт','сладкий','Китайская','5 шт'],
	['Клубника','Ягода','сладкая','Трофейная','40 шт'],
	['Арбуз','Бахчевые','сладкий','Мегамен','0,2 шт'],
	['Дыня','Бахчевые','сладкая','Торпеда','0,25 шт'],
	['Голубика','Ягода','кисло-сладкая','Обычная','360 шт'],
	['Лимон','Фрукт','кислый','Турецкий','12 шт']
]


let headers =['#','Наименование','Тип','Вкус','Сорт','Количество'];

function createTable(headersList){
	let table = document.createElement('table');
	let thead = document.createElement('thead');
	let tbody = document.createElement('tbody');
	let tr = document.createElement('tr');

	table.appendChild(thead);
	table.appendChild(tbody);
	thead.appendChild(tr);
	
	table.setAttribute('class', 'table table-hover table-info table-striped');

	headersList.forEach(elem => {
		let th = document.createElement('th');
		th.innerHTML = elem;
		tr.appendChild(th);
	})


	return {table, tbody}
}


function printDataToTable(tbody, data) {
	let count = 1;
	for(let elem of data){
		let tr = document.createElement('tr');
		let td = document.createElement('td');
		td.innerHTML = count;
		tr.appendChild(td);
		for(let item of elem){
			let td = document.createElement('td');
			let span = document.createElement('span');
			td.appendChild(span);
			span.innerHTML = item;	
			tr.appendChild(td);
		}
		count++;
		tbody.appendChild(tr);
	}
}

//let tableInfo = createTable(headers);
//printDataToTable(tableInfo.tbody, products);
//root.appendChild(tableInfo.table);







// ДЗ


//1. Написать функцию createLayout  , которая будет создавать следующую структуру:
/*<div class="container">
      <div class="row">
         <div class="col">
            // <table class="table table-striped"> Это созданная нами таблица </table>
         </div>
      </div>
   </div>
Поместить этот код в #root , а внуть .col соотвестственно поместить нашу таблицу.*/


function createLayout(){
	let container = document.createElement('div');
	let row = document.createElement('div');
	let col = document.createElement('div');
	let table = document.createElement('table');

	container.setAttribute('class', 'container');
	row.setAttribute('class', 'row');
	col.setAttribute('class', 'col');
	table.setAttribute('class', 'table table-hover table-info table-striped');

	container.appendChild(row);
	row.appendChild(col);

	let tableInfo = createTable(headers);
	printDataToTable(tableInfo.tbody, products);
	root.appendChild(container);
	col.appendChild(tableInfo.table);
}



createLayout();
createControls();





//2. Написать фукцию createControls, которая будет создавать следующий html:
//    <form>
//        <div>
//            <label class="form-label">Введите номер строки, чтобы её удалить:</label>
//            <input class="form-control" type="number" style="width: 50%;">
//        </div>
//        <button class="btn btn-primary">Удалить строчку</button>
//    </form>
//И поместить этот код в .col после таблицы. 
//P.S. если элементы будут примыкать друг к другу, разделите их добавив br между ними ) 



function createControls(){
	let form = document.createElement('form');
	let div = document.createElement('div');
	let label = document.createElement('label');
	let input = document.createElement('input');
	let button = document.createElement('button');

	form.appendChild(div);
	div.appendChild(label);
	div.appendChild(input);
	form.appendChild(button);

	label.setAttribute('class', 'form-label');
	label.innerHTML = 'Введите номер строки, чтобы её удалить:';
	input.setAttribute('class', 'form-control');
	input.setAttribute('type', 'number');
	input.setAttribute('style', 'width: 50%;');
	button.setAttribute('class', 'btn btn-primary');
	button.setAttribute('style', 'margin-top: 20px;');
	button.innerHTML = 'Удалить строчку';

	let col = document.querySelector('.col');
	col.appendChild(form);
	
}




//3*. Навесить на кннопку событие click и написать функционал в виде функции deleteStr, чтобы при вводу номера 
//строки в input и клике на кнопку эта строка удалялась.
//(если при клике у вас будет обновляться страничка, то предварительно изучить 
//событийный event и метод .preventDefault())
//P.S. не забудьте сделать проверку "на дурака" при вводе некорректных данных.


let button = document.querySelector(".btn").addEventListener('click', (e) => {
	e.preventDefault();
	let input = document.querySelector('.form-control');
	if(input.value < 0 || input.value > products.length){
		alert('Такой строки нет в таблице!');
	}else{
		deleteStr(input.value);
	}
})

function deleteStr(num){
	let tr = document.querySelectorAll('tbody tr');
	let tbody = document.querySelector('tbody');
	//console.log(tbody);
	//console.log(tr[num-1]);
	tbody.removeChild(tr[num - 1]);

	for(let i=0; i<tr.length; i++){
		document.querySelectorAll('tbody tr')[i].childNodes[0].innerText = i + 1;
	}
}




//4**. ! Делать только в случае успешного завершения предыдущих заданий !
//Сделать функционал изменения значений в td.
// Т.е. при клике на td должен появляться input, куда пользователь может ввести новое значение и оно заменит старое.
// Как минимум необходимо:
// - повесить на все td событие click
// - написать функцию changeValInTd внутри которой:
//    -- создаётся input
//    -- считывается значение из td и передаётся в input 
//    (необходимо предварительно изучить у event свойство .target )
//    -- после изменения значения оно присваивается td
//    P.S. вероятнее всего необходим будет дополнительный элемент,
//	  по которому user будет кликать для применения изменений. 




let tdList = document.querySelectorAll('td');
for(let td of tdList){
	let tdText = td.querySelector('span');
	if(tdText){
		tdText.addEventListener('click',(e)=>{
			e.stopPropagation();
		let tdValue = e.target.textContent;
		e.target.innerHTML = '';
		changeValInTd(e.target, tdValue, td);
	})
	}
}

function changeValInTd(item, value, elem){
	let input = document.createElement('input');
	let addValueBtn = document.createElement('button');
	let cancelBtn = document.createElement('button');

	input.setAttribute('class', 'form-control-sm');
	input.setAttribute('type', 'text');
	input.value = value;

	addValueBtn.setAttribute('class', 'btn btn-secondary btn-sm');
	addValueBtn.setAttribute('style', 'margin: -3px 0 0 3px');
	addValueBtn.innerHTML = 'add';

	cancelBtn.setAttribute('class', 'btn btn-secondary btn-sm');
	cancelBtn.setAttribute('style', 'margin: -3px 0 0 3px');
	cancelBtn.innerHTML = 'cancel';

	elem.appendChild(input);
	if(elem.children.length < 3){
		elem.appendChild(addValueBtn);
		elem.appendChild(cancelBtn);
	}
	
	addValueBtn.addEventListener('click',()=>{
		if(input.value){
			item.innerHTML = input.value;
			elem.removeChild(input);
			elem.removeChild(addValueBtn);
			elem.removeChild(cancelBtn);
		}else if(input.value ==''){
			alert('Please enter value');
		}
	})
	
	cancelBtn.addEventListener('click',()=>{
		item.innerHTML = value;
		elem.removeChild(input);
		elem.removeChild(addValueBtn);
		elem.removeChild(cancelBtn);
	})
}




