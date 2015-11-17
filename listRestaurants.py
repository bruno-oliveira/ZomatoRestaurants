# encoding=utf8
import sys
reload(sys)
sys.setdefaultencoding('utf8')
import requests
import urllib2
import urllib
import json
from bottle import *

def JSONgetter(id,cidade,count):
	#Lx - id 82
        #Porto - id 311
    if cidade=="Lisboa":
        id=82
    if cidade=="Porto":
        id=311

    url = "https://developers.zomato.com/api/v2.1/search?entity_id="+str(id)+"&entity_type=city&count="+str(count)

    querystring = {"q":cidade}

    headers = {
            'user_key': "56057f6401e8a354b5a5287d0b5f75c1",
                'cache-control': "no-cache"
                        }

    # create the request object and set some headers
    req = urllib2.Request(url)
    req.add_header('Accept', 'application/json')
    req.add_header("Content-type", "application/json, charset=utf-8")
    req.add_header('user_key', "56057f6401e8a354b5a5287d0b5f75c1")
    # make the request and print the results
    res = urllib2.urlopen(req)
    #print json.loads(aux)
    #print "---------------------------------------------"
    data = json.load(res)
    aux = json.dumps(data,ensure_ascii=False,encoding='utf8')
    return aux


#print JSONgetter()

import sys

# simple argument echo script to expose Python output to JS
list =[]
for i in sys.argv[1:]:
  list.append(i)

data = JSONgetter(list[0],list[1],list[2])
print data

"""
corrected_data = {}
for k, v in data.iteritems():
    corrected_data[k] = unicode(v).encode('utf-8')
dataFinal = urllib.urlencode(corrected_data)

print dataFinal
"""

