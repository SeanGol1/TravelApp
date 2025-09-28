// import { Component, AfterViewInit  } from '@angular/core';


// declare global {
//   interface Window {
//     eg_widgets: any; 
//   }
// }

// @Component({
//   selector: 'app-expedia-widget',
//   standalone: true,
//   imports: [],
//   templateUrl: './expedia-widget.component.html',
//   styleUrl: './expedia-widget.component.css'
// })
// export class ExpediaWidgetComponent implements AfterViewInit {

//   ngAfterViewInit(): void {
//     const scriptId = 'expedia-widget-script';

//     if (!document.getElementById(scriptId)) {
//       const script = document.createElement('script');
//       script.id = scriptId;
//       script.src = 'https://creator.expediagroup.com/products/widgets/assets/eg-widgets.js';
//       script.async = true;
//       script.onload = () => {
//         if (window.eg_widgets) {
//           window.eg_widgets.renderAll();
//         }
//       };
//       document.body.appendChild(script);
//     } else {
//       // Already loaded, just re-render
//       if (window.eg_widgets) {
//         window.eg_widgets.renderAll();
//       }
//     }
//   }
// }

import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

declare global {
  interface Window {
    eg_widgets?: {
      renderAll: () => void;
      render: (el: HTMLElement) => void;
    };
  }
}

@Component({
  selector: 'app-expedia-widget',
  standalone: true,
  templateUrl: './expedia-widget.component.html',
  styleUrls: ['./expedia-widget.component.css']
})
export class ExpediaWidgetComponent implements AfterViewInit {
  @ViewChild('widgetContainer', { static: true }) widgetContainer!: ElementRef;

  ngAfterViewInit(): void {
    const scriptId = 'expedia-widget-script';
    const container = this.widgetContainer.nativeElement;

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://creator.expediagroup.com/products/widgets/assets/eg-widgets.js';
      script.async = true;
      script.className = 'eg-widgets-script';
      script.onload = () => {
        console.log('Expedia script loaded, rendering...');
        // window.eg_widgets?.render(container); // safer than renderAll
        window.eg_widgets?.renderAll();
      };
      document.body.appendChild(script);
    } else {
      // Script already loaded, just re-render
      // window.eg_widgets?.render(container);
      window.eg_widgets?.renderAll();
    }
  }
}

