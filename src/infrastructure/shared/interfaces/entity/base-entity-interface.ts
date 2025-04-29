export interface BaseEntityInterface<T, K> {
    convertToEntity(arg: K): T | null;
    convertToSchema(): K;
}