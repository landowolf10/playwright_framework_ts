type User = {
  username: string
  password: string
}

type UserType = "standard" | "locked" | "problem";

export const users: Record<UserType, User> = {
  standard: { username: "standard_user", password: "secret_sauce" },
  locked: { username: "locked_out_user", password: "secret_sauce" },
  problem: { username: "problem_user", password: "secret_sauce" },
};