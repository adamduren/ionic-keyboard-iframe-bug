import { AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements AfterViewInit {
  public open = true;
  @ViewChild('iframeDefaultDismiss') iframeDefaultDismiss: ElementRef;
  @ViewChild('iframeManualDismiss') iframeManualDismiss: ElementRef;

  constructor(private keyboard: Keyboard) {}

  public addIframe(
    el: HTMLElement,
    path: string,
    handler: (event: MessageEvent) => void,
  ) {
    el.innerHTML = `<iframe src="${path}" frameborder="0"></iframe>`;
    window.addEventListener('message', handler);
  }

  public ngAfterViewInit() {
    this.addIframe(
      this.iframeDefaultDismiss.nativeElement,
      './assets/blur-default-dismiss.html',
      event => {
        const { data } = event;

        if (data && data.type === 'IFRAME_INPUT_DEFAULT_BLUR') {
          console.log('Input blurred. Error is keyboard not dismissed.');
        }
      },
    );

    this.addIframe(
      this.iframeManualDismiss.nativeElement,
      './assets/blur-manual-dismiss.html',
      event => {
        const { data } = event;

        if (data && data.type === 'IFRAME_INPUT_MANUAL_DISMISS') {
          console.log("This time we'll manually dismiss the keyboard.");
          this.keyboard.close();
          console.log('All seems well.. but try focusing the input again.');
        }
      },
    );
  }
}
