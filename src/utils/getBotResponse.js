import chatData from '../dataChatboot/chatData.json';

export function getBotResponse(userMessage) {
  if (!userMessage) return "";

  const message = userMessage.toLowerCase();

  for (let item of chatData) {
    if (item.keywords.some(key => message.includes(key.toLowerCase()))) {
      return item.response;
    }
  }

  return "Sorry, I don't understand 😕";
}