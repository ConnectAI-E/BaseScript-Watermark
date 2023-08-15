'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import * as z from 'zod';

import {Button} from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {toast} from '@/components/ui/use-toast';
import {Textarea} from '@/components/ui/textarea';
import {Separator} from '@/components/ui/separator';
import {useEffect, useRef, useState} from 'react';
import {bitable} from '@base-open/web-api';
import {filterAttachedTables} from '@/lib/tables';

const FormSchema = z.object({
        image: z
            .string({
                required_error: 'Please select an image.',
            }),
        watermark: z.string({
            required_error: 'Please enter a watermark.',
        }),

    })
;


export function SelectForm() {
    const [tableInfoNow, setTableInfoNow] = useState<any>({});
    const [tableSchema, setTableSchema] = useState<any>('');
    const [currentTable, setCurrentTable] = useState<any>({});
    const [availableAttachments, setAvailableAttachments] = useState<any>([]);
    const nowTableId = useRef<any>(null);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    const updateTableInfo = async (tableId: any, totalTable: []) => {
        const currentTableMeta = totalTable.find(({ id }: { id: any }) => id === tableId) as any;
        const currentTable = await bitable.base.getTableById(currentTableMeta?.id);
        setCurrentTable(currentTable);
        const fields = await currentTable.getFieldMetaList();
        const tableInfo = {
            name: currentTableMeta?.name,
            fields: fields,
        };
        console.log(tableInfo);
        const allRecords = await currentTable.getRecordIdList();
        const attachment =  filterAttachedTables(fields);
        setAvailableAttachments(attachment);
        const record = await currentTable.getCellValue(attachment[0].id,allRecords [0]);
        console.log(record);
        setTableInfoNow(tableInfo);
    };

    useEffect(() => {
        let totalTable: any = [];
        Promise.all([bitable.base.getTableMetaList(), bitable.base.getSelection()])
            .then(async ([metaList, selection]) => {
                totalTable = metaList;
                nowTableId.current = selection?.tableId;
                updateTableInfo(selection?.tableId, totalTable);
            });

        return () => {

        };
    }, []);


    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: 'You submitted the following values:',
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{ JSON.stringify(data, null, 2) }</code>
        </pre>
            ),
        });
    }

    return (
        <Form { ...form }>
            <form onSubmit={ form.handleSubmit(onSubmit) } className=" space-y-6">
                <FormField
                    control={ form.control }
                    name="image"
                    render={ ({ field }) => (
                        <FormItem>
                            <FormLabel>Image Field</FormLabel>
                            <Select onValueChange={ field.onChange }
                                    defaultValue={ field.value }>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder="Choose image you want to edit"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    { availableAttachments.map((attachment: any) => (
                                        <SelectItem
                                            key={ attachment.id }
                                            value={ attachment.id }>
                                            { attachment.name }
                                        </SelectItem>
                                    )) }
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    ) }
                />
                <FormField
                    control={ form.control }
                    name="watermark"
                    render={ ({ field }) => (
                        <FormItem>
                            <FormLabel>Watermark Content</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter your watermark"
                                    className="resize-none"
                                    { ...field }
                                />
                            </FormControl>
                            <FormDescription>
                                This is how your watermark will appear on the image.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    ) }
                />
                <Button type="submit">Generate</Button>
            </form>
        </Form>
    );
}

// eslint-disable-next-line react/display-name
export default function () {
    return (
        <div className=" space-y-2 p-6  md:block">
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">WaterMark</h2>
                <p className="text-muted-foreground">
                    🔖 add text watermark to your image attachment.
                </p>
            </div>
            <Separator className="my-6"/>
            <div
                className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <div className="flex-1 pt-2">
                    <SelectForm/>
                </div>
            </div>
        </div>
    );
}
