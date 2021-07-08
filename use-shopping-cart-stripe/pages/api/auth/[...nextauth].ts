// Next Auth
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const NextAuthOptions = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // Providers.Facebook({
    //   clientId: process.env.FACEBOOK_CLIENT,
    //   clientSecret: process.env.FACEBOOK_SECRET,
    // }),
    // Providers.Twitter({
    //   clientId: process.env.TWITTER_CLIENT,
    //   clientSecret: process.env.TWITTER_SECRET,
    // }),
    // Providers.Email({
    //   server: {
    //     host: '',
    //     port: 0,
    //     auth: {
    //       user: '',
    //       pass: '',
    //     },
    //   },
    //   from: '',
    // }),
  ],
  database: process.env.DATABASE_URL,
};

export default (req, res) => NextAuth(req, res, NextAuthOptions);
