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
  min: {
    password: "min123",
    user: { username: "min", displayName: "Min", role: "student" },
  },
  preview: {
    password: "preview123",
    user: { username: "preview", displayName: "Preview", role: "student" },
  },
  youngsang: {
    password: "youngsang123",
    user: { username: "youngsang", displayName: "Youngsang", role: "student" },
  },
  yejun: {
    password: "yejun123",
    user: { username: "yejun", displayName: "Yejun", role: "student" },
  },
  jaeseung: {
    password: "jaeseung123",
    user: { username: "jaeseung", displayName: "Jaeseung", role: "student" },
  },
  heein: {
    password: "heein123",
    user: { username: "heein", displayName: "Heein", role: "student" },
  },
  seewan: {
    password: "seewan123",
    user: { username: "seewan", displayName: "Seewan", role: "student" },
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
