const sendgrid = require('sendgrid')
const helper = sendgrid.mail
let sendGridkey

if (!process.env.sendGridkey) {
  const keys = require('../../secrets')
  sendGridkey = keys.sendGridkey
} else {
  sendGridkey = process.env.sendGridkey
}

class Mailer extends helper.Mail {
  constructor({subject, recipients}, content) {
    super()

    this.sgApi = sendgrid(sendGridkey)
    this.from_email = new helper.Email('no-reply@ezsplit.com')
    this.subject = subject
    this.body = new helper.Content('text/html', content)
    this.recipients = this.formatAddresses(recipients)

    this.addContent(this.body)
    this.addRecipients()
  }

  formatAddresses(recipients) {
    return recipients.map(({email}) => {
      return new helper.Email(email)
    })
  }

  addRecipients() {
    const personalize = new helper.Personalization()
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient)
    })
    this.addPersonalization(personalize)
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    })
    const response = await this.sgApi.API(request)
    return response
  }
}

module.exports = Mailer
