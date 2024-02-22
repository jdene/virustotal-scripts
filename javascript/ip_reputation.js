
import dotenv from 'dotenv';
import readline from 'readline'

dotenv.config({ path: '../.env' })

const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


export function isValidIP(ipAddr) {
    return ipAddr.match(new RegExp('^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$', 'g'));
}

export async function fetchJson(ipAddr) {
    const url = `https://www.virustotal.com/api/v3/ip_addresses/${ipAddr}`
    if (!isValidIP(ipAddr)) {
        throw new Error("Enter a valid IP address.")
    }
    const response = await fetch(url, {
        headers: {
            "accept": "application/json", "x-apikey": process.env.VT_KEY
        }
    });
    if (response.ok) {
        let json = await response.json();
        return json;
    }
    else {
        throw new Error(`Error code: ${response.status}, ${response.statusText}`);
    }
}


function checkIpReputation(ipAddr) {
    fetchJson(ipAddr)
        .then(json => {
            console.log(`\nReputation for ${ipAddr} is: ${json.data.attributes?.reputation} \n`);
            console.log(`\nMore info for ${ipAddr}:\n ${JSON.stringify(json.data, null, '\t')}`);
        });
}

if (typeof jasmine === 'undefined') {
    input.question("Enter IP Address to check reputation: ", (ip) => {
        checkIpReputation(ip);
        input.close();
    });
}
