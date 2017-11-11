import { initialState, findPath } from './store'

describe('client', function() {
  it('should work', function() {
    const path = findPath(initialState)

    expect(path[0]).toEqual(initialState.monsterPosition)
    expect(path[path.length - 1]).toEqual(initialState.playerPosition)
  })
})
