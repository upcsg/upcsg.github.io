var arr = [];
var main = document.getElementById('main');

function run() {
	main.className = "main";
	for (let i = 0; i < 20; i++) {
		arr.push(0);
	}

	arr[arr.length/2] = 1;

	let screen = [];

	screen.push(0)
	screen.push(0)
	screen.push(0)

	let passes = 0;

	printRule30Array();

	while(passes < arr.length) {
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

// console.log("Finished");

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

		if(i === 0) {
			console.log(style);
		}
		div.setAttribute("style", style);

		main.append(div);
	}
	console.log("");
}

/*
	111
	110
	101
	100
	011
	010
	001
	000

	1st xor (2nd | 3rd)
*/
