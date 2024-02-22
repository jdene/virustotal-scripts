import re, os, json
import requests as req
from dotenv import load_dotenv

load_dotenv()
key = os.getenv("VT_KEY")


def ip_is_valid(ip_addr: str):
    return re.match(r'^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$', ip_addr) is not None
    
def check_ip_reputation(ip_addr: str):
    if(ip_is_valid(ip_addr)):
        url = f"https://www.virustotal.com/api/v3/ip_addresses/{ip_addr}"
        headers = {"accept": "application/json", "x-apikey": key}
        response = req.get(url, headers=headers)
        if(response.status_code == 200):
           data = response.json()
           return(json.dumps(data['data'], indent=2))
        else:
            return(f"Error code: {response.status_code}")
    else:
        return("Enter a valid IP address.")
        
    
def main():
    ip_input = input("Enter IP Address to check reputation: ")
    response_data = check_ip_reputation(ip_input)
    print(f"\nReputation for {ip_input} is: ", json.loads(response_data)['attributes']['reputation'])
    print(f"\nMore info for {ip_input}: \n", response_data)



if __name__ == "__main__":
    main()