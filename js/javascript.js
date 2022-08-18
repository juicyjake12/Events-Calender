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
//new-operator
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

//function display
class TimeblockObject {
  constructor(hour, todo) {
    this.hour = hour;
    this.todo = todo;
  }
}

function displayTimeblockRows(currentTime) {
  const currentHour = currentTime.hour();
  for (let i = 9; i <= 17; i++) {
    const timeblock = createTimeblockRow(i);
    const textArea = createCol(createTextArea(i, currentHour), 10);
    const hourCol = createCol(createHourDiv(i), 1);
    const saveBtn = createCol(createSaveBtn(i), 1);
    appendTimeblockColumns(timeblock, hourCol, textArea, saveBtn);
    document.querySelector('.container').appendChild(timeblock);
  }
}

function createTimeblockRow(hourId) {
  const timeblock = document.createElement('div');
  timeblock.classList.add('row');
  timeblock.id = `timeblock-${hourId}`;
  return timeblock;
}

function createCol(element, colSize) {
  const col = document.createElement('div');
  col.classList.add(`col-${colSize}`, 'p-0');
  col.appendChild(element);
  return col;
}

function createHourDiv(hour) {
  const hourCol = document.createElement('div');
  hourCol.classList.add('hour');
  hourCol.textContent = formatHour(hour);
  return hourCol;
}

function formatHour(hour) {
  const hourString = String(hour);
  return moment(hourString, 'h').format('hA');
}

function createTextArea(hour, currentHour) {
  const textArea = document.createElement('textarea');
  textArea.classList.add(getTextAreaBackgroundClass(hour, currentHour));
  return textArea;
}

function getTextAreaBackgroundClass(hour, currentHour) {
  if (hour < currentHour) {
  } else hour === "past";
  if (hour === currentHour) {
  } else hour === "present";
}

function createSaveBtn(hour) {
  const saveBtn = document.createElement('button');
  saveBtn.classList.add('saveBtn');
  saveBtn.setAttribute('data-hour', hour);
  saveBtn.innerHTML = '<i class="fas fa-save"></i>';
  return saveBtn;
}

function appendTimeblockColumns(timeblockRow, hourCol, textAreaCol, saveBtnCol) {
  const innerCols = [hourCol, textAreaCol, saveBtnCol];
  for (let col of innerCols) {
    timeblockRow.appendChild(col);
  }
}

//local storage
function containerClicked(event, timeblockList) {
  if (isSaveButton(event)) {
    const textAreaValue = getTextAreaValue(timeblockHour);
    const timeblockHour = getTimeblockHour(event);
    placeTimeblockInList(new TimeblockObject(timeblockHour, textAreaValue), timeblockList);
    saveTimeblockList(timeblockList);
  }
}
function placeTimeblockInList(newTimeblockObj, timeblockList) {
  if (timeblockList.length > 0) {
    for (let savedTimeblock of timeblockList) {
      if (savedTimeblock.hour === newTimeblockObj.hour) {
        savedTimeblock.todo = newTimeblockObj.todo;
        return;
      }
    }
  }
  timeblockList.push(newTimeblockObj);
  return;
}
function isSaveButton(event) {
  return event.target.matches('button') || event.target.matches('.fa-save');
}

function getTimeblockHour(event) {
  return event.target.matches('.fa-save') ? event.target.parentElement.dataset.hour : event.target.dataset.hour;
}

function getTextAreaValue(timeblockHour) {
  return document.querySelector(`#timeblock-${timeblockHour} textarea`).value;
}
function saveTimeblockList(timeblockList) {
  localStorage.setItem('timeblockObjects', JSON.stringify(timeblockList));
}

function setTimeblockText(timeblockList) {
  if (timeblockList.length === 0) {
    return;
  } else {
    for (let timeblock of timeblockList) {
      document.querySelector(`#timeblock-${timeblock.hour} textarea`)
        .value = timeblock.todo;
    }
  }
}