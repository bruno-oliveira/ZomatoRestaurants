import requests
import urllib2
import json
from bottle import *

def JSONgetter(cidade):
    url = "https://developers.zomato.com/api/v2.1/cities?q="+cidade

    querystring = {"q":cidade}

    headers = {
            'user_key': "56057f6401e8a354b5a5287d0b5f75c1",
                'cache-control': "no-cache"
                        }

    # create the request object and set some headers
    req = urllib2.Request(url)
    req.add_header('Accept', 'application/json')
    req.add_header("Content-type", "application/x-www-form-urlencoded")
    req.add_header('user_key', "56057f6401e8a354b5a5287d0b5f75c1")
    # make the request and print the results
    res = urllib2.urlopen(req)
    data = json.load(res)
    return data


#print JSONgetter()

import sys

# simple argument echo script to expose Python output to JS
for v in sys.argv[1:]:
  print JSONgetter(v)
