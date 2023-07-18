import { createCookieSessionStorage } from "@remix-run/node";
import { Authenticator } from "remix-auth";
import type { Auth0Profile } from "remix-auth-auth0";
import { Auth0Strategy } from "remix-auth-auth0";
import type { Auth0UserInformation } from "~/@types/auth0-user.interface";

import {
  AUTH0_CALLBACK_URL,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_DOMAIN,
  SECRETS,
} from "~/constants/index.server";
import { createUser, findUserByAuth0Id } from "./users.server";



const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_remix_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [SECRETS],
    secure: process.env.NODE_ENV === "production",
  },
});

export const auth = new Authenticator<Auth0Profile>(sessionStorage);


const auth0Strategy = new Auth0Strategy(
  {
    callbackURL: AUTH0_CALLBACK_URL,
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    clientSecret: AUTH0_CLIENT_SECRET,
  },
  async ({ profile }) => {
    const doesUserExist = await findUserByAuth0Id(profile._json?.sub as unknown as string);
    console.log(profile._json?.sub, "isn")
    if (!doesUserExist) {
      console.log("doesUserExist", doesUserExist)
      const user = Object.assign({}, {
        auth0Id: profile._json?.sub,
        email: profile._json?.email,
        name: profile._json?.name,
        picture: profile._json?.picture,
      });

      console.log("user", user)
      await createUser(user as unknown as Auth0UserInformation)
    }
    return profile;
  },
);

auth.use(auth0Strategy);

export const { getSession, commitSession, destroySession } = sessionStorage;