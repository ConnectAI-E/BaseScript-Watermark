import {describe,it,expect} from 'vitest';
import {filterAttachedTables} from './tables';

describe('filter all attachments', () => {
    const testField =
        [
            {
                'id': 'fld3qDpja3',
                'type': 17,
                'name': '附件',
                'property': {},
            },
            {
                'id': 'fld3qeeja3',
                'type': 17,
                'name': '附件2',
                'property': {},
            },
            {
                'id': 'fldc5aeRnK',
                'type': 1,
                'name': 'content',
                'property': {},
            },
        ] as any;
    const expectResult = [
        {
            'id': 'fld3qDpja3',
            'type': 17,
            'name': '附件',
            'property': {},
        },
        {
            'id': 'fld3qeeja3',
            'type': 17,
            'name': '附件2',
            'property': {},
        },
    ];
    it('should return all attachments', () => {
        expect(filterAttachedTables(testField)).toEqual(expectResult);
    })

});
