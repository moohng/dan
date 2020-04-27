const merge = require('../lib/merge')

it('merge', () => {
  const a = {
    name: 'Kevin',
    age: 18,
    likes: ['music', 'ball'],
    dog: {
      name: 'xiao bai'
    }
  }
  const b = {
    name: 'Kevin Mo',
    height: 1.8,
    likes: ['game', 'music'],
    dog: {
      age: 3
    }
  }
  expect(merge(a, b)).toEqual({
    name: 'Kevin Mo',
    age: 18,
    height: 1.8,
    likes: ['music', 'ball', 'game'],
    dog: {
      name: 'xiao bai',
      age: 3
    }
  })
})
