class Header extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
        <header>
            <div class="jumbotron text-center header_margin_bottom">
                <h1><a href="https://dayuantan.github.io/AboutMe/">Dayuan Tan's Home Page</a></h1>
                
                <div class="a_hover_bottom_whiteline">
                    <a href="https://dayuantan.github.io/AboutMe/"><img class="header_icon_height" alt="Home page"  title="Home page" src="img/home.png"></a>
                    &nbsp
                    <a href="https://github.com/DayuanTan"><img class="header_icon_height" alt="GitHub"  title="GitHub" src="img/github-logo.png"></a>
                    &nbsp
                    <a href="https://www.researchgate.net/profile/Dayuan-Tan"><img class="header_rg_icon" alt="ResearchGate"  title="ResearchGate" src="img/rg.png"></a>
                    &nbsp
                    <a href="https://scholar.google.com/citations?hl=en&user=1_H0BuoAAAAJ&view_op=list_works&gmla=AJsN-F5Tx3_HukNh9DcmfoIxKQemoL-u9eJlFSoMtVXtejTXtxW9dyM4QyDTW0UQzpzoaffDqAhZM2uIpUEj8c54n0rP7sEKqA"><img class="header_icon_height" alt="GoogleScholar"  title="GoogleScholar" src="img/gs.png"></a>
                    &nbsp
                    <a href="https://gist.github.com/DayuanTan"><img class="header_icon_height" alt="GitHub-Gist"  title="GitHub-Gist" src="img/github-gist-logo.png"></a>
                    &nbsp
                    <a href="https://dayuannotes.gitbook.io/dayuannotes/"><img class="header_icon_height" alt="Gitbook"  title="Gitbook" src="img/gitbook.png"></a>
                </div>
            </div>
        </header>

        <hr class="a_line_margin" size="1" >  
        <nav class="navbar sticky-top navbar-expand-lg navbar-light justify-content-center mynav">
          <div class="container">
                  <ul class="navbar-nav w-100 justify-content-center">
                      <li class="nav-item">
                          <a class="nav-link " aria-current="page" href="index.html">Home</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" href="researches.html">Academic Researches</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="projects.html">Programming Projects</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="notes.html">Articles & Notes</a>
                      </li>
                  </ul>
          </div>
        </nav>  

      `;
    }
  }
  
  customElements.define('header-component', Header);