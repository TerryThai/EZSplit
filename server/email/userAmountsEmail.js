module.exports = email => {
  return `
  <html>
  <body>
    <div style='text-align: center;'>
      <h4> Thanks for using ezsplit! </h4>
      <p>Group :${email.groupName}<p>
      <div><a href="http://localhost:3000/editReceipt/${
        email.receiptId
      }">Click here if you need reference to the table</a></div>
      <p>${email.body}<p>
      <p>${email.payers}<p>
      <div>
    </div>
  </body>
  </html>
    `
}
