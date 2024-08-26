const { Module } = require('@nestjs/common');
const { MongooseModule } = require('@nestjs/mongoose');
const { LibraryController } = require('./library.controller');
const { LibraryService } = require('./library.service');
const { AuthorSchema } = require('./schemas/author.schema');
const { BookSchema } = require('./schemas/book.schema');
const { UserSchema } = require('./schemas/user.schema');
const { AuditLogSchema } = require('./schemas/auditlog.schema');

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Author', schema: AuthorSchema },
      { name: 'Book', schema: BookSchema },
      { name: 'User', schema: UserSchema },
      { name: 'AuditLog', schema: AuditLogSchema },
    ]),
  ],
  controllers: [LibraryController],
  providers: [LibraryService],
})
class LibraryModule {}

module.exports = { LibraryModule };
