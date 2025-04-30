import { Types } from "mongoose";
import { ProxySchema } from "../../infrastructure/mongodb";
import { ProxyStatusEnum } from "../../infrastructure";


export class ProxyEntity {
    public _id:                 Types.ObjectId;
    public _server_protocol:    string;
    public _server_subdomain:   string;
    public _server_domain:        string;
    public _user_ip:            string;
    public _user_port:          number;
    public _status:             ProxyStatusEnum;
    public _user_id:            Types.ObjectId;
    public _createdAt:          Date;

    buildId (id: Types.ObjectId): ProxyEntity {
        this._id = id;
        return this;
    }

    buildServerProtocol (protocol: string): ProxyEntity {
        this._server_protocol = protocol;
        return this;
    }

    buildServerSubdomain (subdomain: string): ProxyEntity {
        this._server_subdomain = subdomain;
        return this;
    }
    
    buildServerDomain (domain: string): ProxyEntity {
        this._server_domain = domain;
        return this;
    }

    buildUserIP (ip: string): ProxyEntity {
        this._user_ip = ip;
        return this;
    }

    buildUserPort (port: number): ProxyEntity {
        this._user_port = port;
        return this;
    }

    buildStatus (status: ProxyStatusEnum): ProxyEntity {
        this._status = status;
        return this;
    }

    buildUserId (user_id: Types.ObjectId): ProxyEntity {
        this._user_id = user_id;
        return this;
    }

    buildCreatedAt(createdAt: Date): ProxyEntity {
        this._createdAt = createdAt;
        return this;
    }

    getId(): Types.ObjectId {
        return this._id;
    }

    getServerProtocol(): string {
        return this._server_protocol;
    }

    getServerSubdomain(): string {
        return this._server_subdomain;
    }

    getServerHost(): string {
        return this._server_domain;
    }

    getUserIP(): string {
        return this._user_ip;
    }

    getUserPort(): number {
        return this._user_port;
    }

    getProxyURL(): string {
        return `${this._server_protocol}://${this._server_subdomain}.${this._server_domain}`
    }

    getStatus(): ProxyStatusEnum {
        return this._status;
    }

    getUserId(): Types.ObjectId {
        return this._user_id;
    }

    getCreatedAt(): Date {
        return this._createdAt;
    }

    convertToEntity (arg: ProxySchema): ProxyEntity | null {
        return arg ?
            this.buildId(arg._id)
                .buildServerProtocol(arg.server_protocol)
                .buildServerSubdomain(arg.server_subdomain)
                .buildServerDomain(arg.server_domain)
                .buildUserIP(arg.user_ip)
                .buildUserPort(arg.user_port)
                .buildStatus(arg.status)
                .buildUserId(arg.user_id)
                .buildCreatedAt(arg.createdAt)
            : null;
    }

    convertToSchema(): ProxySchema {
        return {
            _id:                this._id,
            server_protocol:    this._server_protocol,
            server_subdomain:   this._server_subdomain,
            server_domain:      this._server_domain,
            user_ip:            this._user_ip,
            user_port:          this._user_port,
            status:             this._status,
            user_id:            this._user_id,
            createdAt:          this._createdAt,
        }
    }
}