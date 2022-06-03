
const canvas = document.getElementById("jsCanvas");
// canvas 라는 html 요소는 픽셀을 다룰수 있도록 하는 context를 사용할수 있음, 
// 아래와 같이 variable을 만들어서 사용. 사용방법은 mdn canvas 검색해서 자유롭게 찾아쓰기!
const ctx = canvas.getContext('2d');

const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

//canvas 는 css로 사이즈를 줬어도 좌표를 알기위해 사이즈를 또 줘야함
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true; 
}

// 마우스 움직일때 이벤트를 넣어서 offsetX,Y 값을 가져옴
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        console.log("creating path in ",x,y);
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        console.log("creating line in ",x,y);
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}  

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill"
    }else {
        filling = true;
        mode.innerText = "Paint"
    }
}

function handleCanvasClick() {
    if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

//마우스 우클릭시 contextmenu 기능 없애기
function handleCM(event) {
    event.preventDefault()
}

//saveBtn 클릭시 이미지로 저장(png는 default라 빈칸으로 쓰면 png로 저장),
//a링크 추가, href에 img, download에 다운로드 명칭 적으면 그 이름으로 저장됨
function handleSaveClick() {
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[EXPORT]🐸";
    link.click();
}

// mousedown은 클릭했을때 event임
if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    //contextmenu (이미지 저장 등)뜨지 않게 하는 event
    canvas.addEventListener("contextmenu", handleCM);
}

//array에 있는 모든 item을 부르는 명칭일뿐 아래 color는 potato나 아무 명칭으로 바뀌어도 됨
Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick));

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick )
}