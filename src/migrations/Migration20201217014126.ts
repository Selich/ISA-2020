import { Migration } from '@mikro-orm/migrations';

export class Migration20201217014126 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "email" varchar(255) not null, "password" varchar(255) not null, "role" jsonb null, "first_name" varchar(255) null, "last_name" varchar(255) null, "gender" varchar(255) null, "date_of_birth" timestamptz(0) null, "address" jsonb null, "telephone" int4 null, "is_enabled" bool not null default false, "average_rating" int4 null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
  }

}
