import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export interface User {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
}

export async function getUserByEmail(
  email: string,
): Promise<User | null> {
  const rows = await sql`
    SELECT
      id,
      name,
      email,
      password_hash AS "passwordHash"
    FROM users
    WHERE email = ${email}
    LIMIT 1
  `;

  console.log("User found:", rows.length > 0);
  console.log("User data:", rows[0]);
  
  return (rows[0] as User) ?? null;
}