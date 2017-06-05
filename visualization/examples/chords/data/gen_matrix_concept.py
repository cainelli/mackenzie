#!/usr/bin/python
import numpy as np

if __name__ == '__main__':
  arr = [['d1.com', 'd2.com'],['d1.com','d3.com'],['d2.com','d3.com'],['d2.com','d3.com'],['d2.com','d1.com'],['d1.com','d1.com']] 
  dmap = {}
  matrix_size = 0

  for f,t in arr:
    # initialize map domain(f) if not present
    if f not in dmap:
      dmap[f] = matrix_size
      matrix_size += 1
    
    # initialize map domain(t) if not present
    if t not in dmap: 
      dmap[t] = matrix_size
      matrix_size += 1
  
  matrix = np.zeros((matrix_size, matrix_size))
  for f,t in arr:
    matrix[dmap[f]][dmap[t]] += 1
  
  # print('domain map: {}\nmatrix: {}'.format(dmap, matrix.tolist()))
  print('domain map: {}\nmatrix: {}'.format(dmap, matrix))
# domain map: {'d3.com': 2, 'd2.com': 1, 'd1.com': 0}
# matrix: [[ 1.  1.  1.]
#  [ 1.  0.  2.]
#  [ 0.  0.  0.]]
