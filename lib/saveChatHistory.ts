import { ChatMessage, ChatHistory } from '@/components/ChatMessageWrapper'

export const saveChatHistory = async (chatHistory: ChatHistory) => {
  try {

    // console.log('content: ' + content)
    // console.log('role: ' + chatMessage.role)
    // console.log('previousResponseId: ' + chatMessage.previousResponseId)

    // example GET
    // const response = await fetch('/api/test', {
    //   method: 'GET'
    // })
    // return await response.json()

    // example POST
    const response = await fetch('/api/mysql/chathistory/save', {
      method: 'POST',
      body: JSON.stringify(chatHistory),
    });

    const responseData = await response.json();
    // console.log('reponse in sendChatRequest: ' + JSON.stringify(responseData));

    return responseData;
  } catch (error) {
    console.log('error in saveChatHistory.');
    console.log(error)
  }
}
