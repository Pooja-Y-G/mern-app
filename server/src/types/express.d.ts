import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface UserPayload extends JwtPayload {
      id: string;
      role: string;
    }

    interface Request {
      user?: UserPayload;
    }
  }
}

export {};
//interface Request {body: any;params: any;query: any;}Express defines Request like this, so added user to it globally and added in tsconfig compiler options