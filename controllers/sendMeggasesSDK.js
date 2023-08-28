const WhatsApp = require('whatsapp');
require('dotenv').config();

const send_message = async () => {

  // Your sender phone number
  const senderNumber = '8174979703';
  
  // Recipient phone number
  const recipientNumber = '7985169256';
  
  // Initialize the WhatsApp instance
  const wa = new WhatsApp(senderNumber);
  
  // Define the message content
  const messageBody = 'Hello, this is a test message!';
  
  // Function to send the message
    try {
      const sent_text_message = await wa.messages.text({ body: messageBody }, recipientNumber);
  
      sent_text_message.then((res) => {
        console.log(res.rawResponse());
      });
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  };
  
  module.exports = send_message;
  