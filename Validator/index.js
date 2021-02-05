export let checkName = (ten) => {
  const arrName = [...document.getElementsByClassName("listName")];
  let index = arrName.findIndex((arr) => arr.innerHTML === ten);
  if (index !== -1) {
    alert("Tên bị trùng!! Mời bạn đặt tên khác");
    return false;
  } else {
    return true;
  }
};
