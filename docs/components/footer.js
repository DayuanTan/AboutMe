class Footer extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
        <footer>
            <hr>
            <p>Created by Dayuan Tan with love.<br>
            Leave me a message by<a href="https://github.com/DayuanTan/AboutMe/issues/new"> posting an issue.</a></p>
            <br>
        </footer>
      `;
    }
  }
  
  customElements.define('footer-component', Footer);