

export const getLangsmithTrace = async (traceId: string) => {
  try {

    // console.log('content: ' + content)
    // console.log('role: ' + chatMessage.role)
    // console.log('previousResponseId: ' + chatMessage.previousResponseId)

    // example GET
    const response = await fetch('/api/langsmith/trace/' + traceId, {
      method: 'GET'
    })
    // return await response.json()

    // example POST
    // const response = await fetch('/api/langsmith/trace', {
    //   method: 'GET',
    //   body: JSON.stringify(chatMessage),
    // });

    const responseData = await response.json();
    // console.log('reponse in sendChatRequest: ' + JSON.stringify(responseData));

    return responseData;
  } catch (error) {
    console.log('error in getLangsmithTrace.');
    console.log(error)
  }
}
