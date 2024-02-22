# Virustotal Scripts

This project contains scripts to query for reputation of an IP address using Python and JavaScript, and tests for each. Python tests utilize unittest, and Jasmine is used for JavaScript testing. 

More info on the API used can be found at: https://docs.virustotal.com/reference/ip-info

### API Key
This project uses a `.env` file to store and refernece your API key. To start, add your Virustotal API key to the .env file under `VT_KEY`


### Python
`cd python`

To run Python program: `python ip_reputation.py`

To run Python tests: `python test_ip_reputation.py`


### JavaScript
`cd javascript`

`npm i`

To run JavaScript program: `node ip_reputation.js`

To run JavaScript tests: `npm test`




