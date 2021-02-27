const fs = require('fs');
const rls = require('readline-sync');

var filePath = ""; // one may overwrite file path here

if (0 === filePath.length){ // asks for file path if none given
filePath = rls.question("enter file path\n"); 
}

/**
* Parses formatted bill text file and prints relevant data
* @param {String} fp 	file path to the text file of formatte bill
* @return {void} 
*/
function parse(fp){
	var text = fs.readFileSync(fp, "utf8");
	var custAccReg = /\d+ - \d+/;
	console.log("1. Customer and Acc #: " + custAccReg.exec(text)[0]);
	// to access each value individually, could further /\d+/
	var billPReg = /[A-Z][a-z]+ \d+, \d+ to [A-Z][a-z]+ \d+, \d+/;
	console.log("2. Bill Period: " + billPReg.exec(text)[0]);
	var billNReg = /Bill number: \d+/;
	console.log("3. Bill #: " + /\d+/.exec(billNReg.exec(text)[0])[0]); 
	var newChargeReg = /Total new charges\s+\$[^.]+.\d\d/;
	console.log ("4. Total New Charges: " + /\$[^.]+.\d\d/.exec(newChargeReg.exec(text))[0]);
}

parse(filePath);