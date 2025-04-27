import { BaseRepositoryInterface } from "./index";

export interface BaseCRUDRepositoryInterface<K>
    extends BaseRepositoryInterface<K> {
    create(arg: K): Promise<K | null>;
    update(arg: K): Promise<K | null>;
}
