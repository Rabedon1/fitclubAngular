import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
@Component({
  selector: 'app-body-map',
  standalone: false,
  templateUrl: './body-map.component.html',
  styleUrl: './body-map.component.css'
})
export class BodyMapComponent  implements AfterViewInit {
  @ViewChildren('svg') svgElements!: QueryList<ElementRef<SVGElement>>;
  selectedArea: string = '';

  ngAfterViewInit(): void {
    this.svgElements.forEach((svgElement: ElementRef<SVGElement>) => {
      svgElement.nativeElement.addEventListener('click', (event: MouseEvent) => {
        const target = event.target as unknown; // Cast to unknown first
        const parent = (event.target as Element).parentElement as unknown; // Cast parent to unknown

        // Check if target is an SVGElement and has data-position
        if (target instanceof SVGElement && target.getAttribute('data-position')) {
          this.selectedArea = target.getAttribute('data-position')!;
        }
        // Check if parent is an SVGElement and has data-position
        else if (parent instanceof SVGElement && parent.getAttribute('data-position')) {
          this.selectedArea = parent.getAttribute('data-position')!;
        }
      });
    });
  }
}