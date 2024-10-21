class Menu {
    constructor() {
        this.id = 0;
        this.name = '';
        this.parentId = 0;
        this.type = '';
        this.system = 0;
        this.url = '';
        this.seq = 0;
        this.langs =[];
    }
}

// class MenuLang {
//     constructor() {
//         this.id = 0
//         this.menuId = 0
//         this.langId = 0
//         this.name = ''
//     }
// }

class Sys {
    constructor() {
        this.menu = new Menu();
        this.children = [];
    }

}

export { Menu, Sys };