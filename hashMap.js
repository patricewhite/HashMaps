class HashMap {
    constructor(initialCapacity=8){
        this.length = 0;
        this._slots=[];
        this._capacity=initialCapacity;
        this._deleted=0;
    }

    static _hashString(string){
       let hash= 5381;

       for (let i=0; i<string.length; i++){
           hash=(hash<<5)+hash+string.charCodeAt(i);
           hash = hash & hash;
       }
        return hash >>>0;
    }

    findSlot(key){
        const hash=HashMap._hashString(key);
        const start=hash% this._capacity;

        for (let i=start;i<start+this._capacity;i++){
            let index=i%this._capacity;
            let slot=this._slots[index];

            if(slot=== undefined || slot==key && !slot.deleted){
                return index;
            }
        }
    }
}

HashMap.MAX_LOAD_RATIO=0.9;
HashMap.SIZE_RATIO=3;

