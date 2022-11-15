export default class MessageModel {
  /**
   * @param {Object} message
   * @param {string}  message._id
   * @param {string} message.from
   * @param {string} message.to
   * @param {string} message.message
   * @param {'sent' | 'received'} message.type
   * @param {Date} message.time
   */
  constructor({ _id, from, to, message, type, time }) {
    this.id = _id;
    this.from = from;
    this.to = to;
    this.message = message;
    this.time = time;
    this.type = type;
  }
}
