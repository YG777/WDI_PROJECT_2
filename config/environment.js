module.exports = {
  port: process.env.PORT || 3000,
  dbURL: process.env.MONGODB_URI || 'mongodb://localhost:27017/wdi-project-2',
  secret: process.env.SESSION_SECRET || 'shh it\'s a secret' 
};
