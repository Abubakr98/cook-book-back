const pass = 'mongodb+srv://testmongo:testmongo@cluster0-f98nr.gcp.mongodb.net/cookbook?retryWrites=true';
module.exports = {
  appPort: process.env.PORT || 3000,
  mongoUri: pass,
};
