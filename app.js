//Start App Component;
class app{
/*
                    All element Selector
*/
    constructor(){
        //Value Input Element Selector
        this.form = document.getElementById('form');
        this.date= document.getElementById('customize_date');
        this.product_Quantity= document.getElementById('p_quantity');
        this.submition_Money= document.getElementById('submition_money');
        //Value Output Element Selector
        this.allDetails=document.getElementById('allDetails');
        this.reCheck_data = document.getElementById('reCheck_data');
        this.showTotalAmount= document.getElementById('showTotalAmount');
        //Animation Element Selector
        this.popup = document.getElementById('popup-bar');
        this.cancelBtn = document.getElementById('cancelBtn');
        this.conformBtn = document.getElementById('conformBtn');
        this.arr=[[],[]];
    };
/*
                    All element Selector
*/
/**************************************************************/
/*
                    Cliced Action Event
*/
    EventFireStart(){
    this.getData() //Displaying All Data;
     this.form.addEventListener('submit',(e)=>{ //form submited Handeler
            e.preventDefault(); // Stop Unwanted Refresh;
         this.check_Validation(); //Chaking Validation;
        });

    //Just one Input Box working in a time.
    this.product_Quantity.addEventListener('input',(e)=>{
        this.submition_Money.value=null;
    });
    this.submition_Money.addEventListener('input',(e)=>{
        this.product_Quantity.value =null;
    });

    this.cancelBtn.addEventListener('click',()=>{ //Popup cancel Button Handler
        this.popup.classList.remove('showPopup');
    });
    this.conformBtn.addEventListener('click',()=>{ //Popup Conform Button Handler
        this.popup.classList.remove('showPopup'); //Remove Popup Bar;
        this.setData(this.dataArray[0],this.dataArray[1],this.dataArray[2]);//
        this.product_Quantity.value ? this.product_Quantity.value =null : this.submition_Money.value=null; //Clear Input Box
    });
};
/*
                    Cliced Action Event
*/
/**************************************************************/

/*
                Check Data Validation
*/
check_Validation(){
        this.formatedDateTime = this.date.value == '' ? this.timeFormat(new Date()) : this.timeFormat2(this.date.value);
//Validation Chack
    this.dataArray=[this.formatedDateTime,this.product_Quantity.value,this.submition_Money.value];

        if(this.product_Quantity.value == '' && this.submition_Money.value == '' ){
            alert('Please Fill Minimum One Value!'); 
        }else{
            for(let i=0;i<3;i++){
                this.reCheck_data.children[i].children[1].innerHTML=this.blankDataAvoid(this.dataArray[i]);
            };
            this.popup.classList.add('showPopup');
        };
    };

/*
                Check Data Validation
*/
/**************************************************************/
/*
                Time Formater Start Here 
*/
timeFormat(date){
    return `${date.getFullYear()}-${(date.getMonth()+1) <10 ?  `0${(date.getMonth()+1)}`:(date.getMonth()+1) }-${date.getDate()} / ${date.getHours() >12 ? date.getHours() - 12:date.getHours() }:${date.getMinutes()}`;
 };
timeFormat2(date){
    const myArr = date.split("T"); 
    let wow=myArr[1].split(':')[0] >12 ? `${myArr[1].split(':')[0] -12}` : myArr[1].split(':')[0];
   return `${myArr[0]} / ${wow}:${myArr[1].split(':')[1]}`
 };
blankDataAvoid(data){
    return data ? data : `<i class="bi bi-dash-circle-dotted"></i>`
};
/*
                Time Formater End Here
*/
/**************************************************************/
/*
                LocalStorage Set Data
*/
setData(date,value1,value2){
    this.getData();
    //Set Data
    this.arr[0].push({ date,value:value1});
    this.arr[1].push({ date,value:value2});
    localStorage.setItem('Arr',JSON.stringify(this.arr));
    this.calculationData(this.arr);
}
/*
                LocalStorage Set Data
*/
/**************************************************************/
/*
                LocalStorage Get Data
*/
getData(){
 //Get Data
 let getValue= localStorage.getItem('Arr');
 if(getValue != null){
     this.arr = JSON.parse(getValue);
 };
 this.calculationData(this.arr);
};
/*
                LocalStorage Get Data
*/
/**************************************************************/
/*
                Gated Data Calculated!
*/
calculationData(data){
    let child=this.allDetails.children.length;
    let totalSubmittionAmount = 0;
    let totalProdcutPriceAmount= 0;
    for(let i=child;i< data[0].length;i++){
        if(data[0][i].value != '' ){
            this.showData(data[0][i].date,data[0][i].value,null);
        }else{
            this.showData(data[1][i].date,null,data[1][i].value);
        }
    }
    for(let i=0;i< data[0].length;i++){
        if(data[0][i].value != '' ){
            totalProdcutPriceAmount += Number(data[0][i].value);
        }else{
            totalSubmittionAmount += Number(data[1][i].value);
        }
    };
    let Amount = (totalProdcutPriceAmount*45) - totalSubmittionAmount;
    showTotalAmount.innerText=Amount;
}
/*
                Gated Data Calculated!
*/
/**************************************************************/
/*
                Brower Print All Data
*/
showData(date,product_Quantity,submition_Money){
         this.tr=  document.createElement('tr');
         this.icon=  document.createElement('i');
          this.icon.className= product_Quantity ? 'bi bi-cart4' : 'bi bi-cash-stack';
          for(let i=0;i<3;i++){
            this.td= document.createElement('td');
              if(i==0){
                  this.td.appendChild(this.icon);
                  this.td.append(date); 
              }else if(i==1){
                  this.td.append(product_Quantity ? product_Quantity : 'Submition' );
              }else{
                  this.td.append(submition_Money ? submition_Money : product_Quantity*45);
              }
              this.tr.appendChild(this.td);
          }
          this.allDetails.insertBefore(this.tr, this.allDetails.childNodes[0]);
         function domData(){

          }
    };
/*
                Brower Print All Data
*/
/**************************************************************/
};

new app().EventFireStart();



