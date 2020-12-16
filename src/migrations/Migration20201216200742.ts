import { Migration } from '@mikro-orm/migrations';

export class Migration20201216200742 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "email" varchar(255) not null, "password" varchar(255) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "gender" varchar(255) not null, "date_of_birth" timestamptz(0) not null, "is_enabled" bool not null default false, "average_rating" int4 not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
  }

}
