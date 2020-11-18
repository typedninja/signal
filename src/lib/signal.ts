export class Signal implements PromiseLike<void> {
  public raised = true;
  private done = false;
  private promise!: PromiseLike<void>;
  private resolve!: Function;
  private reject!: Function;

  constructor() {
    this.reset();
  }

  public then<TResolved = void, TRejected = never>(
    onResolve?: ((value: void) => TResolved | PromiseLike<TResolved>) | undefined | null,
    onReject?: ((reason: any) => TRejected | PromiseLike<TRejected>) | undefined | null,
  ): PromiseLike<TResolved | TRejected> {
    return this.promise.then(onResolve, onReject);
  }

  public raise(): void {
    if (this.done)
      throw this.error();

    if (! this.raised) {
      this.raised = true;
      this.resolve();
    }
  }

  public reset(): void {
    if (this.done)
      throw this.error();

    if (this.raised) {
      this.raised = false;
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    }
  }

  public destroy(): void {
    this.raised = false;
    this.done = true;

    this.reject(this.error());
  }

  private error(): Error {
    return new Error("Trying to interact with a destroyed signal");
  }
}
