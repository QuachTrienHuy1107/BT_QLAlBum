import { Album } from "../models/Album.js";
import { ListAlbum } from "../models/ListAlbum.js";
import { checkName } from "../Validator/index.js";

let listAlbum = new ListAlbum();
let count = [];

let setLocalCount = () => {
  let sLocal = JSON.stringify(count);
  let demo = localStorage.setItem("count", sLocal);
};

function getLocalCount() {
  if (localStorage.getItem("count")) {
    let gLocal = JSON.parse(localStorage.getItem("count"));
    count = gLocal;
  }
}
getLocalCount();

let setCount = () => {
  let c = count.length;
  c++;
  count.push(c);
  setLocalCount();

  return c;
};

let trangHienTai = 1;
let soDong = 3;

let pagination = (idNavLink) => {
  document.getElementById(idNavLink).addEventListener("click", () => {
    // render(listAlbum.list);
    let temp = idNavLink.split("_");

    trangHienTai = Number(temp[1]) + 1;
    let begin = (trangHienTai - 1) * soDong;
    let end = (trangHienTai - 1) * soDong + soDong;

    let items = listAlbum.list.slice(begin, end);
    render(items);
  });
};

let render = (list) => {
  let contentHTML = list.reduce((content, item, index) => {
    return (content += `<div class="col-md-4" id="album-${index}">
      <div class="card mb-4 box-shadow">
        <div class="reponsive-img"  style="background-image: url('${
          item.linkAnh
        }');">
    
      </div>
        <div class="card-body">

          <h3 class="listName">${item.tenAlbum}</h3>
          <p class="card-text">${item.moTa}</p>
          <p class="card-text">Thể loại: ${
            item.theLoai === "1"
              ? "Gái xinh"
              : item.theLoai === "2"
              ? "Trai đẹp"
              : "Idol"
          }</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button type="button" class="btn btn-success text-white btn-sm btn-outline-secondary mr-2" onclick="updateAlbum(${
                item.maAlbum
              })">Chỉnh sửa</button>
              <button type="button" class="btn btn-danger text-white btn-sm btn-outline-secondary" onclick="removeAlbum(${
                item.maAlbum
              })">Xóa</button>
            </div>
          </div>
        </div>
      </div>
    </div>`);
  }, "");

  document.getElementById("listAnh").innerHTML = contentHTML;

  //Pagination
  let ulPhanTrang = document.getElementById("pagination");
  ulPhanTrang.innerHTML = "";

  let soTrang = Math.ceil(list.length / soDong);

  for (let i = 0; i < soTrang; i++) {
    let li = document.createElement("li");
    li.setAttribute("class", "page-item mx-1");
    ulPhanTrang.appendChild(li);

    let a = document.createElement("a");
    a.setAttribute("class", "page-link pageLink");
    a.setAttribute("id", `trang_${i}`);
    a.innerHTML = i + 1;

    li.appendChild(a);
    let items = pagination(`trang_${i}`);
    console.log(items);
  }
};

let resetForm = () => {
  let arrInput = document.querySelectorAll("input, select");
  for (let input of arrInput) {
    input.value = "";
    input.selectedIndex = 0;
  }
};

listAlbum.getLocal();
render(listAlbum.list);

document.getElementById("btnThemAlbum").onclick = (e) => {
  e.preventDefault();
  let arrInput = document.querySelectorAll("input, select");
  let album = new Album();
  let idd = setCount();

  for (let input of arrInput) {
    let { id, value } = input;
    album = { ...album, [id]: value, maAlbum: idd };
  }

  if (checkName(album.tenAlbum)) {
    listAlbum.themAlbum(album);
    swal("Đã thêm thành công", "", "success");
    render(listAlbum.list);
    listAlbum.setLocal();
    resetForm();
  }
};

document.getElementById("btnCapNhatAlbum").disabled = true;

document.getElementById("btnCapNhatAlbum").onclick = () => {
  let arrInput = document.querySelectorAll("input, select");
  let album = new Album();

  for (let input of arrInput) {
    let { id, value } = input;
    album = { ...album, [id]: value };
  }

  listAlbum.chinhSuaAlbum(album, listAlbum.album.maAlbum);

  render(listAlbum.list);
  listAlbum.setLocal();
  swal("Đã cập nhật thành công", "", "success");
  resetForm();
  document.getElementById("btnThemAlbum").disabled = false;
};

window.removeAlbum = (a) => {
  let cfm = confirm("Bạn có chắc muốn xóa album này không?");
  if (cfm) {
    listAlbum.xoaAlbum(a);
    listAlbum.setLocal();
    render(listAlbum.list);
  }
};

window.updateAlbum = (album) => {
  let index = listAlbum.list.find((ab) => ab.maAlbum === album);
  if (index) {
    listAlbum.album = index;
    document.getElementById("linkAnh").value = index.linkAnh;
    document.getElementById("moTa").value = index.moTa;
    document.getElementById("theLoai").value = index.theLoai;
    document.getElementById("tenAlbum").value = index.tenAlbum;
    document.getElementById("btnThemAlbum").disabled = true;
    document.getElementById("btnCapNhatAlbum").disabled = false;
  }
};
