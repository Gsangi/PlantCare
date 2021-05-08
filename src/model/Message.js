export default class Message {
  constructor(id, msg, time, sender, sent = false) {
    this.id = id
    this.msg = msg
    this.time = time
    this.sender = sender
    this.sent = sent
    this.markSent = () => {
      this.sent = true
    }
  }
}
