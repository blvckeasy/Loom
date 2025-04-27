import { Types } from "mongoose";
import bcrypt from "bcrypt";
import { UserSchema } from "../../infrastructure/mongodb";
import { UserRoleEnum, UserStatusEnum } from "../../infrastructure";

export class UserEntity {
    public _id:         Types.ObjectId;
    public _email:      string;
    public _password:   string;
    public _status:     UserStatusEnum;
    public _role:       UserRoleEnum;
    public _createdAt:  Date;

    buildId(id: Types.ObjectId): UserEntity {
        this._id = id;
        return this;
    }

    buildEmail(email: string): UserEntity {
        this._email = email;
        return this;
    }

    buildPassword(password: string): UserEntity {
        this._password = bcrypt.hashSync(password, 8);
        return this;
    }

    buildStatus(status: UserStatusEnum): UserEntity {
        this._status = status;
        return this;
    }

    buildRole(role: UserRoleEnum): UserEntity {
        this._role = role;
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

    getStatus(): UserStatusEnum {
        return this._status;
    }

    getRole(): UserRoleEnum {
        return this._role;
    }

    getCreatedAt(): Date {
        return this._createdAt;
    }

    convertToEntity(arg: UserSchema | null): UserEntity | null {
        return arg
            ? this.buildId(arg._id)
                  .buildEmail(arg.email)
                  .buildPassword(arg.password)
                  .buildStatus(arg.status)
                  .buildRole(arg.role)
                  .buildCreatedAt(arg.createdAt)
            : null;
    }

    convertToSchema(): UserSchema {
        return {
            _id:        this._id,
            email:      this._email,
            password:   this._password,
            status:     this._status,
            role:       this._role,
            createdAt:  this._createdAt,
        };
    }
}
