#!/usr/bin/python
import os, re, json, random
import numpy as np

if __name__ == '__main__':
  link_limit = 5
  dmap = {}
  dpos = 0

  with open(os.path.dirname(os.path.abspath(__file__)) + '/log') as f:
    log = f.read().splitlines()

  linkmap = {}
  nodemap = {}
  for l in log:
    try:
      f, t = re.findall(r'from\=\<(.+?)\>.+?to\=\<(.+?)\>', l)[0]
    except Exception, e:
      continue
    # Link mapping
    key = '{}:{}'.format(f,t)
    if key not in linkmap:
      linkmap[key] = {
        'source': f,
        'target': t,
        'value': 0,
      }
    linkmap[key]['value'] += 1


  links = filter(lambda x: x['value'] > link_limit, linkmap.values())
  for l in links:
    f, t, _ = l.values()  
    if f not in nodemap:
      domain = f.split('@')[1]
      if domain not in dmap:
        dmap[domain] = dpos
        dpos += 1

      nodemap[f] = {
        'id': f,
        'group': dmap[domain]
      }
    
    if t not in nodemap:
      domain = t.split('@')[1]
      if domain not in dmap:
        dmap[domain] = dpos
        dpos += 1

      nodemap[t] = {
        'id': t,
        'group': dmap[domain]
      }



  data = {
    'nodes': nodemap.values(),
    'links': links
  }
  with open(os.path.dirname(os.path.abspath(__file__)) + '/miserables.json', 'w') as f:
    f.write(json.dumps(data, indent=2))
  print 'end'