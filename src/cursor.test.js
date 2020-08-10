import test from 'ava'
import Cursor from './cursor'


test('test cursor is constructable', t => {
  const cursor = new Cursor()
  t.assert(cursor, 'Cursor is constructable')
})
