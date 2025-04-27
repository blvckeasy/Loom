import { JwtPayload, sign, verify } from "jsonwebtoken";
import moment from "moment";

export class Token {
    protected _secret: string;
    protected _expiresIn: number;
    protected _payload: string | JwtPayload;
    protected _token: string;

    constructor(secret: string, expiresIn: number, payload: object = {}) {
        this._secret    = secret;
        this._expiresIn = expiresIn;
        this._payload   = payload;
    }

    buildSecret(value: string): Token {
        this._secret = value;
        return this;
    }

    buildExpiresIn(value: number): Token {
        this._expiresIn = value;
        return this;
    }

    buildPayload(value: string | JwtPayload): Token {
        this._payload = {
            ...(typeof value === 'string' ? { payload: value } : value),
            generatedAt: moment().toDate().getMilliseconds(),
        };
        return this;
    }

    buildToken(value: string): Token {
        this._token = value;
        return this;
    }

    getSecret(): string {
        return this._secret;
    }

    getExpiresIn(): number {
        return this._expiresIn;
    }

    getPayload(): string | JwtPayload {
        return this._payload;
    }

    getToken(): string {
        return this._token;
    }

    sign (): string {
        this._token = sign(this.getPayload(), this.getSecret(), { expiresIn: this.getExpiresIn() });
        return this.getToken();
    }

    verify (): string | JwtPayload {
        this._payload = verify(this.getToken(), this.getSecret());
        return this.getPayload();
    }
}
