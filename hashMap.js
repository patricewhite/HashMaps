class HashMap {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    for (let i = start; i < start + this._capacity; i++) {
      let index = i % this._capacity;
      let slot = this._slots[index];

      if (slot === undefined || slot === key && !slot.deleted) {
        return index;
      }
    }
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._slots[index] === undefined) {
      throw new Error('No Key');
    }
    return this._slots[index].value;
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }
    const index = this._findSlot(key);
    this._slots[index] = {
      key,
      value,
      deleted: false
    };
    this.length++;
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    this.length = 0;
    this._deleted = 0;
    this._slots = [];
    //for a slot in the oldSlots
    for (const slot of oldSlots) {
      //if slot is not undefined or if slot is not deleted
      if (slot !== undefined && !slot.deleted) {
        //set the key and value for that slot
        this.set(slot.key, slot.value);
      }
    }
  }

}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

const hm = new HashMap;

hm.set({
  Hobbit: 'Bilbo'
});
hm.set({
  Hobbit: 'Frodo'
});
hm.set({
  Wizard: 'Gandolf'
});
hm.set({
  Human: 'Aragon'
});
hm.set({
  Elf: 'Legolas'
});
hm.set({
  Maiar: 'The Necromancer'
});
hm.set({
  Maiar: 'Sauron'
});
hm.set({
  RingBearer: 'Gollum'
});
hm.set({
  LadyOfLight: 'Galadriel'
});
hm.set({
  HalfElven: 'Arwen'
});
hm.set({
  ShepherdOfTheTrees: 'Treebeard'
});
console.log(hm);
