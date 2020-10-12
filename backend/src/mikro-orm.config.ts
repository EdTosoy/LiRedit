import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import path from "path";
import { User } from './entities/User';

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.ts$/,
  },
  entities: [Post, User],
  dbName: "lireddit",
  debug: !__prod__,
  clientUrl: "postgreql://postgre@127.0.0.1:5432",
  user: "postgres",
  password: "samsunga316",
  type: "postgresql",
} as Parameters<typeof MikroORM.init>[0];
