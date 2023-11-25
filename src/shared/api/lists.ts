function fetchLists() {
  return fetch('http://127.0.0.1:8081/lists', {
    method: 'GET',
    // mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Connection: 'keep-alive'
    }
  })
}

export { fetchLists }
