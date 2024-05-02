export interface Student {
  id: number;
  name: string;
  age: number;
  skey?: any;//optional property so, it is not stored in firebase
}
