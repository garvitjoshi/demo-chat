const axios = require('axios')
var qs = require('querystring');

user = { 'firstName': 'Sanjay',
'lastName': 'Saha',
'endpoint': 'oasis_chat',
'ChatProfile': 'Oasis_Chat_UAT',
'email': 'ssanjay@vmware.com',
'stream': 'uat',
'nickname': 'Sanjay' }

startSession = async () => {
    url = 'https://nexus.socialanalytics.genesyscloud.com/nexus/v3/chat/sessions'
    data = qs.stringify({ 'data[firstName]': 'Sanjay',
    'data[lastName]': 'Saha',
    'data[endpoint]': 'oasis_chat',
    'data[ChatProfile]': 'Oasis_Chat_UAT',
    'data[email]': 'ssanjay@vmware.com',
    'data[stream]': 'uat',
    'data[nickname]': 'Sanjay' });
    config = {
        headers: {
            'x-api-key': 'b39dced7-8241-49a6-a4d3-f52eb797234b',
            'Content-Type':'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
    }
    try {
       response = await axios.post(url, data, config)
       return response.data
    } catch (error) {
        console.log('err..', error)
    }
}

getMessage = async (session) => {

    if(session){
        let url = "https://nexus.socialanalytics.genesyscloud.com"+session.selfUri+"/messages"
        let config = {
            headers: {
                'x-api-key':'b39dced7-8241-49a6-a4d3-f52eb797234b',
                'x-nexus-client-key':session.clientToken
            }
        }
        try {
            response = await axios.get(url, config)
            return response.data
        } catch (error) {
             console.log('err..', error)
        }
    }else{
        console.log('Session Not created Get Message')
    }
   
}

sendMessage = async (session, msg) => {
    if(session){
    url = "https://nexus.socialanalytics.genesyscloud.com"+session.selfUri+"/messages"
    data = qs.stringify({ 'data[type]': 'Text', 'data[text]': msg });
    config = {
        headers: {
            'x-api-key': 'b39dced7-8241-49a6-a4d3-f52eb797234b',
            'Content-Type':'application/x-www-form-urlencoded',
            'x-nexus-client-key':session.clientToken,
            'Content-Length': Buffer.byteLength(data)
        }
    }
    try {
       response = await axios.post(url, data, config)
       return response.data
    } catch (error) {
        console.log('err..', error)
    }
    }else{
        console.log('Session Not created send Message')
    }
}

exports.startSession = startSession;
exports.getMessage = getMessage;
exports.sendMessage = sendMessage;