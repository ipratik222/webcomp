class MyApp extends HTMLElement {
    connectedCallback() {
      const shadow = this.attachShadow({ mode: 'open' });
      const div = document.createElement('div');
      shadow.appendChild(div);
      ReactDOM.render(<App />, div);
    }
  }
  
  customElements.define('my-app', MyApp);