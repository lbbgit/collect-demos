function Hashtable() {  
    this._hashValue= new Object();  
    this._iCount= 0;  
}  
 
Hashtable.prototype.add = function(strKey, value) {  
    if(typeof (strKey) == "string"){  
        this._hashValue[strKey]= typeof (value) != "undefined"? value : null;  
        this._iCount++;  
         return true;  
    }  
    else 
        throw"hash key not allow null!";  
}  
 
Hashtable.prototype.get = function (key) {  
    if (typeof (key)== "string" && this._hashValue[key] != typeof('undefined')) {  
        return this._hashValue[key];  
    }  
    if(typeof (key) == "number")  
        return this._getCellByIndex(key);  
    else 
        throw "hash value not allow null!";  
 
    return null;  
}  
 
Hashtable.prototype.contain = function(key) {  
    return this.get(key) != null;  
}  
 
Hashtable.prototype.findKey = function(iIndex) {  
    if(typeof (iIndex) == "number")  
        return this._getCellByIndex(iIndex, false);  
    else 
        throw "find key parameter must be a number!";  
}  
 
Hashtable.prototype.count = function () {  
    return this._iCount;  
} 
  
Hashtable.prototype._getCellByIndex = function(iIndex, bIsGetValue) {  
    var i = 0;  
    if(bIsGetValue == null) bIsGetValue = true;  
    for(var key in this._hashValue) {  
        if(i == iIndex) {  
            return bIsGetValue ? this._hashValue[key] : key;  
        }  
        i++;  
    }  
    return null;  
}  
 
Hashtable.prototype.remove = function(key) {  
    for(var strKey in this._hashValue) {  
        if(key == strKey) 
        {  
            delete this._hashValue[key];  
            this._iCount--;  
        }  
    }  
}  
 
Hashtable.prototype.clear = function () {  
    for (var key in this._hashValue) {  
        delete this._hashValue[key];  
    }  
    this._iCount = 0;  
}  