class Presenter {
  a: number;

  constructor(){
    this.a = 123;
  }

  getA() {
    console.log(this.a);
  }
}

export {Presenter}