import moment from "moment"

export default class Message {
  constructor({ id, type, text, timestamp, owner, waId, senderName, statusString = "SENT" }) {
    this.id = id
    this.type = type
    this.text = text
    this.timestamp = moment.unix(timestamp)
    this.owner = owner
    this.waId = waId
    this.senderName = senderName
    this.statusString = statusString.toUpperCase()
    this.changeStatus = (status) => {
      this.statusString = status.toUpperCase()
    }
  }
}
