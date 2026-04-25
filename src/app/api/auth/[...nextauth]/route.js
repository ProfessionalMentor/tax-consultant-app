import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Strict configuration for the Virtual Law Chamber JWT session strategy
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Chamber Secure Login",
      credentials: {
        email: { label: "Email", type: "email" },
        code: { label: "2FA Code", type: "text" }, // Multi-factor step implementation
      },
      async authorize(credentials) {
        // Here we would wire up to the Mongoose User Collection matching Zod schema
        // For demonstration, we simulate an authorized client access
        if (credentials?.email && credentials.code === "123456") {
          return { id: "client_1", name: "Corporate Client", email: credentials.email, role: "USER" };
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours strict timeout for legal compliance
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
