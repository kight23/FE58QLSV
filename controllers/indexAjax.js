// // console.log(axios);
// var objectAjax = {
//     url:'./data/arrSinhVien.json', //duong dan den file chua du lieu hoac api do backend cung cap
//     method:'GET',//do back end cung cap
//     repsonseType :'json',//kieu du lieu tra ve do backend cung cap
// }

// //goi ajax = axios => tra ve promise
// var promise = axios(objectAjax);

// // xu ly khi requet thanh cong
// promise.then(function(result){
//     console.log(result.data);
//     document.querySelector('#data').innerHTML = result.data[1].tenSV;
// });

// //xu ly khi that bai
// promise.catch(function(err){
//     console.log(err);
// });


// //lay tu xml---------------
// var objectAjax = {
//     url:'./data/xmlSinhVien.xml', //duong dan den file chua du lieu hoac api do backend cung cap
//     method:'GET',//do back end cung cap
//     repsonse :'document'//kieu du lieu tra ve do backend cung cap
// }
// //goi ajax = axios => tra ve promise
// var promise = axios(objectAjax);

// // xu ly khi requet thanh cong
// promise.then(function(result){
//     console.log('result',result.data);
//     var sSinhVien = result.data.querySelector('SinhVien').innerHTML;
//     var sMaSV = result.data.querySelector('SinhVien').getAttribute('maSV');
//     console.log('ten Sinh Vien:',sSinhVien);
//     console.log('ma Sinh Vien:',sMaSV);
// });

// //xu ly khi that bai
// promise.catch(function(err){
//     console.log(err);
// });
var renderTable = function (mSinhVien) {
    var content = '';
    for (var i = 0; i < mSinhVien.length; i++) {
        //Mỗi lần duyệt lấy ra 1 đối tượng sinh viên trong mảng
        var sinhVien = mSinhVien[i];
        var sv = new SinhVien(sinhVien.maSinhVien, sinhVien.tenSinhVien, sinhVien.loaiSinhVien, sinhVien.diemToan, sinhVien.diemLy, sinhVien.diemHoa, sinhVien.diemRenLuyen, sinhVien.email, sinhVien.soDienThoai);

        content += `
            <tr>
                <td>${sv.maSinhVien}</td>
                <td>${sv.tenSinhVien}</td>
                <td>${sv.loaiSinhVien}</td>
                <td>${sv.tinhDiemTrungBinh()}</td>
                <td>${sv.diemRenLuyen}</td>
                <td>
                
                <button class="btn btn-danger" onclick="xoaSinhVien('${sv.maSinhVien}')" >Xoá</button>
                
                <button class="btn btn-danger" onclick="chinhSua('${sv.maSinhVien}')" >Chỉnh sửa</button>
                </td>
            </tr>
        `
    }
    document.querySelector('#tblSinhVien').innerHTML = content;
}


// get------------------------
var renderSinhVien = function () {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien', //duong dan den file chua du lieu hoac api do backend cung cap
        method: 'GET',//do back end cung cap
        repsonseType: 'json'//kieu du lieu tra ve do backend cung cap
    })
    // xu ly khi requet thanh cong
    promise.then(function (result) {
        console.log('1');
        console.log('result', result.data);
        // hien thi thong tin sinh vien len giao dien
        renderTable(result.data);
    });

    //xu ly khi that bai
    promise.catch(function (err) {
        // console.log(err);
        console.log('2');
    });
    console.log('3');
}

renderSinhVien();

