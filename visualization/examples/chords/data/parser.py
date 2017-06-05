#!/usr/bin/python
import os, re, json, random
import numpy as np

def gen_hex_colour_code():
  return '#' + ''.join([random.choice('0123456789ABCDEF') for x in range(6)])


# if __name__ == '__main__':
dlimit = 10
arr = []
dmap = {}
dsum = {}
dpos = 0

with open(os.path.dirname(os.path.abspath(__file__)) + '/log') as f:
# with open('zimbra.log') as f:
# with open('cainelli/mackenzie/visualization/examples/chords/data/zimbra.log') as f:
  log = f.read().splitlines()

for l in log:
  try:
    f, t = re.findall(r'from\=\<.+?\@(.+?)\>.+?to\=\<.+?\@(.+?)\>', l)[0]
    arr.append([f,t])
  except:
    continue
  
  # initialize map domain(f) if not present
  if f not in dmap:
    dmap[f] = {'pos': dpos, 'count': 0, 'name': f}
    dpos += 1
  
  # initialize map domain(t) if not present
  if t not in dmap: 
    dmap[t] = {'pos': dpos, 'count': 0, 'name': f}
    dpos += 1
  
  dmap[t]['count'] += 1
  dmap[f]['count'] += 1

valid_domains = map(lambda d: d['pos'], sorted(dmap.values(), reverse=True)[:dlimit])
valid_domains.append({'count': 0, 'pos': None, 'name': 'rest'})

msize = len(valid_domains)
matrix = np.zeros((msize, msize))
rest_count = 0
for f,t in arr:
  fp, tp = len(valid_domains) - 1, len(valid_domains) - 1 # other domains
  if dmap[f]['pos'] in valid_domains:
    fp = valid_domains.index(dmap[f]['pos'])
  if dmap[t]['pos'] in valid_domains:
    tp = valid_domains.index(dmap[t]['pos'])  
  matrix[fp][tp] += 1

  if fp == len(valid_domains) - 1:
    rest_count += dmap[f]['count']
  
  if tp == len(valid_domains) - 1:
    rest_count += dmap[t]['count']

with open(os.path.dirname(os.path.abspath(__file__)) + '/matrix.json', 'w') as f:
  f.write(json.dumps(matrix.tolist()))

csv = open(os.path.dirname(os.path.abspath(__file__)) + '/cities.csv', 'w')
csv.write('name,latitude,longitude,population,color\n')
for d in sorted(dmap.values(), reverse=True)[:dlimit]:
  csv.write('{},,,{},{}\n'.format(d['name'],d['count'], gen_hex_colour_code()
))
csv.write('rest,,,{},{}'.format(rest_count, gen_hex_colour_code()))
csv.close()

print 'end'