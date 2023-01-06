declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET_REFRESH: string;
      SECRET_JID: string;
      SECRET_JWT: string;
      EXPIRES_IN_TOKEN: string;
      EXPIRES_IN_TOKEN_REFRESH: string;
      DB_USERNAME: string;
      DB_MDP: string;
      PROD: boolean;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
