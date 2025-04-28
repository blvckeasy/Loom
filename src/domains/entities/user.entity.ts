import { Types } from "mongoose";
import bcrypt from "bcrypt";
import { UserSchema } from "../../infrastructure/mongodb";
import { UserAccountVerificationStatusEnum, UserRoleEnum, UserProfileStatusEnum } from "../../infrastructure";

export class UserEntity {
    public _id:                     Types.ObjectId;
    public _email:                  string;
    public _name:                   string;
    public _given_name:             string;
    public _family_name:            string;
    public _picture:                string;
    public _password:               string;
    public _verification_status:    UserAccountVerificationStatusEnum;
    public _profile_status:         UserProfileStatusEnum;
    public _role:                   UserRoleEnum;
    public _createdAt:              Date;

    buildId(id: Types.ObjectId): UserEntity {
        this._id = id;
        return this;
    }

    buildEmail(email: string): UserEntity {
        this._email = email;
        return this;
    }

    buildName(name: string): UserEntity {
        this._name = name;
        return this;
    }

    buildGivenName(given_name: string): UserEntity {
        this._given_name = given_name;
        return this;
    }

    buildFamilyName(family_name: string): UserEntity {
        this._family_name = family_name;
        return this;
    }

    buildPicture (picture: string): UserEntity {
        this._picture = picture;
        return this;
    }

    buildPassword(password: string): UserEntity {
        if (password) {
            this._password = bcrypt.hashSync(password, 8);
        }
        return this;
    }

    buildVerificationStatus(verification_status: UserAccountVerificationStatusEnum): UserEntity {
        this._verification_status = verification_status;
        return this;
    }

    buildProfileStatus(profile_status: UserProfileStatusEnum): UserEntity {
        this._profile_status = profile_status;
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

    getName(): string {
        return this._name;
    }

    getGivenName(): string {
        return this._given_name;
    }

    getFamilyName(): string {
        return this._family_name;
    }

    getPicture(): string {
        return this._picture;
    }

    getPassword(): string {
        return this._password;
    }

    getVerificationStatus(): UserAccountVerificationStatusEnum {
        return this._verification_status;
    }

    getProfileStatus(): UserProfileStatusEnum {
        return this._profile_status;
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
                  .buildName(arg.name)
                  .buildGivenName(arg.given_name)
                  .buildFamilyName(arg.family_name)
                  .buildPicture(arg.picture)
                  .buildPassword(arg.password)
                  .buildVerificationStatus(arg.verification_status)
                  .buildProfileStatus(arg.profile_status)
                  .buildRole(arg.role)
                  .buildCreatedAt(arg.createdAt)
            : null;
    }

    convertToSchema(): UserSchema {
        return {
            _id:                    this._id,
            email:                  this._email,
            name:                   this._name,
            given_name:             this._given_name,
            family_name:            this._family_name,
            picture:                this._picture,
            password:               this._password,
            verification_status:    this._verification_status,
            profile_status:         this._profile_status,
            role:                   this._role,
            createdAt:              this._createdAt,
        };
    }
}
