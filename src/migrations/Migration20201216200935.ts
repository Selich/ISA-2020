import { Migration } from '@mikro-orm/migrations';

export class Migration20201216200935 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" drop constraint if exists "user_date_of_birth_check";');
    this.addSql('alter table "user" alter column "date_of_birth" type timestamptz(0) using ("date_of_birth"::timestamptz(0));');
    this.addSql('alter table "user" alter column "date_of_birth" drop not null;');
    this.addSql('alter table "user" drop constraint if exists "user_average_rating_check";');
    this.addSql('alter table "user" alter column "average_rating" type int4 using ("average_rating"::int4);');
    this.addSql('alter table "user" alter column "average_rating" drop not null;');
  }

}
