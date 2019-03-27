module.exports = email => {
  return `
  <html>
  <body>
    <div style='text-align: center;'>
      <h3> Hello! Thanks for using EzSplit! </h3>
      <p>${email.body}<p>
      <div><a href="https://ezsplit.herokuapp.com/editReceipt/${
        email.receiptId
      }">Click here to open table</a></div>
    </div>
  </body>
  </html>
    `
}
