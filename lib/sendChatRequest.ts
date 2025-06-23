import { ChatMessage } from '@/components/fesk/ChatMessageWrapper'

export const sendChatRequest = async (chatMessage: ChatMessage) => {
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
    const response = await fetch('/api/test', {
      method: 'POST',
      body: JSON.stringify({
        model: chatMessage.model,
        role: chatMessage.role,
        temperature: chatMessage.temperature,
        content: chatMessage.content,
        previousResponseId: chatMessage.previousResponseId,
        websearchEnabled: chatMessage.websearchEnabled,
        vectorStoreId: chatMessage.vectorStoreId,
        mcpServerLabel: chatMessage.mcpServerLabel,
        mcpServerUrl: chatMessage.mcpServerUrl
      }),
    });

    const responseData = await response.json();
    // console.log('reponse in sendChatRequest: ' + JSON.stringify(responseData));

    return responseData;
  } catch (error) {
    console.log('error in sendChatRequest.');
    console.log(error)
  }
}
