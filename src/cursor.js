// enums
/**
 *
 */
export const SeekFrom = Object.freeze({
  ABSOLUTE: 0,
  RELATIVE: 1,
  FROM_END: 2,
})

// errors
/**
 *
 */
export class CursorError extends Error {}
CursorError.InvalidReadableObject = new CursorError("Invalid readable object")
CursorError.InvalidPosition = new CursorError("Position outside of range")

/**
 * Cursor provides a way to maintain the position of a Readable object
 */
class Cursor {
  constructor(buf) {
    if (!buf) throw CursorError.InvalidReadableObject

    this.buf = buf
    this.position = 0
  }

  /**
   *
   * @param {number} offset
   * @param {SeekFrom} from
   */
  seek(offset, from = SeekFrom.ABSOLUTE) {
    if (from === SeekFrom.ABSOLUTE && offset > this.buf.length)
      throw CursorError.InvalidPosition
    if (from === SeekFrom.FROM_END && this.buf.length - offset < 0)
      throw CursorError.InvalidPosition
    if (
      from === SeekFrom.RELATIVE &&
      (this.position + offset > this.buf.length || this.position + offset < 0)
    )
      throw CursorError.InvalidPosition

    switch (from) {
      case SeekFrom.FROM_END:
        this.position = this.buf.length - offset
        break
      case SeekFrom.RELATIVE:
        this.position += offset
        break
      default:
        this.position = offset
    }
  }

  /**
   *
   * @param {number} amount
   */
  forward(amount) {
    this.seek(amount, SeekFrom.RELATIVE)
  }

  /**
   *
   * @param {number} amount
   */
  rewind(amount) {
    this.forward(-amount)
  }

  /**
   *
   * @returns {boolean}
   */
  done() {
    return this.position >= this.buf.length - 1
  }
}

export default Cursor
