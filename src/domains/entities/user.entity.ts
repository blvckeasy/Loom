import { Types } from "mongoose";
import bcrypt from 'bcrypt';
import { UserSchema } from "../../infrastructure/mongodb";


export class UserEntity {
    public _id:      Types.ObjectId;
    public _email: string;
    public _password: string;
    public _createdAt: Date;

    buildId (id: Types.ObjectId): UserEntity {
        this._id = id;
        return this;
    }

    buildEmail (email: string): UserEntity {
        this._email = email;
        return this;
    }

    buildPassword (password: string): UserEntity {
        this._password = bcrypt.hashSync(password, 8);
        return this;
    }

    buildCreatedAt(createdAt: Date): UserEntity {
        this._createdAt = createdAt;
        return this;
    }

    getId(): Types.ObjectId {
        return this._id;
    }

    getEmail(): string {
        return this._email;
    }

    getPassword(): string {
        return this._password;
    }

    getCreatedAt(): Date {
        return this._createdAt;
    }

    convertToEntity (arg: UserSchema): UserEntity | null {
        return arg ?
            this.buildId(arg._id)
                .buildEmail(arg.email)
                .buildPassword(arg.password)
                .buildCreatedAt(arg.createdAt)
            : null;
    }

    convertToSchema(): UserSchema {
        return {
            _id:        this._id,
            email:   this._email,
            password:   this._password,
            createdAt:  this._createdAt,
        }
    }
}