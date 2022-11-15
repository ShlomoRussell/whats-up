import { runQuery } from "../dals/dal.js";
import MessageModel from "../models/message.model.js";

/**
 * @param {string} contactId
 * @param {string} userId
 */
export async function getContactMessages(contactId, userId) {
  const query = "SELECT * FROM `messages` WHERE `from_id` = ? AND `to_id` = ? ";
  try {
    const messages = await runQuery(query, [userId, contactId]);
    return messages[0].map((m) => new MessageModel(m));
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 *
 * @param {string} messageId
 */
export async function deleteMessage(messageId) {
  const query = "DELETE FROM `messages` WHERE _id = ?";
  try {
    const deleted = await runQuery(query, [messageId]);
    if (deleted) {
      return true;
    } else return false;
  } catch (error) {
    throw new Error(error.message);
  }
}
