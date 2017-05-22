#!/usr/bin/python
import random
if __name__ == '__main__':
  topics = ['Financial', 'Marketing', 'Commercial', 'Business', 'Payment', 'Government']
  with open('users.txt') as f:
    users = f.read().splitlines()
  for topic in topics:
    print '{}'.format(topic)
    for user in users:
      user = user.replace('.','-')
      print '{}.{},{}'.format(topic,user,random.randint(1, 1000))