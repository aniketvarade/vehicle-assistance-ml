# -*- coding: utf-8 -*-
"""
Created on Wed Mar 14 22:37:42 2018

@author: GLEN DEMELLO
"""
# enter script,latitude,longitude,totalkm,accident,realcool,realoil,realtire
# -*- coding: utf-8 -*-

#@author: GLEN DEMELLO


#ignoring warning in output for standardscaler
def warn(*args, **kwargs):
    pass
import warnings
warnings.warn = warn

#importing libs and aliasing
import pandas as pd


# Importing the dataset
dataset = pd.read_csv(r"python/Project.csv")
X_train = dataset.iloc[:, [0,1,2,3,4,5,6,7]].values
y_train = dataset.iloc[:, 8].values


# Feature Scaling
from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
X_train = sc.fit_transform(X_train)


# Fitting Random Forest Classification to the Training set
from sklearn.ensemble import RandomForestClassifier
classifier = RandomForestClassifier(n_estimators = 10, criterion = 'entropy', random_state = 0)
classifier.fit(X_train, y_train)

#command line arguments, here script store the name of the file ie opexample.py
from sys import argv
#define accident,alevation,raino,temperature
script,latitude,longitude,currkm,accident,currcool,curroil,currtire = argv
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
#store command line arguments into input here
new_test=([[currkm,accident,currcool,curroil,currtire,elevation,rain,temperature]])

#standard scale the input
new_test=sc.transform(new_test)

#use the ML model to predict
new_pred=classifier.predict(new_test)

#print predicted op
print(new_pred[0])
