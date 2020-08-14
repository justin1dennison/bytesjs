import test from "ava"
import ByteReader, { Endian } from "./byte-reader"

test("can read a string", (t) => {
  const reader = ByteReader.of("abcd1")
  const sample = reader.string({ length: 4 })
  t.is(sample, "abcd")
  t.is(reader.position, 4)
})

test("can read 8 bit signed integers", (t) => {
  const reader = ByteReader.of(Buffer.from([1, 2, 3, 4]))
  const sample = reader.int8()
  t.is(sample, 1)
  t.is(reader.position, 1)
})

test("can read 8 bit unsigned integers", (t) => {
  const reader = ByteReader.of(Buffer.from([2, 3, 4]))
  const sample = reader.uint8()
  t.is(sample, 2)
  t.is(reader.position, 1)
})

test("can read 16 bit signed big-endian integers", (t) => {
  const reader = ByteReader.of(Buffer.from([0, 10]))
  const sample = reader.int16()
  t.is(sample, 10)
  t.is(reader.position, 2)
})

test("can read 16 bit unsigned big-endian integers", (t) => {
  const reader = ByteReader.of(Buffer.from([0, 10]))
  const sample = reader.uint16()
  t.is(sample, 10)
  t.is(reader.position, 2)
})

test("can read 16 bit signed little-endian integers", (t) => {
  const reader = new ByteReader(Buffer.from([10, 0]), Endian.LITTLE)
  const sample = reader.int16()
  t.is(sample, 10)
  t.is(reader.position, 2)
})

test("can read 16 bit unsigned little-endian integers", (t) => {
  const reader = new ByteReader(Buffer.from([10, 0]), Endian.LITTLE)
  const sample = reader.uint16()
  t.is(sample, 10)
  t.is(reader.position, 2)
})

test("can read 32 bit signed big-endian integers", (t) => {
  const reader = ByteReader.of(Buffer.from([0, 0, 0, 10]))
  const sample = reader.int32()
  t.is(sample, 10)
  t.is(reader.position, 4)
})

test("can read 32 bit unsigned big-endian integers", (t) => {
  const reader = ByteReader.of(Buffer.from([0, 0, 0, 10]))
  const sample = reader.uint32()
  t.is(sample, 10)
  t.is(reader.position, 4)
})

test("can read 32 bit signed little-endian integers", (t) => {
  const reader = new ByteReader(Buffer.from([10, 0, 0, 0]), Endian.LITTLE)
  const sample = reader.int32()
  t.is(sample, 10)
  t.is(reader.position, 4)
})

test("can read 32 bit unsigned little-endian integers", (t) => {
  const reader = new ByteReader(Buffer.from([10, 0, 0, 0]), Endian.LITTLE)
  const sample = reader.uint32()
  t.is(sample, 10)
  t.is(reader.position, 4)
})

test("can read 64 bit signed big-endian integers", (t) => {
  const reader = ByteReader.of(Buffer.from([0, 0, 0, 0, 0, 0, 0, 10]))
  const sample = reader.int64()
  t.is(sample, BigInt(10))
  t.is(reader.position, 8)
})

test("can read 64 bit unsigned big-endian integers", (t) => {
  const reader = ByteReader.of(Buffer.from([0, 0, 0, 0, 0, 0, 0, 10]))
  const sample = reader.uint64()
  t.is(sample, BigInt(10))
  t.is(reader.position, 8)
})

test("can read 64 bit signed little-endian integers", (t) => {
  const reader = new ByteReader(
    Buffer.from([10, 0, 0, 0, 0, 0, 0, 0]),
    Endian.LITTLE
  )
  const sample = reader.int64()
  t.is(sample, BigInt(10))
  t.is(reader.position, 8)
})

test("can read 64 bit unsigned little-endian integers", (t) => {
  const reader = new ByteReader(
    Buffer.from([10, 0, 0, 0, 0, 0, 0, 0]),
    Endian.LITTLE
  )
  const sample = reader.uint64()
  t.is(sample, BigInt(10))
  t.is(reader.position, 8)
})

test("can read big-endian float", (t) => {
  const reader = ByteReader.of(Buffer.from([0, 0, 0, 0, 0, 0, 0, 10]))
  const sample = reader.float()
  t.is(sample, 0)
  t.is(reader.position, 8)
})

test("can read little-endian float", (t) => {
  const reader = new ByteReader(
    Buffer.from([10, 0, 0, 0, 0, 0, 0, 0]),
    Endian.LITTLE
  )
  const sample = reader.float()
  t.is(sample, 1.401298464324817e-44)
  t.is(reader.position, 8)
})

test("can read big-endian double", (t) => {
  const reader = new ByteReader(
    Buffer.from([10, 0, 0, 0, 0, 0, 0, 0]),
    Endian.LITTLE
  )
  const sample = reader.double()
  t.is(sample, 5e-323)
  t.is(reader.position, 8)
})

test("can read little-endian double", (t) => {
  const reader = new ByteReader(
    Buffer.from([10, 0, 0, 0, 0, 0, 0, 0]),
    Endian.LITTLE
  )
  const sample = reader.double()
  t.is(sample, 5e-323)
  t.is(reader.position, 8)
})

test("can read an int8array", (t) => {
  const reader = new ByteReader(
    Buffer.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
    Endian.BIG
  )
  const actual = reader.int8Array({ length: 5 })
  const expected = Int8Array.from([1, 2, 3, 4, 5])
  t.deepEqual(actual, expected)
  t.is(reader.position, 5)
})
