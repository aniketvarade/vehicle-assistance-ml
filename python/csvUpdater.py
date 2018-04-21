# -*- coding: utf-8 -*-
"""
Created on Wed Apr 11 20:21:59 2018

@author: GLEN_DMELLO
"""
#parse bobs here

def warn(*args, **kwargs):
    pass
import warnings
warnings.warn = warn

#command line arguments, here script store the name of the file ie opexample.py
from sys import argv
#define accident,alevation,raino,temperature
script,latitude,longitude,currkm,accident,currcool,curroil,currtire,correctPredictedvalue = argv
import requests, json
#find elevation

r = requests.get("https://maps.googleapis.com/maps/api/elevation/json?locations="+latitude+","+longitude+"&key=AIzaSyClWzbqFj9lTrZuQjDljhaDtX7S2OknFVg") 

r= json.loads(r.text)

elevation=r['results'][0]['elevation']

#find whether rain or not
s = requests.get("http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&units=metric&appid=7e7127ffe138d7d535b8e2dc0175d0cf") 

s= json.loads(s.text)



def weather_search(response, keyword):
    """Searches the weather main and description fields for given keyword"""
    keyword = keyword.lower()
    for entry in response['weather']:
        for key in ('main', 'description'):
            if keyword in entry.get(key, '').lower():
                return True

    # nothing found
    return False

# printing 1 or 0



if weather_search(s, 'rain'):
    rain=1
else:
    rain=0

#get temperature
temperature=s['main']['temp']

import csv   
fields=[currkm,accident,currcool,curroil,currtire,elevation,rain,temperature,correctPredictedvalue]
with open(r"python/Project.csv", 'a', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(fields)
    
print("csv file has been updated")
    



