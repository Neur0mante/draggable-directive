Simple draggable directive for angular2 (Tested in 2.4.5).

Forked from https://github.com/CoderAjay/ng2Draggable


This will just allow to freely move an element around the page, there's no onDrop or any service connected.

To use it just import it in your app or feature module:
```javascript
import { DraggableModule } from 'draggable-directive/draggable-directive'

...

@NgModule({
  imports: [
    DraggableModule
  ]
}
```

Then you can add the [draggable] directive to elements in your templates
```html
<div [draggable] [style.position]="relative" >Drag me.</div>
```
Remember to set the positioning to either relative, fixed or absolute.

You can optionally disable it by setting it to false:
```html
<div [draggable]="false" [style.position]="relative">Drag me.</div>
```
and of course bind it to a property.



I'm still having some positioning issues in some cases, it's still much of a work in progress.