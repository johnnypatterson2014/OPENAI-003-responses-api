import { ChatHistory } from '@/components/ChatMessageWrapper'

export const deleteChatHistorySession = async (chatHistory: ChatHistory) => {
  try {

    const response = await fetch('/api/mysql/chathistory/delete', {
      method: 'POST',
      body: JSON.stringify(chatHistory),
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.log('error in deleteChatHistorySession.');
    console.log(error)
  }
}
