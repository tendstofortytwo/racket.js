const fs = require('fs');
const categorise = require('./categorise');
const parse = require('./parse');

if(process.argv.length !== 4) {
    console.error('Invalid number of parameters!')
    console.error('Usage:');
    console.error('   node index.js in.rkt out.js');
    process.exit(-1);
}

const inFile = process.argv[2];
const outFile = process.argv[3];

let inCode, outCode = '';

try {
    inCode = fs.readFileSync(inFile, { encoding: 'utf8' });
}
catch(e) {
    console.error('Input file does not exist!');
    process.exit(-1);
}

inCode = inCode.split('\n');
for(let i = 0; i < inCode.length; i++) {
    const broken = parse(inCode[i]);
    const JScode = categorise(broken);
    //console.log(JScode);
    outCode += JScode + '\n';
}


try {
    fs.writeFileSync(outFile, outCode);
}
catch(e) {
    console.error('Could not write to output file!');
    console.error('I am just gonna output the code here');
    console.error('And you can copy paste it to a place that works?');
    console.log(outCode);
}

console.log('All done!');