"use strict";

class VideoSystemView {


  constructor() {
    this.nav = document.getElementById("#navID");
    this.main = document.getElementById("#mainID");
    this.footer = document.getElementById("#footerID");
  }
  // metodos
  init() {
    // reiniciar nav, main y footer
    this.nav.replaceChildren();
    this.main.replaceChildren();
    this.footer.replaceChildren();

    // mostrar categorias


  };

  onLoad = () => {

  };
}

// exportar clase
export default VideoSystemView;