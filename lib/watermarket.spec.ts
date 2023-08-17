import {describe, it} from 'vitest';
import {WatermarkProcess} from './watermarket';


describe('add text', () => {
    const opt = {
        'text': 'watermark-test',
    }
    const linkUrl='https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MzAwZGFlYmM1ODMyYzcwNTM5YTk2NzM1NTYzZDJiNjlfMmVkZTE3ZjVjZGEwZmFiOGE5NDgyODVhZjE3NGUxNjdfSUQ6NzI2NzQ1ODM0ODI1Njg4Njc4N18xNjkyMjYzOTU1OjE2OTIzNTAzNTVfVjM'
    it('should add text', async() => {
        const process = new WatermarkProcess(linkUrl);
        await process.addText('watermark-test');
    })
})

describe('add image', () => {
    const opt = {
        'img': './logo_96.png',
    }
    const linkUrl='https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MzAwZGFlYmM1ODMyYzcwNTM5YTk2NzM1NTYzZDJiNjlfMmVkZTE3ZjVjZGEwZmFiOGE5NDgyODVhZjE3NGUxNjdfSUQ6NzI2NzQ1ODM0ODI1Njg4Njc4N18xNjkyMjYzOTU1OjE2OTIzNTAzNTVfVjM'
    it('should add text', async() => {
        const process = new WatermarkProcess(linkUrl);
        await process.addImage(opt.img);
    })
})

