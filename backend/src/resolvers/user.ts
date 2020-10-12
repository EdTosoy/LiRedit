import { Property } from "@mikro-orm/core";
import { MyContext } from "src/types";
import { Mutation, Query, Resolver, Arg, Field, Ctx } from "type-graphql";
import { User } from "../entities/User";
import argon from "argon2";

class UsernamePasswordInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => String)
  async resgister(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ) {
    const user = await em.create(User, { username: options.username });

    return user;
  }
}
