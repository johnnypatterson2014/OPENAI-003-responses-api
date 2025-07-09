
export const sendTracePersistenceRequest = async () => {
  try {

    const response = await fetch('/api/mysql/trace', {
      method: 'GET'
    })

    const responseData = await response.json();

    return responseData.results;
  } catch (error) {
    console.log('error in sendTracePersistenceRequest.');
    console.log(error)
  }
}

export const saveTrace = async (data: any) => {
  try {

    const response = await fetch('/api/mysql/trace/save', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.log('error in saveTrace.');
    console.log(error)
  }
}
