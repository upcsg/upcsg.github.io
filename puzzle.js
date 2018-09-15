var arr;
var lastLayer;
var main = document.getElementById('main');
var levels;
var answerLevel = [];
reset();
var answerIsCorrect = false;
setTimeout(disableMap, 500);

function removeAllChildNodes(node) {
	if (node != null) {
		while(node.firstChild) {
			node.removeChild(node.firstChild);
		}
	}
}

function initialize() {
	if(main != null) {
		main.className = "main";
		answerLevel = [];
		levels = Math.floor(Math.random() * 20 + 2);
		arr = [];
		lastLayer = [];
		for (let i = 0; i < 20; i++) {
			arr.push(0);
			answerLevel.push(false);
		}

		arr[arr.length/2] = 1;
	}
}

function run(limit) {
	let screen = [];

	screen.push(0)
	screen.push(0)
	screen.push(0)

	let passes = 0;

	printRule30Array();

	while(passes < limit) {
		let lb = 1;
		let replacement = arr.slice(0);

		replacement[0] = 0 ^ (arr[0] | arr[1]);
		while(lb+1 < arr.length) {

			screen[0] = arr[lb-1];
			screen[1] = arr[lb];
			screen[2] = arr[lb+1];

			replacement[lb] = screen[0] ^ (screen[1] | screen[2]);

			lb++;		
		}

		replacement[lb] = arr[arr.length-2] ^ (arr[arr.length-1] | 0);

		for(let i = 0; i < arr.length; i++) {
			arr[i] = replacement[i];
		}

		passes++;
		printRule30Array(passes);
	}
}

function reset() {
	removeAllChildNodes(main);
	initialize()
	run(20);
	addBlankLayer();
	addEventListenersToLastLayer();
}

function printRule30Array(passes) {
	for(let i = 0; i < arr.length; i++) {
		// works only in node.js
		// process.stdout.write(arr[i].toString());
		// console.log(arr);
		let style = "";
		let div = document.createElement('DIV');
		if(arr[i] === 1) {
			style += " background-color: black; ";
		}

		if(i === 0) {
			style += " border-left: 1px solid; ";				
		}

		if(passes === arr.length) {
			style += " border-bottom: 1px solid; "
		}

		div.setAttribute("style", style);
		div.className = "boxes";
		main.append(div);
	}
}

function addBlankLayer() {
	for(let i = 0; i < arr.length; i++) {
		let style = "";
		let div = document.createElement("DIV");
		div.className = "boxes answer";

		if(i == 0) {
			style += "border-left: 1px solid;";
		}

		style += "border-bottom: 1px solid";

		div.setAttribute("style", style);
		main.append(div);
		lastLayer.push(div);
	}
}

function addEventListenersToLastLayer() {
	for(let i = 0; i < lastLayer.length; i++) {
		lastLayer[i].addEventListener("click", function() {
			if(lastLayer[i].style.backgroundColor === "black") {
				lastLayer[i].style.backgroundColor = "";
				answerLevel[i] = false;
			} else {
				lastLayer[i].style.backgroundColor = "black";
				answerLevel[i] = true;
			}
		});
	}
}

function checkAnswer() {
	let flag = true;
	for(let i = 0; i < arr.length; i++) {
		let arg1, arg2, arg3;
		if(i == 0) {
			arg1 = 0;
			arg3 = arr[i+1];
		} else if (i == arr.length - 1) {
			arg1 = arr[i-1];
			arg3 = 0;
		} else {
			arg1 = arr[i-1];
			arg3 = arr[i+1];
		}
		arg2 = arr[i];

		correctAnswer = arg1 ^ (arg2 | arg3);
		givenAnswer = answerLevel[i];

		console.log(arg1 + " " + arg2 + " " + arg3);
		console.log(correctAnswer + " : " + givenAnswer);
		if(correctAnswer != givenAnswer) {
			flag = false;
			break;
		}
	}

	message = (flag) ? "Correct" : "Wrong";

	alert(message);

	if(flag) {
		triggerTextBoxes();
	}

	return flag;
}

function triggerTextBoxes() {
	let main = document.getElementById('main');
	let check = document.getElementById('check');
	let reset = document.getElementById('reset');

	main.hidden = true;
	check.hidden = true;
	reset.hidden = true;

	let invisiblePhase = document.getElementById("next-phase");
	invisiblePhase.hidden = false;
	let answer = document.getElementById("answer");
	answer.focus();
}

function checkCoordinates() {
	let first = document.getElementById("first");
	let second = document.getElementById("second");
	
	if (first.value == 10.309938 && second.value == 123.893468) {
		alert('Hope you find what you\'ll be looking for, spy.');
		disableTextBoxes();
		enableMap();

		var map;

		setTimeout(function() {
			map = L.map('map', {
				center: [10.309938, 123.893468],
				zoom: 19
			});

			map.setView([10.309938, 123.893468], 19);

			L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}{r}.png', {
			    attribution: '© OpenStreetMap contributors',
			    minZoom: 19,
			    maxZoom: 19
			}).addTo(map);

			let marker = L.marker([10.309842, 123.893152]).addTo(map);
		}, 2000);
	} else {
		alert('wrong');
	}
}

function disableTextBoxes() {
	let invisiblePhase = document.getElementById("next-phase");
	invisiblePhase.hidden = true;
}

function enableMap() {
	let m = document.getElementById('map');
	m.hidden = false;
}

function disableMap() {
	let m = document.getElementById('map');
	m.hidden = true;
}