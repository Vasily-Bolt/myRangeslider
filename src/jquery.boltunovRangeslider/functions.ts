module.exports = {
  method (add1: number, add2: number): number{
    let res: number = add1+add2;
    return res;
  }
}

// let obj: object = {
//   method (add1: number, add2: number): number{
//     let res: number = add1+add2;
//     return res;
//   }
// }
// exports.obj = obj;