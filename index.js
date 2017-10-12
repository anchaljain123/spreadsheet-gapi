'use strict';
let google = require('googleapis');
let authentication = require("./authentication");


function addSheet(auth) {
    var sheets = google.sheets('v4');
    sheets.spreadsheets.create({
        auth: auth,
        resource: {
            properties: {
                "title": "Myspreadsheet",
            },
        }
    }, function (err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        } else {
            console.log("Added");
        }
    });
}

function getData(auth) {
    var sheets = google.sheets('v4');
    sheets.spreadsheets.values.get({
        auth: auth,
        "spreadsheetId": "1yDkBGcybPr1u-20IvRN9mfeyFw3oaN2NerrIMtAZlIw",
        range: 'Sheet1!A2:C',
    }, (err, response) => {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        var rows = response.values;
        if (rows.length === 0) {
            console.log('No data found.');
        } else {
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                console.log(row.join(", "));
            }
        }
    });
}

function appendData(auth) {
    var sheets = google.sheets('v4');
    sheets.spreadsheets.batchUpdate({
        auth: auth,
        "spreadsheetId": "1yDkBGcybPr1u-20IvRN9mfeyFw3oaN2NerrIMtAZlIw",
        // range: 'Sheet1!A2:B',
        "requests": [
            {
                inser
            }
        ],
        sheets:[
            {
                properties :{
                    "sheetId": 0,
                    "title": "Sheet1",
                    "index": 0,
                },
                "data": [
                    {
                        "values": [
                            [
                                "anchal"
                            ]
                        ],
                        "range": "A4:5"
                    }
                ]
            },
            {
                properties :{
                    "sheetId": 796148346,
                    "title": "Sheet2",
                    "index": 1,
                },
                "valueInputOption": "USER_ENTERED",
                "data": [
                    {
                        "values": [
                            [
                                "anchal"
                            ]
                        ],
                        "range": "C4:5"
                    }
                ]
            }
        ]

    }, (err, response) => {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        } else {
            console.log("Appended");
        }
    });
}

authentication.authenticate()
    .then((auth) => {
        addSheet(auth);
        appendData(auth);
        getData(auth);
    });

/*
const fetch = require('fetch');
fetch('https://sheets.googleapis.com/v4/spreadsheets/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/values/Sheet1!B1',{
    method:'put',
    credentials: 'include',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body:{
        "name":"anchal"
    },
}).then(res=>res.json()).then(data => console.log(data)).catch(err => console.log(err));*/