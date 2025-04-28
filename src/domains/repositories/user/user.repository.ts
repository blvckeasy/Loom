import { FilterQuery, Types } from "mongoose";
import {
    UserSchema,
    UserRepositoryInterface,
    UserModel,
    PaginationInterface,
} from "../../../infrastructure";
import { UserEntity } from "../../entities";
import { BaseCRUDRepository } from "../base";


export class UserRepository
    extends BaseCRUDRepository<UserEntity, UserSchema>
    implements UserRepositoryInterface
{
    async create(_user: UserEntity): Promise<UserEntity | null> {
        const requiredFields: string[] = ["_email"];
        this.checkRequiredFields(requiredFields, _user);

        const userToCreate: UserSchema = _user.convertToSchema();
        const created = await UserModel.create(userToCreate);

        return new UserEntity().convertToEntity(created);
    }

    async update(_user: UserEntity): Promise<UserEntity | null> {
        const requiredFields: string[] = ["_id", "_email"];
        this.checkRequiredFields(requiredFields, _user);

        const userToUpdate: UserSchema = _user.convertToSchema();
        const updated = await UserModel.findOneAndUpdate(
            { _id: _user.getId() },
            { $set: userToUpdate },
            { new: true }
        );

        return new UserEntity().convertToEntity(updated);
    }

    async getById(_id: Types.ObjectId): Promise<UserEntity | null> {
        const found = await UserModel.findOne({ _id });
        return new UserEntity().convertToEntity(found);
    }

    async list(
        pagination?: PaginationInterface,
        filter: FilterQuery<any> = {},
        sort?: any
    ): Promise<Array<UserEntity>> {
        const users = await UserModel.find(filter)
            .limit(pagination?.size)
            .skip((pagination?.page - 1) * pagination?.size)
            .sort(sort);

        return this.multipleConverter(users, UserEntity);
    }

    async countDocumentsByFilter(filter: FilterQuery<any>): Promise<number> {
        return UserModel.countDocuments(filter);
    }
}
