# @typedninja/signal

> An awaitable/thenable signal

## Install

```
$ yarn add @typedninja/signal

$ npm install --save @typedninja/signal
```

## Usage

Also see the [API documentation](https://typed.ninja/signal/).

```typescript
const signal = new Signal();

signal.raise();

await signal;

signal.reset();

signal.destroy();
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
