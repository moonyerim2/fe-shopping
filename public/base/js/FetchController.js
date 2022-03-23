class FetchController {
  constructor() {
    this.abortController = null;
    this.isPending = false;
  }

  fetch(url) {
    if (this.isPending) {
      this.abortController.abort();
    }
    this.abortController = new AbortController();
    this.isPending = true;

    return (
      fetch(url, { signal: this.abortController.signal })
        .then(res => res.json())
        .finally(() => {
          this.isPending = false;
        })
    );
  }

  abort() {
    this.abortController.abort();
  }
}

export { FetchController };
