# -*- coding: utf-8 -*-
"""
Created on Wed Apr 18 20:45:06 2018

@author: GLEN_DMELLO
"""

def warn(*args, **kwargs):
    pass
import warnings
warnings.warn = warn


#import numpy as np

import pandas as pd

# Importing the dataset
dataset = pd.read_csv(r'C:\Users\GLEN DEMELLO\Documents\GitHub\loginapp-slave\python\Accuracy.csv')
X = dataset.iloc[:, 0].values
y = dataset.iloc[:, 1].values





from sklearn.metrics import accuracy_score
A=accuracy_score(y,X)

print(A)