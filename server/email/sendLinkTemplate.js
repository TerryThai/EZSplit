let url

if (process.env.NODE_ENV !== 'production') {
  url = `http://localhost:3000`
} else {
  url = `https://ezsplit.herokuapp.com`
}

module.exports = email => {
  return `
  <html>
  <body>
    <div style='text-align: center;'>
      <h3> Hello! Thanks for using EzSplit! </h3>
      <p>${email.body}<p>
      <div><a href="${url}/editReceipt/${
    email.receiptId
  }">Click here to open table</a></div>
    </div>
  </body>
  </html>
    `
}
