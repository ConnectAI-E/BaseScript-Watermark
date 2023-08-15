import {IFieldMeta} from '@base-open/web-api';

export function filterAttachedTables(tables: IFieldMeta[]): IFieldMeta[] {
    return tables.filter((table) => table.type === 17);
}

export function filterContent(tables: IFieldMeta[]): IFieldMeta[] {
    return tables.filter((table) => table.type === 1);
}

