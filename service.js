const axios = require('axios')
var querystring = require('querystring');

startSession = function() {
    url = 'https://nexus.socialanalytics.genesyscloud.com/nexus/v3/chat/sessions'
    data = querystring.stringify( {"data" : {
        "firstName":"Sanjay",
        "lastName":"Saha",
        "endpoint":"oasis_chat",
        "ChatProfile":"Oasis_Chat_UAT",
        "email":"ssanjay@vmware.com",
        "stream":"uat",
        "nickname":"Sanjay"
    }});
    config = {
        headers: {
            'x-api-key': 'b39dced7-8241-49a6-a4d3-f52eb797234b',
            'Content-Type':'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
    }

    axios.post(url, data, config).then(response => {
        console.log('Response', response)
    })
    .catch(e => {
        console.log('Error: ', e.response.data)
    })
}

getMessage = function() {
    let url = "https://nexus.socialanalytics.genesyscloud.com/nexus/v3/chat/sessions/"+"af7826d8-9b40-4db4-ad76-3ce7dfcc54c3"+"/messages"
    let config = {
        headers: {
            'x-api-key':'b39dced7-8241-49a6-a4d3-f52eb797234b',
            'x-nexus-client-key':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiJhZjc4MjZkOC05YjQwLTRkYjQtYWQ3Ni0zY2U3ZGZjYzU0YzMiLCJ0cmFuc3BvcnRJZCI6ImIzZWUxZmZlLWZiZmEtNGY0MS04ZGIwLWY0NjMyMGEyZDBiOCIsInBhcnRpY2lwYW50SWQiOiIxOThkMTliMi1hNTU4LTRjOGItOTU0Mi1kOTM5YTE3OTZlMDgifQ.FduThOMHBXYnTzHcyHLfnAPz9-kRYL8lurvgTtTaSUQ'
        }
    }
    
    axios.get(url, config).then(response => {
        console.log('Response', response)
    })
    .catch(e => {
        console.log('Error: ', e.response.data)
    })
}

exports.startSession = startSession;
exports.getMessage = getMessage;