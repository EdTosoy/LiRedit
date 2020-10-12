"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const Post_1 = require("./entities/Post");
const path_1 = __importDefault(require("path"));
const User_1 = require("./entities/User");
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.ts$/,
    },
    entities: [Post_1.Post, User_1.User],
    dbName: "lireddit",
    debug: !constants_1.__prod__,
    clientUrl: "postgreql://postgre@127.0.0.1:5432",
    user: "postgres",
    password: "samsunga316",
    type: "postgresql",
};
//# sourceMappingURL=mikro-orm.config.js.map