import NextAuth from 'next-auth/next';

import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { getCustomerByEmail, getCustomerInfor } from '../../../api/customer';
import { USER_ROLES } from '../../../constants/roles';
import { randomUUID, randomBytes } from 'crypto';
import { NextAuthOptions } from 'next-auth';
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
    // maxAge: 1 * 60, // 30 days

    updateAge: 1 * 60 * 60, // 24 hours

    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString('hex');
    }
  },
  secret: process.env.SESSION_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...').
      name: 'SaigonHome',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        const user = await fetch(
          `https://saigonhomekitchen.vn/wp-json/dv/v1/user/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password
            })
          }
        )
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            return data;
          })
          .catch((error) => {
            return error;
          });

        if (user.data) {
          return {
            id: user.data.ID,
            name: user.data.user_nicename,
            email: user.data.user_email,
            displayName: user.data.display_name
          };
        } else {
          throw new Error('Password or email is in-correct');
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      //handle user permission logedin or not

      const { provider } = account;

      let customer;
      if (provider === 'credentials') {
        customer = await getCustomerInfor(user.id);
      }

      if (provider === 'google') {
        customer = await getCustomerByEmail(user.email);
      }
      if (
        customer.role === USER_ROLES.administrator ||
        customer.role === USER_ROLES.customer
      ) {
        return true;
      }

      return false;
    },
    async redirect({ url, baseUrl }) {
      return url;
    },
    async jwt({ token, user, account }) {
      // Persist the OAuth access_token to the token right after signin

      if (account && account.provider === 'google') {
        token.accessToken = account.access_token;
      }

      if (user) {
        const profile = await getCustomerByEmail(user.email);
        token.role = profile.role;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      // session.accessToken = token.accessToken;

      // session.user.role = token.role;
      // session.error = token.error;
      let newSession = {
        ...session,
        user: {
          ...session.user,
          role: token.role
        },
        error: token.error,
        accessToken: token.accessToken
      };
      return newSession;
    }
  },
  pages: {
    signIn: '/user/login',
    error: '/user/error'
  }
};

export default NextAuth(authOptions);
