
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

export const saveTreeTrace = async (name: string, data: any) => {
  try {

    const response = await fetch('/api/mysql/tracetree/save', {
      method: 'POST',
      body: JSON.stringify({
        id: name,
        traceBody: data
      }),
    })

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.log('error in saveTrace.');
    console.log(error)
  }
}

export const getTreeTrace = async () => {
  try {

    const response = await fetch('/api/mysql/tracetree', {
      method: 'GET'
    })

    const responseData = await response.json();

    return responseData.results;

  } catch (error) {
    console.log('error in getTreeTrace.');
    console.log(error)
  }
}

// export const saveTreeTrace = async (name: string, data: any) => {
//   try {

//     // 2. connect to database
//     const connection = await mysql.createConnection(mySqlConnectionParams)

//     // 3. create a query
//     let get_exp_query = 'INSERT INTO TraceTree VALUES (?, ?)';
//     let values: any[] = [name, JSON.stringify(data)]

//     // 4. exec the query and retrieve the results
//     const [results] = await connection.execute(get_exp_query, values)

//     // 5. close the connection when done
//     connection.end()

//     // return the results as a JSON API response

//   } catch (err) {
//     console.log('ERROR: API - ', (err as Error).message)

//   }
// }
