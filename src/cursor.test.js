import test from "ava"
import Cursor, { SeekFrom, CursorError } from "./cursor"

test("cursor is constructable", (t) => {
  const cursor = new Cursor(Buffer.from([1, 2, 3]))
  t.assert(cursor, "Cursor is constructable")
})

test("cursor throws when not supplied a valid buffer-like object ", async (t) => {
  const error = await t.throwsAsync(async () => {
    const c = new Cursor()
    return c
  })
  t.is(
    error.message,
    "Invalid readable object",
    "You must construct a Cursor with a valid readable object"
  )
  t.assert(error instanceof CursorError)
})

test("cursor cannot seek to a position outside of the range of the inner buffer", async (t) => {
  const buffer = Buffer.from([1, 2, 3])
  const cursor = new Cursor(buffer)
  const error = await t.throwsAsync(async () => {
    cursor.seek(30)
  })
  t.is(
    error.message,
    "Position outside of range",
    "You must seek to valid position within the readable object"
  )
  t.assert(error instanceof CursorError)
})

test("a cursor can seek absolutely", (t) => {
  const buffer = Buffer.from("abc")
  const cursor = new Cursor(buffer)
  t.is(cursor.position, 0, "cursor starts at 0")
  cursor.seek(2)
  t.is(cursor.position, 2, "cursor is at position 2")
})

test("a cursor can seek from the end", (t) => {
  const buffer = Buffer.from("abcd")
  const cursor = new Cursor(buffer)
  t.is(cursor.position, 0, "cursor is at the beginning")
  cursor.seek(1, SeekFrom.FROM_END)
  t.is(cursor.position, 3, "cursor is 1 position from the end")
})

test("a cursor can be rewound", (t) => {
  const cursor = new Cursor(Buffer.from([1, 2, 3]))
  cursor.seek(3)
  t.is(cursor.position, 3, "cursor is at position 3")
  cursor.rewind(2)
  t.is(cursor.position, 1, "cursor is at position 1")
})

test("a cursor can be moved forward", (t) => {
  const cursor = new Cursor(Buffer.from([1, 2, 3]))
  cursor.seek(1)
  t.is(cursor.position, 1, "cursor is at position 1")
  cursor.forward(2)
  t.is(cursor.position, 3, "cursor is at position 3")
})

test("a cursor can determine if you are `done`", (t) => {
  const cursor = new Cursor(Buffer.from("abc"))
  t.is(cursor.done(), false, "cursor is not at the end")
  cursor.seek(3)
  t.is(cursor.done(), true, "cursor is complete")
})
