$( document ).ready(function() {
    getDataByAPI();
     
    $("#exampleModal").find("#btnAdd").off().on("click", (e) => {
        AddProductData();
    })
});
let listOfDatas = [];
var getDataByAPI =()=>{
   
fetch('https://dummyjson.com/products').then(res=> res.json())
.then(data=>{
    localStorage.setItem('products',JSON.stringify(data.products));
    AllDataGet();
}).catch(error=>{
    console.log('error:',error)
})
}

var AllDataGet=()=>{
   // var listoddatas=localStorage.getItem(JSON.parse(products))
    listOfDatas=JSON.parse(localStorage.getItem('products'));
   var DivTable =$(MainDiv).find('#DivTableData').html('');
   listOfDatas.forEach(element => {
    console.log("element",element)
    var appenddata=$(MainDiv).find('#SampleData').find('tr').clone();
    appenddata.find(".Id").html(element.id)
    appenddata.find(".Title").html(element.title)
    appenddata.find(".Brand").html(element.brand)
    appenddata.find(".Category").html(element.category)
        $(appenddata).find(".btnEdit").on("click", (e) => {

            getdatabyId(element.id);
        });
        $(appenddata).find(".btnDelete").on("click", (e) => {
            DeleteData(element.id)
        });
        $(MainDiv).find("#DivTableData").append(appenddata);
   });
}
var getdatabyId = (id) => {
    var data = listOfDatas.find(x => x.id == id);
    console.log('mahsssjas',data)
    if (data != null) {
        $('#productID').val(data.id);
        $('#producttitle').val(data.title);
        $('#productbrand').val(data.brand);
        $('#productcategory').val(data.category);
        $('#productdescription').val(data.description);
        $('#exampleModal').modal('show');
    }   
}
var DeleteData=(id)=>{
    var ans = confirm("Are you sure you want to delete this Record?");

    if (ans) {
        var newlist = listOfDatas.filter(x => x.id != id);
        localStorage.setItem("products", JSON.stringify(newlist));
        AllDataGet()
        alert("Product deleted successfully!");
    }
}
var AddProductData = () => {
    var obj = {
        id: $('#productID').val() ? $('#productID').val() : 0,
        title: $('#producttitle').val(),
        brand: $('#productbrand').val(),
        category: $('#productcategory').val(),
        description: $('#productdescription').val(),
    };
    if (obj.id) {
        Mainproduct = listOfDatas.map(product => {
            if (product.id == obj.id) {
                product.title = $('#producttitle').val(),
                    product.brand = $('#productbrand').val(),
                    product.category = $('#productcategory').val(),
                    product.description = $('#productdescription').val()
            }
            return product;
        });        
        localStorage.setItem("products", JSON.stringify(Mainproduct));
        AllDataGet();

        alert("Product updated successfully!");
        $('#exampleModal').modal('hide');
        ResetForm();
    }
    else {
        obj.id=listOfDatas.length+1;

        listOfDatas.push(obj);
        localStorage.setItem("products", JSON.stringify(listOfDatas));
        alert("Product Added successfully!");
        $('#exampleModal').modal('hide');
        ResetForm();
        AllDataGet();     
    }
}

var ResetForm = () => {
    $('#productID').val("");
    $("#producttitle").val("");
    $("#productbrand").val("");
    $("#productcategory").val("");
    $("#productdescription").val("");
}
