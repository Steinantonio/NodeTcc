const email =  `juniorslayerr@gmail.com`;
//const email = 'falecomalexaugusto@gmail.com';
const password = 'integracao.jira';


module.exports.options = function(url, method, bodyData) {
    console.log(email);
    return {
        method: method,
        url: url,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + Buffer.from(email + ':' + process.env.ATLASSIAN_TOKEN).toString('base64'),
        },
        body: bodyData,
        json: true
    };
};

module.exports.HeadersForRequest = function(req, res) {
    var allowance = res.header("Access-Control-Allow-Origin", "*");
    var origin = res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    return {
        allowance,
        origin
    };
};