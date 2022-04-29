const dns = require('dns');


function createArrays(cb) {
    const characters = [];
    const numbersAndChar = [];

    for (var i = 97; i < 97 + 26; i++) {
        characters.push(String.fromCharCode(i))

    }
    for (let j = 45; j < 97 + 26; j++) {
        if (j == 45 || (j >= 97 && j <= 97 + 26) || (j >= 48 && j <= 48 + 9)) {
            numbersAndChar.push(String.fromCharCode(j))
        }

    }
    cb(characters, numbersAndChar)

}

createArrays((characters, numbersAndChar) => {
    const combinations = [];
    for (let i = 0; i < characters.length; i++) {
        for (let j = 0; j < numbersAndChar.length; j++) {
            for (let k = 0; k < numbersAndChar.length; k++) {
                combinations.push(characters[i] + numbersAndChar[j] + numbersAndChar[k])
            }
        }
    }
    const openDomianNames = [];
    const threeCharCombos = combinations.filter(e => e[2] !== '-').map(e => e += ".co.il")

    Promise.all(threeCharCombos.map(charCombo => getData(charCombo).then(res => res).catch(rej => openDomianNames.push(rej)))).then(res => console.log(openDomianNames))
})




function getData(charCombo) {
    return new Promise((res, rej) => {
        dns.resolve4(charCombo, function(err, data) {
            if (err && err.code == 'ENOTFOUND') rej(charCombo)
            res(data)
        })
    })
}
