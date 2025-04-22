import { Types } from "mongoose";
import { ProxySchema } from "../../infrastructure/mongodb";


export class ProxyEntity {
    public _id:         Types.ObjectId;
    public _protocol:   string;
    public _host:       string;
    public _port:       number;
    public _user_id:    Types.ObjectId;
    public _createdAt:  Date;

    buildId (id: Types.ObjectId): ProxyEntity {
        this._id = id;
        return this;
    }

    buildProtocol (protocol: string): ProxyEntity {
        this._protocol = protocol;
        return this;
    }
    
    buildHost (host: string): ProxyEntity {
        this._host = host;
        return this;
    }

    buildPort (port: number): ProxyEntity {
        this._port = port;
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

    getProtocol(): string {
        return this._protocol;
    }

    getHost(): string {
        return this._host;
    }

    getPort(): number {
        return this._port;
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
                .buildProtocol(arg.protocol)
                .buildHost(arg.host)
                .buildPort(arg.port)
                .buildUserId(arg.user_id)
                .buildCreatedAt(arg.createdAt)
            : null;
    }

    convertToSchema(): ProxySchema {
        return {
            _id:        this._id,
            protocol:   this._protocol,
            host:       this._host,
            port:       this._port,
            user_id:    this._user_id,
            createdAt:  this._createdAt,
        }
    }
}