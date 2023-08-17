import {
    IAttachmentFieldMeta,
    IFieldMeta,
    IOpenAttachment,
    IWidgetTable,
} from '@base-open/web-api';

export function filterAttachedTables(tables: IFieldMeta[]): IFieldMeta[] {
    return tables.filter((table) => table.type === 17);
}

export function filterContent(tables: IFieldMeta[]): IFieldMeta[] {
    return tables.filter((table) => table.type === 1);
}



export class downloadImage{
    attachment: IOpenAttachment[];
    table: IWidgetTable;
    // [
    //     {
    //         "name": "MidjourneyApi.png",
    //         "size": 1440130,
    //         "type": "image/png",
    //         "token": "A9vTbLX3xo2Nl5xOGKec3CjInbf",
    //         "timeStamp": 1692087004856
    //     }
    //     ]
    constructor(attachment: IOpenAttachment[], table: IWidgetTable) {
        this.attachment = attachment;
        this.table = table;
    }

    get imageAttachments() {
        // console.log(this.attachment);
        return this.attachment.filter((table) => table.type === "image/png");
    }

    get isNoImage() {
        return this.imageAttachments.length === 0;
    }

    get isOneImage() {
        return this.imageAttachments.length === 1;
    }

    async getDownloadUrl(attachmentFieldMeta: IOpenAttachment) {
        const url = await this.table.getAttachmentUrl(
            attachmentFieldMeta.token,
        );
        return url;
    }

}


