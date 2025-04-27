import { ProxyRepositoryInterface, UserRepositoryInterface } from '../../infrastructure';
import { ProxyRepository } from './proxy';
import { UserRepository } from './user';

class RepositoryClass {
    protected _userRepository: UserRepository;
    protected _proxyRepository: ProxyRepository;

    User (): UserRepositoryInterface {
        if (!this._userRepository) this._userRepository = new UserRepository();
        return this._userRepository;
    }

    Proxy(): ProxyRepositoryInterface {
        if (!this._proxyRepository) this._proxyRepository = new ProxyRepository();
        return this._proxyRepository;
    }
}

export * from './user';
export * from './proxy';

export const Repository = new RepositoryClass();