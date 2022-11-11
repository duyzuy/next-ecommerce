import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { create } from 'yup/lib/Reference';
import {
  getCustomerInfor,
  getCustomerByEmail,
  createCustomer
} from '../../../api/customer';

export const authOptions = {
  session: {
    strategy: 'jwt',

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 1 * 24 * 60 * 60, // 30 days

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
          `https://saigonhomekitchen.vn/wp-json/v1/user/login`,
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
            console.log(error);
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
      console.log('signinnnn', { user, account, profile, email, credentials });
      return true;
    },
    async jwt({ token, user, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      token.role = 'customer';
      console.log({ token, user, account });
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;

      //get information usser
      // const customer = await getCustomerByEmail(session.user.email);

      // console.log(customer);
      // if (customer.length === 0) {
      //   const data = await createCustomer({
      //     email: session.user.email,
      //     first_name: session.user.name,
      //     last_name: '',
      //     username: session.user.email,
      //     password: '123123123123'
      //   });

      //   console.log(data);
      // }
      console.log({ session, token, user });
      return session;
    }
  },
  pages: {
    signIn: '/user/login'
  }
};

export default NextAuth(authOptions);
