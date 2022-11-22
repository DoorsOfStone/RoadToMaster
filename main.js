let result = document.getElementById("inputnum");

let calc=(number)=>{
    result.value += number;
}
let Result=()=>{
   try{ 
    result.value = eval(result.value)
   }
   catch(err){
    alert("Input results is invalid");
   }
}
function clr(){
    result.value = " ";
}
function del(){
    result.value = result.value.slice(0,-1);
}