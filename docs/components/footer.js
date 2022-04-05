class Footer extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
        <footer>
            <hr>
            <p>Created by <a href="https://dayuantan.github.io/AboutMe/">Dayuan Tan</a> with love.<br>
            Leave me a message by<a href="https://github.com/DayuanTan/AboutMe/issues/new"> posting an issue.</a></p>
            <br>
        </footer>
      `;
    }
  }
  
  customElements.define('footer-component', Footer);
