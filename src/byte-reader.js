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

  /**
   *
   */
  int8() {
    return this.read(1).readInt8()
  }

  /**
   *
   */
  uint8() {
    return this.read(1).readUInt8()
  }

  /**
   *
   */
  int16() {
    const chunk = this.read(2)
    if (this.endian === Endian.BIG) {
      return chunk.readInt16BE()
    } else {
      return chunk.readInt16LE()
    }
  }

  /**
   *
   */
  uint16() {
    const chunk = this.read(2)
    if (this.endian === Endian.BIG) {
      return chunk.readUInt16BE()
    } else {
      return chunk.readUInt16LE()
    }
  }

  /**
   *
   */
  int32() {
    const chunk = this.read(4)
    if (this.endian === Endian.BIG) {
      return chunk.readInt32BE()
    } else {
      return chunk.readInt32LE()
    }
  }

  /**
   *
   */
  uint32() {
    const chunk = this.read(4)
    if (this.endian === Endian.BIG) {
      return chunk.readUInt32BE()
    } else {
      return chunk.readUInt32LE()
    }
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
