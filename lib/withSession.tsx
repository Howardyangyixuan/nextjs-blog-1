// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import {NextApiRequest, NextApiResponse, NextPageContext} from 'next';
import {Session, withIronSession} from 'next-iron-session';

// optionally add stronger typing for next-specific implementation
export type NextIronRequest = NextApiRequest & { session: Session };
export type NextIronPageContext = NextPageContext & { req: NextIronRequest };
export type NextIronContextHandler = (
  context: NextIronPageContext
) => Promise<any>;
export type NextIronHandler = (
  req: NextIronRequest,
  res: NextApiResponse,
) => void | Promise<void>;

const withSession = (handler: NextIronHandler | NextIronContextHandler) =>
  withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: 'blog',
    cookieOptions: {
      secure:false
    },
  });

export default withSession;