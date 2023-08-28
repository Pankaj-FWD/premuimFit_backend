const axios = require('axios');
const { successResponse, errorResponse } = require('../middelware/response');
require('dotenv').config();

const headers = {
  'Authorization': `Bearer ${process.env.FACEBOOK_ACCESS_TOKEN}`,
  'Content-Type': 'application/json'
};

async function sendWhatsAppMessage(req, res) {
  try {
    const data = {
      messaging_product: 'whatsapp',
      to: process.env.RECIPIENT_PHONE_NUMBER,
      type: 'template',
      template: {
        name: "Hi Pankaj",
        language: {
          code: "en_US"
        }
      }
    };
    const response = await axios.post(process.env.FB_API_URL, JSON.stringify(data), { headers });
   
    if (response.status === 200) {
    return res.status(200).json(successResponse(response.data, 'Sent successfully!', 200));
    } else {
      throw new Error('Failed to send message');
    }
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
}

module.exports = {
  sendWhatsAppMessage
};
