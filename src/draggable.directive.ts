import 'rxjs/add/operator/startWith';
import { Directive, ElementRef, HostListener, OnDestroy, OnInit, Renderer, Input } from '@angular/core';


@Directive({
  selector: '[draggable]'
})
export class DraggableDirective implements OnInit, OnDestroy {

  // You can now set draggable on and off by just assigning it a value
  @Input('draggable') draggable: boolean = true;
  // I dont quite understand how it was working without this
  dragging: boolean = false;
  private Δx: number = 0;
  private Δy: number = 0;
  private mustBePosition: string[] = ['absolute', 'fixed', 'relative'];

  constructor(
    private el: ElementRef, private renderer: Renderer
  ) {
    try {
      if (this.mustBePosition.indexOf(this.el.nativeElement.style.position) === -1) {
        this.el.nativeElement.style.position = "relative";
        console.warn(this.el.nativeElement, 'Must be having position attribute set to ' + this.mustBePosition.join('|') + ", defaulting to relative.");
      }
    } catch (ex) {
      console.error(ex);
    }
  }
  @HostListener('mouseup', ['$event'])
  onMouseup(event: MouseEvent) {
    this.Δx = 0;
    this.Δy = 0;
    this.dragging = false;
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event: MouseEvent) {
    // I still want to be able to finish the drag even if draggable changes during the movement
    // So I'm checking this only here 
    if (this.draggable) {
      event.preventDefault();
      this.Δx = event.x - this.el.nativeElement.offsetLeft;
      this.Δy = event.y - this.el.nativeElement.offsetTop;
      this.dragging = true;
    }
  }

  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) { 
    if (this.dragging) { this.doTranslation(event.x, event.y); }
   }



  ngOnInit() {
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
