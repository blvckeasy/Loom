export interface ListMetadata {
    count?: number;
    pages?: number;
    currentPage?: number;
    hasNext?: boolean;
}

export interface ListInterface<T> {
    items: Array<T>;
    meta: ListMetadata;
}
