import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable()
export class TitleService {

    constructor(private title: Title,
                private meta: Meta) { }

    private data;

    setTitle(data) {
        this.title.setTitle(`${data} - Peça Delivery`);
    }

    setMeta(data) {
        this.meta.addTags(data);
    }
}
