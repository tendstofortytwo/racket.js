const parse = (str) => {
    str = str.replace(/\s+/g, ' ');

    let waitingFor = [], waitingAt = [], nextExprFrom = 0;

    let output = [];

    for(let i = 0; i < str.length; i++) {
        if(str[i] === '(') {
            waitingFor.push(')');
            waitingAt.push(i);
        }
        else if(str[i] === '"') {
            waitingFor.push('"');
            waitingAt.push(i);
        }
        else if(str[i] === ' ' && waitingAt.length === 0) {
            output.push(str.substring(nextExprFrom, i));
            nextExprFrom = i+1;
        }
        else if(str[i] === waitingFor[waitingFor.length - 1]) {
            waitingFor.pop();
            output.push(str.substring(waitingAt.pop(), i+1));
            nextExprFrom = i+1;
        }
    }

    if(waitingAt.length) {
        console.error('ERROR: I was waiting for a ' + waitingFor.pop() + ' but I did not get any :/');
        console.error('aborting');
        process.exit(-1);
    }

    if(nextExprFrom < str.length)
        output.push(str.substring(nextExprFrom));

    for(let i = 0; i < output.length; i++) {
        output[i] = parseDefn(output[i], false);
    }

    output = output.filter(x => x !== '');

    return output;
}

const numberHuh = x => !isNaN(Number(x));

const parseTwo = (s) => {
    let str = s.replace(/\s+/g, ' ');

    let output = [];

    if(str[0] !== '(') return str;

    // oneof bracket, number, string
    let exprType = 'bracket',
        exprStartFrom = 0,
        bracketsCount = 1;

    console.log('sup');

    for(let i = 1; i < str.length; i++) {
        if(exprType === 'bracket') {
            if(str[i] === '(') bracketsCount++;
            else if(str[i] === ')') bracketsCount--;

            if(bracketsCount === 0) {
                output.push(str.substring(exprStartFrom, i+1));
                exprStartFrom = i+1;
                exprType = '';
            }
        }

        else if(exprType === 'string') {
            if(str[i] === '"') {
                output.push(str.substring(exprStartFrom, i+1));
                exprStartFrom = i+1;
                exprType = '';
            }
        }

        else if(exprType === 'number') {
            if(!numberHuh(str[i])) {
                output.push(str.substring(exprStartFrom, i+1));
                exprStartFrom = i+1;
                exprType = '';
            }
        }

        else if(exprType === '') {
            if(str[i] === '(') {
                exprType = 'bracket';
                exprStartFrom = i;
            }
            else if(str[i] === '"') {
                exprType = 'string';
                exprStartFrom = i;
            }
            else if(numberHuh(str[i])) {
                exprType = 'number';
                exprStartFrom = i;
            }
        }
    }

    console.log('sup 111')

    if(exprType === 'number') {
        output.push(str.substring(exprStartFrom));
        exprType = '';
        exprStartFrom = str.length;
    }

    if(exprType) {
        console.error('fuck');
        process.exit(-1);
    }

    for(let i = 0; i < output.length; i++) {
        console.log('sup');
        output[i] = parseDefn(output[i]);
    }

    console.log('sup');
    console.log(output);

    return output;
}

// todo: parse parts
const parseDefn = (str, topLevel) => {
    if(topLevel == null) topLevel = true;

    if(str[0] !== '(') return (topLevel? [str]: str);

    if(str[str.length - 1] !== ')') {
        console.error('SYNTAX ERROR');
        console.error('BOO YOU SUCK');
        console.error('idk how to check line numbers yet so yeah lol fu');
        console.error(str);
        //process.exit(-1);
    }

    let parts = str.substr(1, str.length - 2)
                   .replace(/\s+/g, ' ')
                   .split(' ');

    const fnName = parts[0];

    parts.shift();
    parts = parts.join(' ');
    
    return ([fnName]).concat(parse(parts));
}

module.exports = parseDefn;