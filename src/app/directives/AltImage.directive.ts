import {Directive, ElementRef, HostListener, Input, AfterViewChecked} from '@angular/core';

@Directive({
    selector: '[appAltImage]'
})
export class AltImageDirective implements AfterViewChecked {
    @Input() appAltImage: string;

    constructor(private eRef: ElementRef) {
        console.log('AltImageDirective');
    }

    ngAfterViewChecked() {
        const width = this.eRef.nativeElement.width;
        if (width > 100) {
            this.eRef.nativeElement.style.height = width * 9 / 16 + 'px';
        }
    }

    @HostListener('error')
    loadAltImage() {
        const element: HTMLImageElement = this.eRef.nativeElement as HTMLImageElement;
        element.src = './assets/alt' + (Math.floor(Math.random() * 4) + 1) + '.jpg';
    }
}
