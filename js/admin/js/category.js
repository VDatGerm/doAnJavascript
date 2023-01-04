const BASE_URL = 'http://localhost/api/admin'
// $(document).ready(function () {
//     /**
//      * Code here
//      */
//     get_category_list()
// })

function get_category_list(){
    $.getJSON(BASE_URL + '/category/index.php', function (data) {
        let category_list = JSON.parse(data)
        render_category(category_list)
    })
}


function render_category(category_list){
    let dom_category = document.getElementById('category_list')
    dom_category.innerHTML = '';

    category_list.forEach(category => {
        let category_node = create_category_node(category)
        dom_category.appendChild(category_node)
    });
}

function create_category_node(category){
    let root = document.createElement('tr')

    let cat_id = document.createElement('td')
    cat_id.textContent = category.id
    root.appendChild(cat_id)

    let cat_name = document.createElement('td')
    cat_name.textContent = category.name
    root.appendChild(cat_name)

    let wrap_btn_edit = document.createElement('td')
    let btn_edit = document.createElement('button')
    btn_edit.innerText  = "Edit"
    btn_edit.setAttribute("class", "btn-primary")

    btn_edit.onclick = function(){
        window.location = 'edit.html'
    }

    wrap_btn_edit.appendChild(btn_edit)

    root.appendChild(wrap_btn_edit)
    
    let wrap_btn_delete = document.createElement('td')
    let btn_delete = document.createElement('button')
    btn_delete.innerText  = "Delete"
    btn_delete.setAttribute("class", "btn-danger")
    btn_delete.onclick = function(){
        delete_category(category.id)
    }
    wrap_btn_delete.appendChild(btn_delete)

    root.appendChild(wrap_btn_delete)

    return root
}

function delete_category(id){
    $.getJSON(BASE_URL + '/category/delete.php?id=' + id, function (data) {
        if(data.status == true){
            location.reload();
        }else{
            alert('Failed delete')
        }
    })
}
//Thêm Category
function doCreateCategory(){
    let category_name = document.getElementById('category_name')
    if(category_name.value==""){
        alert('Vui Lòng Nhập Tên Category')
        return false
    }else{
        category_name = document.getElementById('category_name').value
    }
    addCategory(category_name)
}

function addCategory(category_name){
    let params = {'category_name': category_name}
    $.post(BASE_URL +'/category/create.php', params, function(data){
        let res = JSON.parse(data)
        if(res.code == true){
            alert('Lỗi')
        }else{
            alert('Thêm Thành Công')
            window.location = 'index.html'
        }
    })
}

//Sửa Category
function doUpdateCategory(){
    let category_name = document.getElementById('category_name')
    let category_name_cu = document.getElementById('category_name_cu')
    if(category_name_cu.value==""){
        alert('Vui Lòng Nhập Tên Category Cũ')
        return false
    }else{
        category_name_cu = document.getElementById('category_name_cu').value
    }
    if(category_name.value==""){
        alert('Vui Lòng Nhập Tên Category Mới')
        return false
    }else{
        category_name = document.getElementById('category_name').value
    }
    updateCategory(category_name_cu,category_name)
}

function updateCategory(category_name_cu,category_name){
    let params = {'category_name_cu': category_name_cu ,'category_name': category_name}
    $.post(BASE_URL + '/category/update.php', params, function(data){
        let res = JSON.parse(data)
        if(res.code == true){
            alert('Lỗi')
        }else{
            alert('Update Thành Công')
            window.location = 'index.html'
        }
    })

}