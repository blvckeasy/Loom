import { Types } from "mongoose";
import { ProxyEntity } from "../../../../domains";

export class GetProxyListResponse {
    
    _id:                    Types.ObjectId;

    server_protocol:        string;

    server_subdomain:       string;
    
    server_host:            string;

    user_port:              number;
    
    user_ip:                string;

    proxy_URL:              string;

    user_id:                Types.ObjectId;

    createdAt:              Date;

    constructor (proxy: ProxyEntity) {
        this._id                = proxy.getId();
        this.server_protocol    = proxy.getServerProtocol();
        this.server_subdomain   = proxy.getServerSubdomain();
        this.server_host        = proxy.getServerHost();
        this.user_ip            = proxy.getUserIP();
        this.user_port          = proxy.getUserPort();
        this.proxy_URL          = proxy.getProxyURL();
        this.user_id            = proxy.getUserId();
        this.createdAt          = proxy.getCreatedAt();
    }
}