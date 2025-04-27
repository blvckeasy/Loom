import { FilterQuery, Types } from "mongoose";
import {
    ProxySchema,
    ProxyRepositoryInterface,
    ProxyModel,
    PaginationInterface,
} from "../../../infrastructure";
import { ProxyEntity } from "../../entities";
import { BaseCRUDRepository } from "../base";


export class ProxyRepository
    extends BaseCRUDRepository<ProxyEntity, ProxySchema>
    implements ProxyRepositoryInterface
{
    async create(_proxy: ProxyEntity): Promise<ProxyEntity | null> {
        const requiredFields: string[] = ["_server_protocol", "_server_subdomain", "_server_host", "_user_ip", "_user_port", "_user_id"];
        this.checkRequiredFields(requiredFields, _proxy);

        const proxyToCreate: ProxySchema = _proxy.convertToSchema();
        const created = await ProxyModel.create(proxyToCreate);

        return new ProxyEntity().convertToEntity(created);
    }

    async update(_proxy: ProxyEntity): Promise<ProxyEntity | null> {
        const requiredFields: string[] = ["_id"];
        this.checkRequiredFields(requiredFields, _proxy);

        const proxyToUpdate: ProxySchema = _proxy.convertToSchema();
        const updated = await ProxyModel.findOneAndUpdate(
            { _id: _proxy.getId() },
            { $set: proxyToUpdate },
            { new: true }
        );

        return new ProxyEntity().convertToEntity(updated);
    }

    async getById(_id: Types.ObjectId): Promise<ProxyEntity | null> {
        const found = await ProxyModel.findOne({ _id });
        return new ProxyEntity().convertToEntity(found);
    }

    async list(
        filter: FilterQuery<any> = {},
        pagination?: PaginationInterface,
        sort?: any
    ): Promise<Array<ProxyEntity>> {
        const users = await ProxyModel.find(filter)
            .limit(pagination?.size)
            .skip((pagination?.page - 1) * pagination?.size)
            .sort(sort);

        return this.multipleConverter(users, ProxyEntity);
    }

    async countDocumentsByFilter(filter: FilterQuery<any>): Promise<number> {
        return ProxyModel.countDocuments(filter);
    }
}
