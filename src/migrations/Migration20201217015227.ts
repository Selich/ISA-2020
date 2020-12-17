import { Migration } from '@mikro-orm/migrations';

export class Migration20201217015227 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" drop constraint if exists "user_role_check";');
    this.addSql('alter table "user" alter column "role" type varchar(255) using ("role"::varchar(255));');
    this.addSql('alter table "user" drop constraint if exists "user_telephone_check";');
    this.addSql('alter table "user" alter column "telephone" type varchar(255) using ("telephone"::varchar(255));');
  }

}
