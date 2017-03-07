

//объявляем объект списка; в нем 3 поля firs- ссылка на первый объект очереди, index - длина очереди, nextObj - ссылка на того, кто впереди 

let List = {
   first: null,
   index: 0, 
    nextObj:  null,
    previousObj: null, 

    getIndex: function(){
        return this.index;  
    },
    setIndex: function(n){
        this.index = n; 
    }
} 
 
//метод для добавления в список
List.add = function (smth) {
    let objCurrent = new Object(); 

    objCurrent.value = smth; 
 
    //конструктор первого объекта
    if(List.index == 0){
        List.first = objCurrent; 
            
        objCurrent.index = List.getIndex()+1;
        List.setIndex(objCurrent.index); 

        List.nextObj = objCurrent; 
        objCurrent.previousObj = objCurrent; 
        List.previousObj = objCurrent; 
       
    }else{

        //присваиваем необходимые свойства во второй и последующие объекты
        objCurrent.index = List.getIndex()+1;
        List.setIndex(objCurrent.index); 

        objCurrent.nextObj = List.nextObj; 
        List.nextObj = objCurrent; 


        //создаем двойную связь 
        List.previousObj.previousObj = objCurrent;
        List.previousObj = objCurrent; 

    } 
}

//поиск элемента по номеру в очереди

List.search = function(n){
    objCurrent = List.first; 
         
    if(n>List.index|| n<0){
        return "Такого значения нет в очереди";
    }else{
        do{       
           if(objCurrent.index == n){
                return objCurrent.value; 
                break; 
            } 
            objCurrent = objCurrent.previousObj; 
        }
        while(List.index >= objCurrent.index); 
    }
};


//удалить n-ный элемент в очереди
List.delete = function(n){
       
    if(n == List.index){
        List.previousObj.previousObj = null; 
        List.setIndex(n-1)
    }
    else if(n == 1){
        List.first.previousObj = List.first;
        changeIndex(n); 

    }else if(n>0 && n<=List.index){
        let right = List.specialSearch(n-1); 
        let left = List.specialSearch(n+1);
        left.nextObj = right; 
        right.previousObj = left; 
        changeIndex(n); 
           
    }
}

//функция specialSearch в отличие от search возвращает сам объект (по его номеру), а не его поле value
List.specialSearch = function(n){
    objCurrent = List.first; 
         
    if(n>List.index|| n<0){
        return "Такого значения нет в очереди";
    }else{
         do{    
            if(objCurrent.index == n){
                return objCurrent; 
                break; 
            } 
            objCurrent = objCurrent.previousObj; 
        }
        while(List.index >= objCurrent.index); 
    }
};

//функция вызывается после удаления элемента из списка и проходит по оставшимся элементам и обновляет их индексы; например после удаления 2-го элемента индекс 3-го элемента должен стать вторым
function changeIndex(n){
    do{
        objCurrent.index = objCurrent.index-1; 
        objCurrent = objCurrent.previousObj;
    }
    while(objCurrent != undefined)      
    List.index = List.index-1;  
}