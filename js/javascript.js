//mental note- write columns left to right create container first
//need time that updates by the day
//start with creating a class 
//create timeblocks
//declare elements- hour div, textarea div, save btn div, append all 3
//choose where i want it to display- .container from html
// dont forget the jquery $
//create column div
//dont forget to return 
//create div to column size
//do local save functions last
// `-javascript operator
//seconds to time- hh.mm.ss







//time functions 
window.onload = function () {
  const currentTimeblocks = getCurrentTimeblocks();
  const currentTime = moment();

  displayCurrentDate(currentTime);
  displayTimeblockRows(currentTime);

  document.querySelector('.container')
    .addEventListener('click', function (event) {
      containerClicked(event, currentTimeblocks);
    });
  setTimeblockText(currentTimeblocks);
};

function getCurrentTimeblocks() {
  const currentTimeblocks = localStorage.getItem('timeblockObjects');
  return currentTimeblocks ? JSON.parse(currentTimeblocks) : [];
}

function displayCurrentDate(currentTime) {
  document.getElementById('currentDay')
    .textContent = currentTime.format('dddd, MMMM Do');
}
//starting class
class Timeblock {
  constructor(hour, todo) {
    this.hour = hour;
    this.todo = todo;
  }
}
//dispay Timeblocks
function displayTimeblockRows(currentTime) {
  const currentHour = currentTime.hour();

  for (let i = 9; i <= 17; i ++) {
    const timeblock = createTimeblockRow(i);
    const hourCol = createColomn(createHourDiv(i), 1);
    const textArea = createColomn(createTextArea(i, currentHour), 10);
    const saveBtn = createColomn(createSaveBtn(i), 1);
    appendtimeblockColumns(timeblock, hourCol, textArea, saveBtn);
    document.querySelector('.container').appendChild(timeblock);
  }
}
function createColomn(element, ColumnSize){
  const Column = document.createElement("div");
  Column.classList.add(`col-${ColumnSize}`);
  Column.appendChild(element);
  return Column;
}
function createTimeblockRow(hourid){
  const timeblock = document.createElement('div');
  timeblock.classList.add("row");
  timeblock.id = `Timeblock-${hourid}`;
  return timeblock;
}
function createHourDiv(hour){
  const hourColumn = document.createElement("div");
  hourColumn.classList.add("hour");
  hourColumn.textArea = formatHour(hour);
  return hourColumn;
}
function formatHour(hour) {
  const hourString = String(hour);
  return moment(hourString, 'h').format('hA');
}
function createTextArea(hour, currentHour){
  const textArea = document.createElement("textArea");
  textArea.classList.add(getTextAreaBackgroundClass(hour, currentHour));
  return textArea;
}
//function getTextAreaBackgroundClass(hour, currentHour){
  if (hour < currentHour){
  console.log("past")
  }
}

