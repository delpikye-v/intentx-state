# 🧭 intentx-state-z

[![NPM](https://img.shields.io/npm/v/intentx-state-z.svg)](https://www.npmjs.com/package/intentx-state-z) ![Downloads](https://img.shields.io/npm/dt/intentx-state-z.svg)

<a href="https://codesandbox.io/p/sandbox/wch692" target="_blank">LIVE EXAMPLE</a>

---

**intentx-state-z** is a headless reactive state runtime for building deterministic, intent-driven logic outside the UI.

Fine-grained. Async-first. Framework-agnostic.

> UI renders. Logic lives elsewhere.

---

## ✨ Why intentx-state-z?

- Predictable state & effects  
- Fine-grained reactivity  
- Async-first primitives  
- Priority scheduling  
- Deterministic transactions  
- Framework-agnostic (Node, workers, backend, tests)  
- No reducers. No proxies. No magic.  

---

## 🧠 Mental Model

**intentx-state-z** is built on a small set of composable primitives.

> a fine-grained reactive graph, an intent-driven orchestration layer

---

#### State

- **Atom** – smallest reactive unit  
- **Computed** – cached derived value  
- **AsyncAtom** – async state with explicit loading control  
- **AsyncComputed** – async derived state  

---

#### Reactivity

- **Effect** – reactive side-effect runner  
- **Watch** – low-level subscription control  

---

#### Control

- **Transaction** – batched updates  
- **Scheduler** – priority-based execution  

---

#### Architecture

- **Store** – intent-driven state container  
- **FactoryAtom** – dynamic atom generator  

---

Together they form a deterministic, headless state runtime  
where logic is explicit and the UI stays separate.

---

## 📦 Installation

```bash
npm install intentx-state-z
```

---

## ⚡ Quick Start

```ts
import { atom, computed, effect } from "intentx-state-z"

const count = atom(0)
const double = computed(() => count() * 2)

const isEven = computed(() => count() % 2 === 0)

count.set(5)

console.log(count())  // 5
console.log(double()) // 10

effect(() => {
  if (isEven()) {
    console.log("Even:", count())
  }
})
```

✔ Lazy  
✔ Cached  
✔ Fine-grained  

---

## 🔹 Core Usage

#### Atom

```ts
import { atom } from "intentx-state-z"

const count = atom(0)

count.set(10)

console.log(count()) // 10
```

###### Functional update

```ts
count.set(prev => prev + 1)
```

---

#### Computed

```ts
import { atom, computed } from "intentx-state-z"

const price = atom(10)
const qty = atom(2)

const total = computed(() => price() * qty())

console.log(total()) // 20
```

- Tracks dependencies automatically
- Recomputes only when needed
- Cached until invalidated

---

#### Effect

```ts
import { atom, effect } from "intentx-state-z"

const count = atom(0)

const dispose = effect(() => {
  console.log("Count:", count())
})

count.set(1)
// logs: Count: 1

dispose()
```

Effects:
- Auto-track dependencies
- Re-run on change
- Disposable

---

## 🔹 Async State

#### AsyncAtom

```ts
import { asyncAtom } from "intentx-state-z"

const user = asyncAtom(async () => {
  const res = await fetch("/api/user")
  return res.json()
})
```

###### Load manually

```ts
await user.load()
```

###### Read value

```ts
const value = user()
```

If not loaded:
- May throw
- Or defer (depending on integration)

---

#### Invalidate

```ts
user.invalidate()
user.invalidate("low")
user.invalidate("high")
```

Priority levels:

- `"high"`
- `"normal"` (default)
- `"low"`

---

#### AsyncComputed

```ts
import { asyncComputed, atom } from "intentx-state-z"

const count = atom(2)

const doubleAsync = asyncComputed(async () => {
  await new Promise(r => setTimeout(r, 50))
  return count() * 2
})

const value = await doubleAsync()
```

---

## 🔹 Transactions

Batch updates safely:

```ts
import { atom, transaction } from "intentx-state-z"

const a = atom(1)
const b = atom(2)

transaction(() => {
  a.set(10)
  b.set(20)
})

console.log(a(), b()) // 10 20
```

Prevents intermediate recomputation.

---

## 🔹 Scheduler

`intentx-state-z` includes a priority-based scheduler.

Use cases:

- Defer background refetch
- Prioritize user input
- Control async orchestration
- Reduce UI jank in integrations

```ts
user.invalidate("low")
user.invalidate("high")
```

---

## 🔹 Store (Intent-driven Logic Layer)

Create structured domain logic.

```ts
import { createStore } from "intentx-state-z"

type State = {
  saving: boolean
  value: string
}

const store = createStore<State>({
  saving: false,
  value: ""
})
```

---

#### Register Intent

```ts
store.on("SAVE", async ({ state, setState }) => {
  setState(s => { s.saving = true })

  await fakeApiSave(state().value)

  setState(s => { s.saving = false })
})
```

---

#### Emit Intent

```ts
await store.emit("SAVE")
```

---

#### Store API

```ts
store.state()
store.setState(fn)
store.on(type, handler)
store.emit(type)
```

---

## 🔹 Watch

Low-level reactive listener.

```ts
import { watch, atom } from "intentx-state-z"

const count = atom(0)

const stop = watch(
  () => count(),
  value => {
    console.log("Changed:", value)
  }
)

count.set(5)

stop()
```

---

## 🔹 Factory Atom

Create reusable atom instances.

```ts
import { factoryAtom, atom } from "intentx-state-z"

const createCounter = factoryAtom((initial: number) =>
  atom(initial)
)

const counterA = createCounter(1)
const counterB = createCounter(10)
```

---

## 🔹 Shared Intent Bus (Advanced)

Cross-store orchestration using a shared intent bus.

The `SharedIntentBus` allows multiple stores (with different scopes) to react to the same intent while keeping their state isolated.

---

#### 🧠 When to use Shared Bus?

Use it when you need:

- Cross-module communication
- Coordinated state updates
- Async side effects shared across stores
- Event-driven architecture

---

#### 1️⃣ Create a Shared Bus

```ts
type AppState = {
  user?: string
  loading: boolean
  data?: unknown
}

const appBus = createSharedIntentBus<AppState>()
```

Each store that uses this bus must have its **own unique scope**.

---

#### 2️⃣ Create Stores Using the Shared Bus

```ts
const authStore = createStore(
  { user: undefined, loading: false },
  { bus: appBus }
)

const dataStore = createStore(
  { data: undefined, loading: false },
  { bus: appBus }
)
```

Each store registers itself into the shared bus using its scope identity.

---

#### 3️⃣ Register an Intent Handler

Intent handlers can be synchronous or asynchronous.

```ts
appBus.on("LOGIN", async (ctx) => {
  // start loading
  ctx.setState((s) => {
    s.loading = true
  })

  await fakeApiLogin(ctx.payload.username, {
    signal: ctx.signal,
  })

  // update state after success
  ctx.setState((s) => {
    s.user = ctx.payload.username
    s.loading = false
  })
})
```

###### Notes

- `ctx.state` always reflects the current state
- `ctx.setState()` mutates state synchronously
- Async logic is allowed inside intent handlers
- `ctx.signal` supports cancellation

---

#### 4️⃣ Emit an Intent

You can emit from a store or directly from the bus.

```ts
await authStore.emit("LOGIN", {
  username: "alice",
})
```

Or:

```ts
await appBus.emit("LOGIN", {
  username: "alice",
})
```

Each store handles the intent independently within its own state scope.

---

#### 5️⃣ Abort-Safe Async Operations

Each intent context includes an `AbortSignal`.

```ts
appBus.on("FETCH_DATA", async (ctx) => {
  const res = await fetch("/api/data", {
    signal: ctx.signal,
  })

  const data = await res.json()

  ctx.setState((s) => {
    s.data = data
  })
})
```

If a scope is disposed (or manually aborted),  
`ctx.signal` will be triggered automatically.

---

#### 🧭 Async Boundary

`emit()` represents the async boundary of the domain layer.

Always `await` it to preserve deterministic flow.

---

#### 🧬 Recommended Architecture Pattern

For predictable state updates, consider splitting async work and state mutation:

```ts
appBus.on("LOAD_USER", async (ctx) => {
  const user = await fetchUser(ctx.payload.id)
  await ctx.emit("USER_LOADED", user)
})

appBus.on("USER_LOADED", (ctx) => {
  ctx.setState((s) => {
    s.user = ctx.payload
  })
})
```

This keeps:

- Async side-effects in one intent
- State mutation deterministic in another

---

#### ⚠️ Important Rules

- Each store must have a **unique scope**
- Shared bus uses scope identity internally
- State mutation is synchronous
- Always `await` async intents
- Avoid mutating state outside `setState()`

---

## 🧩 Architecture Pattern

Keep logic isolated from UI:

```ts
import { asyncAtom, computed } from "intentx-state-z"

export function createUserLogic(fetchUser: () => Promise<any>) {
  const user = asyncAtom(fetchUser)

  const name = computed(() =>
    user()?.name ?? "Guest"
  )

  return {
    user,
    name,
    reload: () => user.invalidate()
  }
}
```

Works in:

- Node
- Workers
- CLI tools
- Any UI framework adapter
- Unit tests

---

## 🔍 Comparison

| Criteria                    | intentx-state-z | Redux Toolkit | Zustand | Jotai | MobX |
|-----------------------------|-----------------|---------------|---------|-------|------|
| Fine-grained reactivity     | ✅               | ❌            | ⚠️      | ✅    | ✅   |
| Built-in async primitives   | ✅               | ⚠️            | ❌      | ⚠️    | ❌   |
| Scheduler support           | ✅               | ❌            | ❌      | ❌    | ❌   |
| Headless core               | ✅               | ✅            | ⚠️      | ⚠️    | ✅   |
| Reducer boilerplate         | ❌               | ✅            | ❌      | ❌    | ❌   |
| Proxy magic                 | ❌               | ❌            | ❌      | ❌    | ✅   |

---

## 🚀 What Makes It Different?

Unlike traditional state managers:

- No reducers
- No proxy-based magic
- No hidden batching
- Deterministic async graph
- Explicit orchestration layer

**intentx-state-z** is not a UI store. It is a reactive runtime for domain logic.

---

## 🚫 Anti-patterns

- Business logic inside UI
- Mutating state outside setState
- Using effect for pure derivation
- Skipping computed for derived values

---

## 🧠 Philosophy

- Logic lives outside UI
- Deterministic state
- Explicit effects
- Fine-grained dependency graph
- Async as first-class primitive
- Scheduling control
- Testable architecture

---

## 📜 License

MIT