// packages/ui-library/src/index.ts
import { init } from 'snabbdom/build/package/init';
import { h, VNode } from 'snabbdom/build/package/h';

export type TemplateFunction = (state: any, props: any) => VNode;

export class UIComponent {
  private state: any = {};
  private template: TemplateFunction;
  private container: HTMLElement | null = null;

  constructor(template: TemplateFunction) {
    this.template = template;
  }

  public mount(container: HTMLElement) {
    this.container = container;
    this.render();
    this.logEvent('mounted');
  }

  public updateState(newState: any) {
    this.state = { ...this.state, ...newState };
    this.render();
    this.logEvent('stateChanged');
  }

  private render() {
    if (this.container) {
      const patch = init([]);
      const newVNode = this.template(this.state, {});
      patch(this.container, newVNode);
    }
  }

  private logEvent(event: string) {
    console.log(`Event: ${event}`);
  }
}

// Example usage
const template: TemplateFunction = (state, props) => h('h1', {}, `Count: ${state.count}`);

const myComponent = new UIComponent(template);

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('app');
  if (container) {
    myComponent.mount(container);
  }

  const addButton = document.getElementById('addButton');
  if (addButton) {
    addButton.addEventListener('click', () => myComponent.updateState({ count: myComponent.state.count + 1 }));
  }
});

