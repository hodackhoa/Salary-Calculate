var $=function(id){
	return document.getElementById(id);
};
//---------------
var arrEm = [],tbl = $("tblEm"),e = 0;
function inputData(){
	var n = prompt("Amount Employees:", "5");
	for(var i = 0;i<n;i++){
		var arr2 = [];
		arr2[0] = prompt("Name " +(i+1)+ ":", "");
		arr2[1] = prompt("Basic Salary " +(i+1)+ ":", "");
		arr2[2] = prompt("Reward " +(i+1)+ ":", "");
		arr2[3] = prompt("Fine " +(i+1)+ ":", "");
		arrEm[i] = arr2;
		if(isNaN(arr2[1])||isNaN(arr2[2])||isNaN(arr2[3])){
			alert("Basic Salary, Reward, Fine must be a numbers!");
			i--;
		}
	}
	storeLoc();
	displayTbl();
};
function storeLoc(){
	for(var i=0; i<arrEm.length;i++){
		var cacheSto = arrEm[i].join("|");	
		localStorage.setItem("em"+i, cacheSto);
	}
};
function getfromStore(){
	arrEm = [];
	e = 0;
	for(var i=0; i<localStorage.length;i++){
		var arrCa = localStorage.getItem("em"+i).split("|");
		arrEm.push(arrCa);
		if(tbl.rows.length>0){
			tbl.deleteRow(0);
		}
	}
	if(tbl.parentElement.rows[0].getElementsByTagName("th").length == 5){
		tbl.parentElement.rows[0].deleteCell(4);
		countE();
		$("descript").innerHTML = "";
	}
	displayTbl();
};
function displayTbl(){
	for(var i=0;i<arrEm.length; i++){
		var rowEm = tbl.insertRow(-1);
		var cellName = rowEm.insertCell(0);
		var cellBasic = rowEm.insertCell(1);
		var cellReward = rowEm.insertCell(2);
		var cellFine = rowEm.insertCell(3);
		cellName.textContent = arrEm[i][0];
		cellBasic.textContent = arrEm[i][1];
		cellReward.textContent = arrEm[i][2];
		cellFine.textContent = arrEm[i][3];
		if(arrEm[i].length>4){
			var cellSalary = rowEm.insertCell(4);
			cellSalary.textContent = arrEm[i][4];
		}
	}
};
function salaryCal(){
	e = 0;
	if(arrEm[0].length==4){
			var salaryTab = document.createElement("th");
			salaryTab.textContent = "Salary";
			$("headtbl").appendChild(salaryTab);}
	for(var i = 0;i<arrEm.length; i++){
		arrEm[i][4] = parseInt(arrEm[i][1]) + parseInt(arrEm[i][2]) - parseInt(arrEm[i][3]);
		tbl.deleteRow(0);
	}
	sortArray();
	displayTbl();
	countE();
};
function sortArray(){
	var arrPre = [],k;
	for(var i =0;i<arrEm.length; i++){
		for( var j = i+1; j<arrEm.length; j++){
			if(arrEm[i][4]>arrEm[j][4]){
				k = arrEm[i];
				arrEm[i] = arrEm[j];
				arrEm[j] = k;
			}
		}
		arrPre.push(arrEm[i]);
		if(arrEm[i][4]>1000){
				e++;
			}
	}
	arrEm = arrPre;
};
function countE(){
	$("descript").innerHTML = "Employees > 1000$: " + e;

}
//-----onload
window.onload = function(){
	inputData();
	$("getdata").onclick = getfromStore;
	$("calem").onclick = salaryCal;
};