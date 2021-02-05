import { Album } from "./Album.js";

export class ListAlbum {
  list = [];
  album = new Album();

  constructor() {}

  themAlbum(album) {
    this.list.push(album);
  }

  xoaAlbum(ab) {
    // let id = Number(ab);
    let index = this.list.findIndex((album) => album.maAlbum === ab);
    if (index !== -1) {
      this.list.splice(index, 1);
    }
  }

  chinhSuaAlbum(newAlbum, ab) {
    let index = this.list.findIndex((album) => album.maAlbum === ab);
    if (index !== -1) {
      this.list[index] = newAlbum;
    } else {
      alert("Không tìm thấy album để sửa");
    }
  }

  setLocal() {
    let sLocal = JSON.stringify(this.list);
    localStorage.setItem("list", sLocal);
  }

  getLocal() {
    if (localStorage.getItem("list")) {
      let gLocal = JSON.parse(localStorage.getItem("list"));
      this.list = gLocal;
    }
  }
}
