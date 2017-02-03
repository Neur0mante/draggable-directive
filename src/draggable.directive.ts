import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/startWith';
import { Directive, ElementRef, HostListener, OnDestroy, OnInit, Renderer, Input, AfterContentInit } from '@angular/core';


@Directive({
  selector: '[draggable]'
})
export class DraggableDirective implements OnDestroy {

  // You can now set draggable on and off by just assigning it a value
  // I dont quite understand how it was working without this
  dragging: boolean = false;
  private Δx: number = 0;
  private Δy: number = 0;
  private mustBePosition: string[] = ['absolute', 'fixed', 'relative'];
  private drag$: Subscription;
  constructor(
    private el: ElementRef, private renderer: Renderer
  ) {
  }
  @HostListener('mouseup', ['$event'])
  onMouseup(event: MouseEvent) {
    this.Δx = 0;
    this.Δy = 0;
    this.dragging = false;
    this.drag$.unsubscribe();
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event: MouseEvent) {
    event.preventDefault();
    this.Δx = event.x - this.el.nativeElement.offsetLeft;
    this.Δy = event.y - this.el.nativeElement.offsetTop;
    this.dragging = true;
    
    let end = Observable.fromEvent(document, "mouseup")
      .subscribe((ev: MouseEvent) => {
        this.onMouseup(ev)
      });
    this.drag$ = Observable.fromEvent(document, "mousemove")
      .subscribe((ev: MouseEvent) => {
        this.doTranslation(ev.x, ev.y);
      })
  }

  //   @HostListener('mousemove', ['$event'])
  //   onMousemove(event: MouseEvent) {
  //      if (this.dragging) {    
  //     console.log("HostListener");
  //     console.log(event);
  //     // this.doTranslation(event.x, event.y);
  //   }
  // }

  ngAfterViewInit() {
    try {
      if (this.mustBePosition.indexOf(this.el.nativeElement.style.position) === -1) {
        console.log(this.el.nativeElement.style.getPropertyValue("position"));
        console.warn(this.el.nativeElement, 'Must be having position attribute set to ' + this.mustBePosition.join('|'));
        // this.el.nativeElement.style.position = "relative";
        // this.renderer.setElementAttribute(this.el.nativeElement, 'position', 'relative');
        // console.log(this.el.nativeElement.style.getPropertyValue("position"));
      }
    } catch (ex) {
      console.error(ex);
    }
    this.renderer.setElementAttribute(this.el.nativeElement, 'draggable', 'true');
  }

  public ngOnDestroy(): void {
    this.renderer.setElementAttribute(this.el.nativeElement, 'draggable', 'false');
  }


  doTranslation(x: number, y: number) {
    if (!x || !y) { return; }
    this.renderer.setElementStyle(this.el.nativeElement, 'top', (y - this.Δy) + 'px');
    this.renderer.setElementStyle(this.el.nativeElement, 'left', (x - this.Δx) + 'px');
  }
}
