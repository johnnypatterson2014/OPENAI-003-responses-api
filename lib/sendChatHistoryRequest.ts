
export const sendChatHistoryRequest = async (responseMessageId: string) => {
  try {


    // console.log('responseMessageId: ' + responseMessageId)

    // example GET
    const response = await fetch('/api/test2/' + responseMessageId, {
      method: 'GET'
    })

    // example POST
    // const mapBody = { 'content': content, 'role': chatMessage.role, 'previousResponseId': chatMessage.previousResponseId };
    // const response = await fetch('/api/test', {
    //   method: 'POST',
    //   body: JSON.stringify(mapBody),
    // });

    const responseData = await response.json();
    // console.log('reponse in sendChatRequest: ' + JSON.stringify(responseData));

    return responseData;
  } catch (error) {
    console.log('error in sendChatHistoryRequest.');
    console.log(error)
  }
}
