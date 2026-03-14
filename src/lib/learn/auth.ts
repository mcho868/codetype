export interface LearnUser {
  username: string;
  displayName: string;
  role: "student" | "admin";
}

const USERS: Record<string, { password: string; user: LearnUser }> = {
  yohan: {
    password: "yohan123",
    user: { username: "yohan", displayName: "Yohan", role: "student" },
  },
  sunghyun: {
    password: "sunghyun123",
    user: { username: "sunghyun", displayName: "Sunghyun", role: "student" },
  },
  admin: {
    password: "qwer1234",
    user: { username: "admin", displayName: "Admin", role: "admin" },
  },
};

export function findUserByUsername(username: string): LearnUser | null {
  const entry = USERS[username.toLowerCase()];
  return entry?.user ?? null;
}

export function validateCredentials(
  username: string,
  password: string
): LearnUser | null {
  const entry = USERS[username.toLowerCase()];
  if (!entry) return null;
  if (entry.password !== password) return null;
  return entry.user;
}
