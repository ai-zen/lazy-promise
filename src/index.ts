/**
 * LazyPromise class represents a lazy promise that executes its executor function only when `then`, `catch`, or `finally` methods are called.
 */
export default class LazyPromise<T> {
  /**
   * The executor function that is passed to the Promise constructor.
   */
  executor: (
    resolve: (value: T) => void,
    reject: (reason?: any) => void
  ) => void;

  /**
   * The internal Promise instance.
   */
  promise: Promise<T> | null;

  /**
   * Creates a new LazyPromise instance.
   * @param executor The executor function to be called when the promise is initialized.
   */
  constructor(executor: LazyPromise<T>["executor"]) {
    this.executor = executor;
    this.promise = null;
  }

  /**
   * Attaches fulfillment and rejection handlers to the promise. Returns a new promise that follows the promise chain.
   * @param onfulfilled Optional. The callback to be called when the promise is fulfilled.
   * @param onrejected Optional. The callback to be called when the promise is rejected.
   * @returns A new promise that is resolved with the return value of the fulfillment or rejection handler.
   */
  then(
    onfulfilled: ((value: T) => T | PromiseLike<T>) | null | undefined,
    onrejected: ((reason: any) => PromiseLike<never>) | null | undefined
  ) {
    this.initPromise();
    return this.promise?.then(onfulfilled, onrejected);
  }

  /**
   * Attaches a rejection handler to the promise. Returns a new promise that follows the promise chain.
   * @param onrejected Optional. The callback to be called when the promise is rejected.
   * @returns A new promise that is resolved with the return value of the rejection handler.
   */
  catch(onrejected: ((reason: any) => PromiseLike<never>) | null | undefined) {
    this.initPromise();
    return this.promise?.catch(onrejected);
  }

  /**
   * Attaches a handler to the promise when it is settled. Returns a new promise that follows the promise chain.
   * @param onfinally Optional. The callback to be called when the promise is settled.
   * @returns A new promise that is resolved when the callback is finished.
   */
  finally(onfinally: (() => void) | null | undefined) {
    this.initPromise();
    return this.promise?.finally(onfinally);
  }

  /**
   * Initializes the promise if it is not already initialized.
   */
  initPromise() {
    if (!this.promise) {
      this.promise = new Promise<T>(this.executor);
    }
  }
}
