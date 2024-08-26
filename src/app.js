const { Module } = require('@nestjs/common');
const { MongooseModule } = require('@nestjs/mongoose');
const { LibraryModule } = require('./library/module');

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost/library'), // Connect to MongoDB
    LibraryModule, // Import the library module
  ],
})
class AppModule {}

module.exports = { AppModule };
