import watermark from './jimp-watermark';

export class WatermarkProcess {
    imagePath: string;

    opt = {
        'text': 'watermark-test',

    };

    constructor(image: string) {
        this.imagePath = image;
    }

    async addText(text: string) {
        return await watermark.addTextWatermark(this.imagePath, {
            'location' : 'center'as any,
            'text': text,
            'textSize': 6,
            'dstPath': './watermark.jpg',
        });

    }

    async addImage(image: string) {
        return await watermark.addWatermark(this.imagePath,image, {
            'location' : 'bottom-right'as any,
            'ratio': 0.2,
            'opacity': 0.3,
            'dstPath': './watermark.jpg',
        });
    }


}
