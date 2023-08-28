// Function to generate a success response
const successResponse = (data, message = 'Success', statusCode = 200) => {
    return {
      success: true,
      message,
      data,
      statusCode
    };
  };
  
  // Function to generate an error response
  const errorResponse = (message = 'Error', statusCode = 500) => {
    return {
      success: false,
      message,
      statusCode
    };
  };
  
  module.exports = {
    successResponse,
    errorResponse
  };
  