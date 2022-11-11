import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { getCustomerInfor } from '../../../api/customer';

export const authOptions = {
  session: {
    strategy: 'jwt',

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours

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
            console.log(res);
            return res.json();
          })
          .then((data) => {
            console.log(data);
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
    // async signIn({ user, account, profile, email, credentials }) {
    //   console.log('signinnnn', { user, account, profile, email, credentials });
    //   return true;
    // },
    // async session({ session, token, user }) {
    //   // Send properties to the client, like an access_token from a provider.
    //   session.accessToken = token.accessToken;
    //   console.log('session', { session, token, user });
    //   return session;
    // },
    // async jwt({ token, account }) {
    //   // Persist the OAuth access_token to the token right after signin
    //   if (account) {
    //     token.accessToken = account.access_token;
    //   }
    //   console.log('jwt', { token, account });
    //   return token;
    // }
  },
  pages: {
    signIn: '/user/login',
    // signOut: '/user/logout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/user/new-customer' // New users will be directed here on first sign in (leave the property out if not of interest)
  }
};

export default NextAuth(authOptions);
