// Este será o objeto principal no qual você irá se basear para as funções do desafio!
// Caso haja dúvidas de como prosseguir, favor consultar a sala #js no nosso discord!

const modalInsert = document.getElementById("modal-insert")
const modalImport = document.getElementById("modal-import")

// MODELO DA TABELA
let features = [
  {
    feature: "Authentication",
    devHours: 10,
    testHours: 2
  },
];

var hour = 0;
var hourInput = document.getElementById("hour")
hourInput.addEventListener("keydown", () => {
  hourInput.valueAsNumber ? hour = hourInput.valueAsNumber : hour = 0
  fillTable()
})

function fillTable() {
  $("tbody").empty()
  var totalFeatures = 0;
  var totalHourDev = 0;
  var totalHourTest = 0;
  var totalValue = 0;
  for (let i = 0; i < features.length; i++) {
    const money = (features[i].devHours + features[i].testHours) * hour

    totalFeatures++
    totalHourDev += features[i].devHours
    totalHourTest += features[i].testHours
    totalValue += money

    $("tbody").append(
      `<tr onclick="selectRow(event)">
          <td>${features[i].feature}</td>
          <td>${features[i].devHours}</td>
          <td>${features[i].testHours}</td>
          <td>R$ ${money}</td>
        </tr>
      `
    )
  }
  $("#totalFeatures").html(totalFeatures)
  $("#totalHoursDev").html(totalHourDev)
  $("#totalHoursTest").html(totalHourTest)
  $("#totalValue").html(totalValue)
}

function showModalInsert(){
  modalInsert.style.display = "block"
}

function closeModalInsert(){
  modalInsert.style.display = "none"
}

function showModalImport(){
  modalImport.style.display = "block"
}

function closeModalImport(){
  modalImport.style.display = "none"
}

function insertFeature(){
  var newFeature = {
    feature: $("#txtFeature").val(),
    devHours: parseInt($("#txtHourDev").val()),
    testHours: parseInt($("#txtHourTest").val())
  }

  features.push(newFeature)
  fillTable()
}

document.getElementById("importJSON").addEventListener("change", (e) => {
  var file = e.target.files[0]
  var fileread = new FileReader();
  
  fileread.readAsText(file)
  fileread.onload = function() {
    features = JSON.parse(fileread.result)
    fillTable()
  }
  modalImport.style.display = "none"
})

function exportTable() {
  var hiddenElement = document.createElement('a');
  var content = JSON.stringify(features)
  hiddenElement.href = 'data:text/json;filename=TabelaDeFreelas.json;charset=utf-8,' + encodeURI(content);
  hiddenElement.download = 'TabelaDeFreelas.json';
  hiddenElement.click();
}

var toDelete = []
function selectRow(e){
  var clickedIndex = e.target.parentNode.rowIndex - 1
  if (toDelete.indexOf(clickedIndex) === -1) {
    toDelete.push(clickedIndex)
    $(e.target.parentNode).css("background-color", "#50bab1")
  } else {
    toDelete.splice(toDelete.indexOf(clickedIndex), 1)
    $(e.target.parentNode).css("background-color", "")
  }
}

function deleteRows() {
  if (toDelete.length) {
    for (let i = 0; i < toDelete.length; i++) {
      features.splice(toDelete[i], 1)
      toDelete.splice(i, 1)
    }
    fillTable()
  } else
    alert("Selecione algum item da lista para ser apagado")
}

fillTable()
///////////////////////////////////////////////////////////////////////////////

//alert("He4rtDevs <3");

// Dica: faça o layout e depois pense em como vai funcionar o script.
