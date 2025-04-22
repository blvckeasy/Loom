export interface BaseEntityInterface<T, K> {
    convertToEntity(arg: K): T;
    convertToSchema(): K;
}