import moment from 'moment-timezone';
import { UserRoleName } from '@/modules/users';
import { IUserSession } from '@/modules/profile';

interface IAccessToken {
  nbf: number;
  exp: number;
}

export class AccessToken {
  public readonly creationDate: Date;
  public readonly expirationDate: Date;
  public readonly original: string;

  constructor(decoded: IAccessToken, original: string) {
    this.creationDate = moment(decoded.nbf * 1000).toDate();
    this.expirationDate = moment(decoded.exp * 1000).toDate();
    this.original = original;
  }
}

const urlBase64Decode = (str: string) => {
  let output = str.replace(/-/g, '+').replace(/_/g, '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      // tslint:disable-next-line:no-string-throw
      throw 'Illegal base64url string!';
  }
  return decodeURIComponent(escape(atob(output)));
};

export const decodeJWT = (token: string = ''): AccessToken | null => {
  let parts: string[] = [];

  if (
    token === null ||
    token === '' ||
    (parts = token.split('.')).length !== 3
  ) {
    return null;
  }

  const decoded = urlBase64Decode(parts[1]);
  if (decoded) {
    return new AccessToken(JSON.parse(decoded) as IAccessToken, token);
  } else {
    return null;
  }
};

export const extractUserSessionId = (refreshToken: string): string => {
  const decoded = urlBase64Decode(refreshToken);

  const token = JSON.parse(decoded) as {
    RefreshTokenId: string,
    UserId: string,
    Token: string,
    UserAgent: string
  };

  return token.RefreshTokenId;
};
