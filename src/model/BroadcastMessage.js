import moment from "moment"

export default class BroadcastMessage {
  constructor({
    eventDescription,
    type,
    finalText,
    template,
    mediaHeaderLnk,
    failedDetail,
    actor,
    assignee,
    topicName,
    id,
    created,
    conversationId,
    ticketId,
    eventType,
  }) {
    this.eventDescription = eventDescription
    this.type = type
    this.finalText = finalText
    this.template = template
    this.mediaHeaderLink = mediaHeaderLnk
    this.failedDetail = failedDetail
    this.actor = actor
    this.assignee = assignee
    this.topicName = topicName
    this.id = id
    this.created = moment(created)
    this.eventType = eventType
  }
}
