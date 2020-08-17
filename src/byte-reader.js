import Cursor from "./cursor"

// enums

/**
 *
 */
export const Endian = Object.freeze({
  BIG: "big",
  LITTLE: "little",
})

/**
 *
 */
class ByteReader extends Cursor {
  /**
   *
   * @param {*} buf
   * @param {*} endian
   */
  constructor(buf, endian = Endian.BIG) {
    super(buf)
    this.endian = endian
  }

  /**
   *
   * @param {*} param0
   */
  string({ length }) {
    return this.read(length).toString()
  }

  /**
   *
   * @param {*} length
   */
  read(length) {
    const data = this.buf.slice(this.position, this.position + length)
    this.forward(length)
    return data
  }

  int(length) {
    const position = this.position
    this.forward(length)
    return this.endian === Endian.BIG
      ? this.buf.readIntBE(position, length)
      : this.buf.readIntLE(position, length)
  }

  uint(length) {
    const position = this.position
    this.forward(length)
    return this.endian === Endian.BIG
      ? this.buf.readUIntBE(position, length)
      : this.buf.readUIntLE(position, length)
  }

  /**
   *
   */
  int8() {
    return this.int(1)
  }

  /**
   *
   */
  uint8() {
    return this.uint(1)
  }

  /**
   *
   */
  int16() {
    return this.int(2)
  }

  /**
   *
   */
  uint16() {
    return this.uint(2)
  }

  /**
   *
   */
  int24() {
    return this.int(3)
  }

  /**
   *
   */
  uint24() {
    return this.uint(3)
  }

  /**
   *
   */
  int32() {
    return this.int(4)
  }

  /**
   *
   */
  uint32() {
    return this.uint(4)
  }

  /**
   *
   */
  int64() {
    const chunk = this.read(8)
    if (this.endian === Endian.BIG) {
      return chunk.readBigInt64BE()
    } else {
      return chunk.readBigInt64LE()
    }
  }

  /**
   *
   */
  uint64() {
    const chunk = this.read(8)
    if (this.endian === Endian.BIG) {
      return chunk.readBigUInt64BE()
    } else {
      return chunk.readBigUInt64LE()
    }
  }

  /**
   *
   */
  float() {
    const chunk = this.read(8)
    if (this.endian === Endian.BIG) {
      return chunk.readFloatBE()
    } else {
      return chunk.readFloatLE()
    }
  }

  /**
   *
   */
  double() {
    const chunk = this.read(8)
    if (this.endian === Endian.BIG) {
      return chunk.readDoubleBE()
    } else {
      return chunk.readDoubleLE()
    }
  }

  int8Array({ length }) {
    const chunk = this.read(length)
    return Int8Array.from(chunk)
  }

  static of(buf) {
    return new ByteReader(buf)
  }
}

export default ByteReader
