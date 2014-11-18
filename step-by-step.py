import httplib
import urllib
import xml.etree.ElementTree as ET

query = "x/2+4=13"
fmt = "plaintext,image"
podstate = "Solution__Step-by-step solution"

conn = httplib.HTTPConnection("api.wolframalpha.com")
params = urllib.urlencode({'input': query,
                           'format': fmt,
                           'podstate' : podstate})
headers = {"Content-type": "application/x-www-form-urlencoded",
           "Accept": "text/plain"}
conn.request("POST","/v2/query?appid=KK9KPX-7XP46UWA8W",params,headers)
response = conn.getresponse()

data = response.read()
conn.close()
root = ET.fromstring(data)
for pod in root:
    title = pod.get('title')
    if (title == "Solutions"):
        subpod = pod[1]
        #list of text explaining each step
        steps = subpod[0].text.splitlines()
        for i in range(0,length(steps),2):
        	print i
        
