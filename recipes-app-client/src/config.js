export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-east-1",
    BUCKET: "recipes-app-code"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://94724qy9hl.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_35CrwDXzA",
    APP_CLIENT_ID: "7vkus71sh3qkckfoctcnkmoccs",
    IDENTITY_POOL_ID: "us-east-1:265a99e9-7c01-45ce-9da5-4aac3eaf7110"
  }
};
