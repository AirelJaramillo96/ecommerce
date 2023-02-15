const { Observable } = require('rxjs');
const { filter } = require('rxjs/operators');

const doSomething = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Hello World 2');
    }, 3000);
  });
}

const doSomething$ = () => {
  return new Observable((observer) => {
    observer.next('Hello World Observable')
    observer.next('Hello World Observable 2')
    observer.next('Hello World Observable 3')
    observer.next(null)
    setTimeout(() => {
      observer.next('Hello World Observable 4')
    }, 5000);
    setTimeout(() => {
      observer.next(null)
    }, 7000);
    setTimeout(() => {
      observer.next('Hello World Observable 5')
    }, 9000);

  });
}

(async () => {
  const rta = await doSomething();
  console.log(rta);
})();

(() => {
  const obs$ = doSomething$();
  obs$.pipe(filter(value => value !== null)).subscribe((rta) => {
    console.log(rta);
  });
})();
