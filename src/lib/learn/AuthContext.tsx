"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { LearnUser, findUserByUsername, validateCredentials } from "./auth";
import { getStudentByUsername } from "./db";

const SESSION_KEY = "codelearn-username";

interface PersistedSession {
  user: LearnUser;
  studentId: string | null;
}

interface AuthContextType {
  user: LearnUser | null;
  studentId: string | null; // Supabase students.id UUID
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function LearnAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<LearnUser | null>(null);
  const [studentId, setStudentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // true while restoring session

  function saveSession(nextUser: LearnUser, nextStudentId: string | null) {
    const session: PersistedSession = { user: nextUser, studentId: nextStudentId };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  function parseStoredSession(value: string): PersistedSession | null {
    try {
      const parsed = JSON.parse(value) as Partial<PersistedSession>;
      if (!parsed.user?.username) return null;

      const knownUser = findUserByUsername(parsed.user.username);
      if (!knownUser) return null;

      return {
        user: knownUser,
        studentId: typeof parsed.studentId === "string" ? parsed.studentId : null,
      };
    } catch {
      const knownUser = findUserByUsername(value);
      if (!knownUser) return null;

      return {
        user: knownUser,
        studentId: null,
      };
    }
  }

  // Restore session from localStorage on mount
  useEffect(() => {
    async function initSession() {
      const saved = localStorage.getItem(SESSION_KEY);
      if (!saved) {
        setLoading(false);
        return;
      }

      const session = parseStoredSession(saved);
      if (!session) {
        localStorage.removeItem(SESSION_KEY);
        setLoading(false);
        return;
      }

      setUser(session.user);
      setStudentId(session.studentId);

      const row = await getStudentByUsername(session.user.username);
      const nextStudentId = row?.id ?? session.studentId;
      setStudentId(nextStudentId);
      saveSession(session.user, nextStudentId);
      setLoading(false);
    }

    initSession();
  }, []);

  async function login(username: string, password: string): Promise<boolean> {
    const validated = validateCredentials(username, password);
    if (!validated) return false;

    // Fetch the DB row to get the UUID
    const row = await getStudentByUsername(username);
    if (!row) return false; // username not in DB — schema not applied yet

    setUser(validated);
    setStudentId(row.id);
    saveSession(validated, row.id);
    return true;
  }

  function logout() {
    setUser(null);
    setStudentId(null);
    localStorage.removeItem(SESSION_KEY);
  }

  return (
    <AuthContext.Provider value={{ user, studentId, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useLearnAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx)
    throw new Error("useLearnAuth must be used inside LearnAuthProvider");
  return ctx;
}