// post------------------------
document.querySelector('#btnXacNhan').onclick = function () {
    // lay thong tin tu nguoi dung nhap vao
    var oSinhVien = new SinhVien();
    oSinhVien.maSinhVien = document.querySelector('#maSinhVien').value;
    oSinhVien.tenSinhVien = document.querySelector('#tenSinhVien').value;
    oSinhVien.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    oSinhVien.email = document.querySelector('#email').value;
    oSinhVien.soDienThoai = document.querySelector('#soDienThoai').value;
    oSinhVien.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    oSinhVien.diemToan = document.querySelector('#diemToan').value;
    oSinhVien.diemLy = document.querySelector('#diemLy').value;
    oSinhVien.diemHoa = document.querySelector('#diemHoa').value;

    console.log('SInh Vien:', oSinhVien);

    // goi  api de dua du lieu ve server luu tru
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien', //duong dan den file chua du lieu hoac api do backend cung cap
        method: 'POST',//do back end cung cap
        data: oSinhVien, //Format data phai dung dinh dang backend can
        repsonseType: 'json'//kieu du lieu tra ve do backend cung cap
    });
    // xu ly khi requet thanh cong

    promise.then(function (result) {
        console.log('xu ly thanh cong', result.data);
        // goi ham lay lai du lieu moi nhat
        renderSinhVien();
    });

    //xu ly khi that bai
    promise.catch(function (err) {
        console.log('xu ly that bai', error);
    });
}

// Delete------------------------
window.xoaSinhVien = function (maSinhVien) {
    var promise = axios({
        url: `http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=${maSinhVien}`, //duong dan den file chua du lieu hoac api do backend cung cap
        method: 'Delete',//do back end cung cap        
    });
    // xu ly khi requet thanh cong

    promise.then(function (result) {
        console.log('xu ly thanh cong', result.data);
        // goi ham lay lai du lieu moi nhat
        renderSinhVien();
    });

    //xu ly khi that bai
    promise.catch(function (err) {
        console.log('xu ly that bai', error.repsonse.data);
    });
}

// Put------------------------
window.chinhSua = function (maSinhVien) {
    axios(
        {
            url: `http://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien=${maSinhVien}`, //duong dan den file chua du lieu hoac api do backend cung cap
            method: 'GET',//do back end cung cap        
        }
    ).then(function (result) {
        console.log('xu ly thanh cong', result.data);
        var sv = result.data;
        //Load lại lên control phía trên 
        document.querySelector('#maSinhVien').value = sv.maSinhVien;
        document.querySelector('#tenSinhVien').value = sv.tenSinhVien;
        document.querySelector('#loaiSinhVien').value = sv.loaiSinhVien;
        document.querySelector('#email').value = sv.email;
        document.querySelector('#soDienThoai').value = sv.soDienThoai;
        document.querySelector('#diemRenLuyen').value = sv.diemRenLuyen;
        document.querySelector('#diemToan').value = sv.diemToan;
        document.querySelector('#diemLy').value = sv.diemLy;
        document.querySelector('#diemHoa').value = sv.diemHoa;

    }
    ).catch(function (err) {
        console.log('xu ly that bai', error);
    }
    );
}

document.querySelector('#btnCapNhatSinhVien').onclick = function () {
    var sv = new SinhVien();
    //Load lại lên control phía trên 
    sv.maSinhVien =  document.querySelector('#maSinhVien').value;
    sv.tenSinhVien =  document.querySelector('#tenSinhVien').value;
    sv.loaiSinhVien =  document.querySelector('#loaiSinhVien').value;
    sv.email =  document.querySelector('#email').value = sv.email;
    sv.soDienThoai =  document.querySelector('#soDienThoai').value;
    sv.diemRenLuyen =  document.querySelector('#diemRenLuyen').value;
    sv.diemToan =  document.querySelector('#diemToan').value;
    sv.diemLy =  document.querySelector('#diemLy').value;
    sv.diemHoa =  document.querySelector('#diemHoa').value;

    axios(
        {
            url: `http://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien=${sv.maSinhVien}`, //duong dan den file chua du lieu hoac api do backend cung cap
            method: 'PUT',//do back end cung cap  
            data: sv      
        }
    ).then(function (result) {
        renderSinhVien();
    }
    ).catch(function (err) {
        console.log('xu ly that bai', error.repsonse.data);
    }
    );


    this.kiemtraQRCode = function(){
        console.log('Check QR Code');
    }

    this.chucnangUserA = function(){
        console.log('user A');
    }
}