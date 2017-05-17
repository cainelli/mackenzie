#!/usr/bin/env python
# -*- coding: utf-8 -*-

import googlemaps
import os, sys, json
if __name__ == '__main__':
  
  gmaps = googlemaps.Client(key=os.environ['GOOGLE_KEY'])
  res = gmaps.geocode('United Republic of Tanzania')
  
  print(json.dumps(res, indent=2))
    