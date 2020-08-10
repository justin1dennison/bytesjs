function Cursor(buf) {
  if (!(this instanceof Cursor)) {
    return new Cursor(buf);
  }
  this.buf = buf;
  this.position = 0;
}

export default Cursor;
