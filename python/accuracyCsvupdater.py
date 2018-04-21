# -*- coding: utf-8 -*-
"""
Created on Wed Apr 18 22:49:17 2018

@author: GLEN_DMELLO
"""
def warn(*args, **kwargs):
    pass
import warnings
warnings.warn = warn

#command line arguments, here from mongo currenResult,userResult
from sys import argv

script,currentResult,userResult = argv

import csv   
fields=[currentResult,userResult]
with open(r"python\Accuracy.csv", 'a',newline='') as f:
    writer = csv.writer(f)
    writer.writerow(fields)



print("accuracy csv file updated")
    