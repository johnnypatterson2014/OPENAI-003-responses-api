
export const sendChatHistoryPersistenceRequest = async () => {
  try {

    const response = await fetch('/api/mysql/chathistory', {
      method: 'GET'
    })

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.log('error in sendChatHistoryPersistenceRequest.');
    console.log(error)
  }
}
