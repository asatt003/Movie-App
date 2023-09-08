//To run, type: "node ./view/view_personnel.js" in the base directory of the project in the terminal. Then press enter.

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV || 'development']);
const tableName = "movies";

knex(tableName)
.then(data => {
    let ObjTableSpacing = [];

    for (let i = 0; i < Object.keys(data[0]).length; i++) {
        let largestStringLength = Object.keys(data[i])[i].length;
        for (let j = 0; j < data.length; j++) {
            if ((data[j][Object.keys(data[i])[i]] === null)) {
                if (4 > largestStringLength) { largestStringLength = 4; }
            } else if ((data[j][Object.keys(data[i])[i]] === undefined)) {
                if (9 > largestStringLength) { largestStringLength = 9; }
            } else {
                if (data[j][Object.keys(data[i])[i]].toString().length > largestStringLength) {
                    largestStringLength = data[j][Object.keys(data[i])[i]].toString().length
                }
            }
        }
        ObjTableSpacing.push(largestStringLength + 5);
    }
    console.log(`\n` + tableName + `\n`);
    let tableRow = "";
    for (let i = 0; i < Object.keys(data[0]).length; i++) {
        tableRow += (Object.keys(data[i])[i] + " ".repeat(ObjTableSpacing[i] - Object.keys(data[i])[i].toString().length))
    }
    console.log(tableRow + `\n`);
    
    for (let i = 0; i < data.length; i++) {
        let displayedRow = "";
        for (let j = 0; j < Object.keys(data[i]).length; j++) {
            let columnOffset = 0;
            if (data[i][Object.keys(data[i])[j]] === undefined) {
                columnOffset = 9;
            } else {
                columnOffset = (data[i][Object.keys(data[i])[j]] === null ? 4 : data[i][Object.keys(data[i])[j]].toString().length)
            }
            displayedRow += data[i][Object.keys(data[i])[j]] + " ".repeat(ObjTableSpacing[j] - columnOffset)
        }
        console.log(displayedRow);
    }
    console.log(`\n`);

});