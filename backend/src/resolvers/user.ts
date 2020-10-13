import { User } from "../entities/User";
import {
  Arg,
  Ctx,
  Resolver,
  Mutation,
  Field,
  InputType,
  ObjectType,
} from "type-graphql";
import { MyContext } from "src/types";
import argon2 from "argon2";

@InputType()
export class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
class FeildError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FeildError], { nullable: true })
  errors?: FeildError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    if (options.username.length <= 2) {
      return {
        errors: [
          {
            field: "username",
            message: "length must be greate than 2",
          },
        ],
      };
    }
    if (options.password.length <= 3) {
      return {
        errors: [
          {
            field: "password",
            message: "length must be greate than 3",
          },
        ],
      };
    }
    const hashedPassword = await argon2.hash(options.password);
    const user = await em.create(User, {
      username: options.username,
      password: hashedPassword,
    });

    try {
      await em.persistAndFlush(user);
    } catch (error) {
      console.log("message:", error.message);
      s;
    }

    return {
      user,
    };
  }
  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { username: options.username });
    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "that usernama doesn't exist",
          },
        ],
      };
    }
    const isValid = await argon2.verify(user.password, options.password);
    if (!isValid) {
      return {
        errors: [
          {
            field: "username",
            message: "Incorrect Password",
          },
        ],
      };
    }

    return {
      user,
    };
  }
}
