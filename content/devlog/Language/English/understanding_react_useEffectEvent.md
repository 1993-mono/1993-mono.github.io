---
title: "Understanding React's useEffectEvent: A Complete Guide to Solving Stale Closures"
date: 2026-07-09
---

# Passage

[Understanding React's useEffectEvent: A Complete Guide to Solving Stale Closures](https://peterkellner.net/2026/01/09/understanding-react-useeffectevent-vs-useeffect/)

[(번역) 리액트의 useEffectEvent 이해하기: 오래된 클로저 해결을 위한 완벽 가이드](https://handhand.tistory.com/entry/understanding-react-useeffectevent)

---

# Vocabulary

## stale / stale closure
**Stale** means no longer fresh, current, or up to date. In React, a **stale closure** appears when a callback still reads values from an older render. The function is still running correctly from JavaScript's point of view, but the data it sees is outdated, which creates subtle bugs.

- **Example**
  > "The interval callback had a stale closure, so it kept logging the initial count."
- **Related expressions**
  - **outdated**: synonym — no longer fresh, current, or up to date
  - **obsolete**: synonym — no longer used or produced
  - **old**: synonym — from an earlier time; not new
  - **fresh**: antonym — newly made or obtained; current
  - **up-to-date**: antonym — including the latest information
  - **current**: antonym — happening or existing now
- **Common collocations**
  - **stale closure**: callback still reads values from an older render
  - **stale state**: component state that a handler no longer reflects
  - **stale data**: cached or fetched data that is no longer current
  - **stale value**: any value in scope that has since been updated

## closure
A **closure** is a function together with the variables it captured from its surrounding scope at creation time. This is a core JavaScript feature and very useful for encapsulation. In UI code, however, the same feature can become tricky when a long-lived callback keeps old state.

- **Example**
  > "This handler is a closure over `roomId` and `isMuted`."
- **Related expressions**
  - **lexical scope**: related — the region of code where a name is visible
  - **captured variables**: related — variables enclosed by a function closure
  - **global state**: contrast — state shared across the entire application
- **Common collocations**
  - **create a closure**: form a function that captures surrounding variables
  - **closure over state**: function that captures component state at creation time
  - **closure scope**: the lexical scope a closure can still access

## TL;DR
**TL;DR** stands for *"Too Long; Didn't Read."* It introduces a short summary for readers who want the key conclusion first. In technical writing, TL;DR usually gives the practical takeaway in one or two sentences.

- **Example**
  > "TL;DR: Use `useEffectEvent` when you need the latest values without retriggering the effect."
- **Related expressions**
  - **summary**: near-synonym — a brief statement of the main points
  - **gist**: near-synonym — the substance or essence of a matter
  - **quick takeaway**: near-synonym — the key conclusion in short form
- **Common collocations**
  - **TL;DR section**: a short summary block placed near the top
  - **TL;DR summary**: the condensed version of a longer explanation
  - **TL;DR version**: a shortened form of the full article or guide

## archived
**Archived** means kept for record or reference, but no longer active in the main workflow. Something archived is not deleted; it is simply moved out of the "current" area. In software tools, archived items are often read-only or less visible.

- **Example**
  > "The old repository is archived, so issues are closed and development is paused."
- **Related expressions**
  - **stored**: synonym — kept in a place for later use
  - **preserved**: synonym — kept in its existing state
  - **retained**: synonym — continued to have or hold
  - **active**: antonym — currently in use or operation
  - **live**: antonym — currently running or available
  - **current**: antonym — belonging to the present time
- **Common collocations**
  - **archived project**: a project kept for reference but no longer maintained
  - **archived issue**: a closed issue kept in the record only
  - **archived document**: a document moved out of the active workflow

## workaround
A **workaround** is an alternative path used to avoid a problem without truly removing its root cause. It is often useful under time pressure, but it can increase complexity if it stays too long. Good teams usually treat workarounds as temporary and revisit them later.

- **Example**
  > "Using `useRef` here is a workaround until we can migrate to `useEffectEvent`."
- **Related expressions**
  - **temporary fix**: near-synonym — a short-term solution to a problem
  - **patch**: near-synonym — a quick fix applied to cover a defect
  - **stopgap**: near-synonym — a temporary substitute until something better exists
  - **root fix**: antonym — a solution that removes the underlying cause
  - **permanent solution**: antonym — a lasting fix rather than a temporary bypass
- **Common collocations**
  - **temporary workaround**: a short-term fix meant to be replaced later
  - **apply a workaround**: use an alternative path to avoid a problem
  - **workaround for a bug**: a non-ideal fix that sidesteps the root cause

## declaration
A **declaration** introduces a name and its role in code, such as a variable, function, or type. It tells both the runtime and the reader, "this thing exists and should be used in this way." Clear declarations improve readability and reduce confusion.

- **Example**
  > "Move the function declaration above the effect for clarity."
- **Related expressions**
  - **definition**: related — the full specification of what something is
  - **statement**: related — a single unit of executable code
  - **initialization**: related — the act of giving a variable its first value
- **Common collocations**
  - **variable declaration**: introducing a named variable and its role
  - **function declaration**: introducing a named function before it is used
  - **type declaration**: introducing a named type in TypeScript or similar systems

## declaration order
**Declaration order** is the sequence in which declarations appear in source code. That order can affect how easily code is understood and, in some cases, how logic behaves. In React hooks code, order is especially important because relationships between hooks are read top-to-bottom.

- **Example**
  > "The declaration order makes it clear that `onMessage` is used inside the effect."
- **Related expressions**
  - **sequence**: synonym — the order in which things follow one another
  - **ordering**: synonym — the arrangement of items in a particular sequence
  - **arrangement**: synonym — the way things are organized or placed
- **Common collocations**
  - **declaration order matters**: the sequence affects readability or behavior
  - **preserve declaration order**: keep declarations in a stable, intentional sequence
  - **declaration order in hooks**: the top-to-bottom order of hook-related declarations

## explicitly
To do something **explicitly** is to say it directly instead of implying it. In code, this means writing intent in a visible way so humans and tools do not need to guess. Explicit code usually improves maintainability because assumptions are reduced.

- **Example**
  > "Add `roomId` explicitly to the dependency array."
- **Related expressions**
  - **clearly**: synonym — in a way that is easy to see or understand
  - **directly**: synonym — without anything in between
  - **plainly**: synonym — in a simple and direct way
  - **implicitly**: antonym — in a way that is suggested but not stated
  - **indirectly**: antonym — not in a direct way
- **Common collocations**
  - **explicitly state**: say something directly instead of leaving it implied
  - **explicitly pass**: pass a value or argument in a visible, intentional way
  - **explicitly declare**: write a declaration so intent is obvious in code

## guarantee
To **guarantee** means to provide a strong promise that a behavior will hold under stated conditions. Documentation uses this word carefully, because guarantees define what developers can safely depend on. If something is not guaranteed, relying on it is risky.

- **Example**
  > "React does not guarantee the same timing in every rendering scenario."
- **Related expressions**
  - **ensure**: near-synonym — to make certain that something happens
  - **promise**: near-synonym — to assure that something will happen
  - **assure**: near-synonym — to tell someone confidently that something is true
  - **risk**: contrast — the possibility of something going wrong
  - **uncertainty**: contrast — lack of certainty about an outcome
  - **undefined behavior**: contrast — behavior not specified by a contract
- **Common collocations**
  - **guarantee behavior**: promise that a behavior will hold under stated conditions
  - **guarantee order**: promise that execution order will remain stable
  - **no guarantee**: a warning that behavior cannot be safely depended on

## here's the catch
**Here's the catch** is a phrase used when introducing a hidden condition, cost, or limitation. It often comes after an idea that first sounds simple or attractive. In technical explanations, this phrase signals an important trade-off.

- **Example**
  > "Here's the catch: adding `isMuted` to dependencies will reconnect the socket."
- **Related expressions**
  - **the downside is**: related phrase — introduces a disadvantage
  - **the catch is**: related phrase — points to the hidden limitation
  - **however**: discourse marker — signals a contrast or exception
- **Common collocations**
  - **here's the catch**: introduces a hidden limitation after a simple-sounding idea
  - **that's the catch**: points to the key limitation just explained
  - **but here's the catch**: contrasts an attractive idea with its hidden cost

## precise
**Precise** means exact in detail and clearly bounded in meaning. A precise explanation avoids ambiguity, and a precise API contract limits misinterpretation. Precision does not just mean "correct"; it means "correct in a carefully defined way."

- **Example**
  > "Use precise wording when describing effect timing."
- **Related expressions**
  - **exact**: near-synonym — completely accurate or correct
  - **accurate**: near-synonym — correct in all details
  - **specific**: near-synonym — clearly defined or identified
  - **vague**: antonym — not clearly expressed or defined
  - **loose**: antonym — not strict or exact
  - **ambiguous**: antonym — open to more than one interpretation
- **Common collocations**
  - **precise definition**: a definition with clearly bounded meaning
  - **precise control**: control with clearly defined limits and behavior
  - **precise timing**: timing described without ambiguity

## ordering
**Ordering** focuses on how elements are arranged relative to each other, not only the final sequence itself. It often implies rules such as "A must happen before B." In engineering discussions, ordering matters when timing and dependencies affect correctness.

- **Example**
  > "Hook ordering must stay stable across renders."
- **Related expressions**
  - **arrangement**: synonym — the way things are organized or placed
  - **sequencing**: synonym — arranging in a particular order
  - **order**: synonym — the sequence in which things occur
- **Common collocations**
  - **execution ordering**: the sequence in which operations run
  - **hook ordering**: the required stable order of hooks in a component
  - **strict ordering**: a rule that one step must happen before another

## concurrent / concurrently
**Concurrent** work overlaps in time. Tasks may interleave, pause, and resume without fully waiting for one another. In modern UI frameworks, concurrency is usually about scheduling and responsiveness rather than literal hardware-level parallel execution.

- **Example**
  > "Concurrent rendering can pause and resume work to keep the UI responsive."
- **Related expressions**
  - **overlapping**: near-synonym — occurring partly at the same time
  - **interleaved**: near-synonym — alternating or woven together in time
  - **sequential**: antonym — following one after another in order
  - **synchronous-only**: antonym — operating without overlap or deferral
- **Common collocations**
  - **concurrent rendering**: rendering work that can pause and resume
  - **concurrent updates**: multiple updates overlapping in time
  - **run concurrently**: execute in an overlapping or interleaved way

## boundaries
**Boundaries** are conceptual limits between components, responsibilities, or lifecycles. Good boundaries keep side effects contained and make systems easier to reason about. Weak boundaries often cause hidden coupling and harder debugging.

- **Example**
  > "Keep clear boundaries between reactive logic and effect-only logic."
- **Related expressions**
  - **limits**: synonym — points beyond which something does not extend
  - **borders**: synonym — edges that separate one area from another
  - **separation lines**: synonym — conceptual dividers between concerns
- **Common collocations**
  - **component boundaries**: limits between what one component owns
  - **system boundaries**: limits between subsystems or responsibilities
  - **boundary between A and B**: a conceptual line separating two concerns

## contract
A **contract** is an agreed behavioral promise between a caller and a system: valid inputs, expected outputs, and required usage rules. Even if code compiles, violating the contract can still produce broken behavior. Contracts are the foundation of reliable APIs.

- **Example**
  > "Calling this API outside an effect breaks its contract."
- **Related expressions**
  - **agreement**: related — a mutual understanding of expected behavior
  - **specification**: related — a detailed description of requirements
  - **guarantee**: related — a promise that certain behavior will hold
  - **violation**: contrast in usage — breaking the agreed rules
  - **breach**: contrast in usage — failure to honor an agreement
- **Common collocations**
  - **API contract**: the agreed rules for using an API correctly
  - **contract violation**: using an API in a way that breaks its rules
  - **honor the contract**: follow the agreed usage rules

## scheduled
If work is **scheduled**, it is planned or queued to run later rather than executed immediately. Scheduling helps systems balance responsiveness, priority, and workload. In rendering systems, scheduling is central to smooth user experience.

- **Example**
  > "The update was scheduled after the current event loop tick."
- **Related expressions**
  - **queued**: near-synonym — placed in a line to be processed later
  - **planned**: near-synonym — arranged to happen at a future time
  - **deferred**: near-synonym — postponed to a later time
  - **immediate**: antonym — happening at once without delay
  - **instant**: antonym — occurring immediately
- **Common collocations**
  - **scheduled update**: an update queued to run later
  - **scheduled task**: work planned for future execution
  - **be scheduled to run**: be queued to execute at a later point

## synchronously
**Synchronously** means step-by-step execution where each step finishes before the next begins. This model is straightforward to reason about, but it can block progress if one step is slow. It trades flexibility for predictability.

- **Example**
  > "`useLayoutEffect` runs synchronously before paint."
- **Related expressions**
  - **in sequence**: near-synonym — one after another in order
  - **blocking**: near-synonym — preventing other work until finished
  - **step-by-step**: near-synonym — proceeding one stage at a time
  - **asynchronously**: antonym — without waiting for each step to finish
  - **non-blocking**: antonym — allowing other work to continue
- **Common collocations**
  - **run synchronously**: execute step by step without deferring
  - **execute synchronously**: complete each step before the next begins
  - **synchronous operation**: an operation that blocks until it finishes

## implementation
An **implementation** is the concrete internal mechanism that realizes an idea, interface, or API. Two systems can expose similar behavior while using very different implementations underneath. Understanding this distinction helps separate public usage from internal details.

- **Example**
  > "This is an implementation detail, not part of the public API contract."
- **Related expressions**
  - **realization**: synonym — the act of making something concrete
  - **internal design**: synonym — the structure beneath the public surface
  - **underlying mechanism**: synonym — the hidden process that makes something work
- **Common collocations**
  - **implementation detail**: an internal mechanism not meant for public reliance
  - **reference implementation**: a canonical example of how something is built
  - **implementation strategy**: the chosen approach for building something internally

## downsides
**Downsides** are disadvantages, costs, or risks that come with a choice. Mature technical decisions consider both benefits and downsides together. Ignoring downsides often leads to short-term wins and long-term pain.

- **Example**
  > "One downside of this pattern is repeated setup and teardown."
- **Related expressions**
  - **drawbacks**: synonym — features that make something less acceptable
  - **disadvantages**: synonym — unfavorable conditions or consequences
  - **cons**: synonym — negative aspects of a choice
  - **benefits**: antonym — advantages gained from a choice
  - **upsides**: antonym — positive aspects of a choice
  - **pros**: antonym — arguments in favor of a choice
- **Common collocations**
  - **potential downsides**: possible costs or risks to consider
  - **major downside**: a significant disadvantage of a choice
  - **weigh the downsides**: compare disadvantages against benefits

## declaration (revisited)
This term appears again because it is central to React examples. Declarations are not only syntax markers; they define where values come from and what later logic can safely reference. In hook-based code, declaration clarity directly supports correctness.

- **Example**
  > "A clear declaration makes dependencies easier to reason about."
- **Related expressions**
  - **declaration style**: related — the way declarations are written in code
  - **declaration clarity**: related — how easy declarations are to understand
- **Common collocations**
  - **clear declaration**: a declaration that makes intent easy to follow
  - **declaration placement**: where a declaration appears in the code
  - **declaration scope**: the scope in which a declaration is visible

## exact
**Exact** means perfectly matching, with no approximation. It is often used for identity-level sameness, such as "the exact same value" or "the exact condition." Compared with "precise," exactness emphasizes full match rather than detailed clarity.

- **Example**
  > "This callback uses the exact same reference across memoized renders."
- **Related expressions**
  - **identical**: near-synonym — exactly the same in every way
  - **precise**: near-synonym — exact in detail (context-dependent)
  - **accurate**: near-synonym — correct in all respects
  - **approximate**: antonym — close to but not exactly correct
  - **rough**: antonym — not exact or detailed
  - **inexact**: antonym — not perfectly accurate
- **Common collocations**
  - **exact match**: a perfect match with no difference
  - **exact same**: identical in every relevant way
  - **exact value**: the precise value with no approximation

## footguns
**Footguns** are features that are valid and available, but easy to misuse in ways that hurt the person using them. They often look convenient at first and fail later under edge cases. The best APIs try to reduce footguns by making safe usage the default.

- **Example**
  > "Manual dependency management can become a footgun in large components."
- **Related expressions**
  - **pitfall**: near-synonym — a hidden danger or difficulty
  - **gotcha**: near-synonym — an unexpected trap in usage
  - **trap**: near-synonym — something that catches people by surprise
- **Common collocations**
  - **common footgun**: a frequent way developers accidentally hurt themselves
  - **avoid footguns**: design or code in a way that reduces misuse risk
  - **API footgun**: an API that is easy to misuse despite being valid

## passage
A **passage** is a piece of text meant to be read, studied, or interpreted. In language learning, it usually means a reading selection rather than a single word or sentence. In this document, **Passage** names the source article you are studying, while **Vocabulary** collects terms from that article.

- **Example**
  > "Read the passage first, then check unfamiliar words in the vocabulary section."
- **Related expressions**
  - **reading passage**: near-synonym — a text selected for reading practice
  - **excerpt**: near-synonym — a short extract from a longer work
  - **text**: near-synonym — a written work or passage
  - **passage of time**: different sense — the progression of time, not a reading text
- **Common collocations**
  - **reading passage**: a passage used in reading comprehension
  - **passage from**: an extracted portion of a longer text
  - **source passage**: the original text being studied or translated

## bottom line
**Bottom line** is the final, most important conclusion after a longer explanation. It comes from accounting, where the "bottom line" of a financial statement shows net profit. In everyday and technical writing, it signals "here is what actually matters."

- **Example**
  > "Bottom line: use `useEffectEvent` when you need the latest values without retriggering the effect."
- **Related expressions**
  - **in short**: near-synonym — briefly stated
  - **to sum up**: near-synonym — to give a brief summary
  - **the takeaway**: near-synonym — the key lesson or conclusion
  - **TL;DR**: near-synonym — a very short summary (more casual)
- **Common collocations**
  - **bottom line is**: introduces the core conclusion
  - **the bottom line**: the most important point to remember
  - **bottom line:**: used as a label before a one-line conclusion

## under the hood
**Under the hood** describes what happens internally, beneath the visible surface of a system. The phrase comes from cars: the engine sits under the hood, while the driver only sees the controls. In software writing, it contrasts public usage with internal implementation or runtime behavior.

- **Example**
  > "Under the hood, `useEffectEvent` keeps a stable reference while still reading the latest values."
- **Related expressions**
  - **behind the scenes**: near-synonym — happening out of view
  - **internally**: near-synonym — inside the system or process
  - **at a lower level**: related — at the implementation or runtime layer
  - **on the surface**: contrast — what is visible or obvious from the API
- **Common collocations**
  - **under the hood**: describes internal behavior beneath the public interface
  - **look under the hood**: examine how something works internally
  - **what happens under the hood**: the hidden mechanism behind visible behavior

## caveats
A **caveat** is a warning, condition, or limitation that readers should keep in mind. The word comes from Latin meaning "let him beware." In technical writing, **caveats** usually introduce restrictions, edge cases, or important conditions after a generally positive explanation.

- **Example**
  > "Caveats: this hook must be declared before the effect that uses it."
- **Related expressions**
  - **warning**: near-synonym — a stronger alert about risk or danger
  - **limitation**: near-synonym — a boundary on what something can do
  - **catch**: near-synonym — a hidden drawback or trap
  - **note**: near-synonym — a lighter remark or reminder
- **Common collocations**
  - **important caveats**: significant conditions readers should not miss
  - **with the caveat that**: introduces a condition attached to a claim
  - **caveats and limitations**: a section listing restrictions and boundaries

## enforce
To **enforce** means to make a rule, constraint, or policy actually apply in practice, not just state it in theory. In software writing, enforcement often happens through runtime checks, linters, type systems, or APIs that reject invalid usage.

- **Example**
  > "React enforces the Rules of Hooks, so invalid hook calls fail at runtime."
- **Related expressions**
  - **apply**: near-synonym — to put a rule or policy into effect
  - **impose**: near-synonym — to force a rule or restriction on someone
  - **require**: related — to make something necessary
  - **ensure**: contrast — to make an outcome happen, without necessarily punishing violations
  - **suggest**: contrast — to recommend without forcing compliance
- **Common collocations**
  - **enforce a rule**: make a rule actually apply
  - **enforce constraints**: apply limits so they cannot be ignored
  - **enforce order**: require a specific sequence to be followed

## suppress
To **suppress** means to prevent something from appearing, spreading, or taking effect. In software writing, it often describes hiding warnings, blocking output, or stopping a reaction from surfacing, rather than removing the underlying cause.

- **Example**
  > "We suppressed the lint warning with a comment for this line."
- **Related expressions**
  - **hide**: near-synonym — to keep something out of view
  - **block**: near-synonym — to stop something from passing through
  - **disable**: related — to turn a feature off entirely
  - **ignore**: contrast — to pay no attention without actively stopping output
  - **remove**: contrast — to eliminate the source itself
- **Common collocations**
  - **suppress a warning**: prevent a warning from being shown
  - **suppress an error**: stop an error from surfacing
  - **suppress output**: prevent output from appearing

---

# Grammar

## Source sentence

> So when a subscription calls the onMessage it captured on render 1, it still reads the current callback with current values.

**Meaning:** Even when a subscription calls the `onMessage` captured during render 1, `useEffectEvent` still reads the latest callback with the latest values.

## Sentence structure

```
So [when-clause], [main clause]
```

| Part | Role |
|------|------|
| **So** | discourse marker — connects this sentence to the previous explanation |
| **when a subscription calls ...** | adverbial clause of time — "when ~ happens" |
| **it still reads ...** | main clause — states what still happens |

## When-clause breakdown

**when a subscription calls the onMessage (that) it captured on render 1**

```
when
  a subscription              ← subject
  calls                       ← verb
  the onMessage               ← object
    (that) it captured on render 1   ← relative clause modifying onMessage
```

### the onMessage (that) it captured on render 1

This is an **object relative clause** with **that** omitted.

Expanded form:

> the onMessage **that** it captured on render 1

Underlying sentence:

> it captured **the onMessage** on render 1

- **it** = the subscription (or the effect closure)
- **captured** = verb
- **the onMessage** = object → relative pronoun position
- **on render 1** = at the time of the first render

## Main clause breakdown

**it still reads the current callback with current values**

| Element | Meaning |
|---------|---------|
| **it** | `useEffectEvent` (or its stable reference mechanism) |
| **still** | even so; contrary to expectation |
| **reads** | accesses / refers to internally |
| **the current callback** | the latest version of the callback |
| **with current values** | carrying the latest values (prepositional phrase modifying callback) |

## Key grammar points

1. **So** — introduces a result or follow-up conclusion.
2. **when-clause** — sets the timing or condition.
3. **Omitted that** — common in object relative clauses.
4. **capture** — in closure contexts, "to hold onto a value or function from a specific render."
5. **on render 1** — "during / at the time of render 1."
6. **still** — emphasizes that the outcome does not change even under the condition above.
7. **with current values** — prepositional phrase describing the callback.

## Why this contrast matters (React context)

A normal effect callback may read **stale values** from an older render. `useEffectEvent` keeps a **stable reference**, so even if the subscription still calls the `onMessage` captured on render 1, execution still sees the **current callback with current values**.

---

## Relative clauses

A **relative clause** modifies a noun (the **antecedent**) and is introduced by a relative pronoun such as **who**, **which**, **that**, or **whose**.

Relative clauses are classified by the role the relative pronoun plays inside the clause.

### Subject relative clause

The relative pronoun is the **subject** of the clause.

> the developer **who wrote this hook**

Expanded:

> the developer = subject, who wrote this hook

- **who / which / that** is usually **not omitted**
- Example: The callback **that runs on every message** is stable.

### Object relative clause

The relative pronoun is the **object** of the clause.

> the onMessage **(that) it captured on render 1**

Expanded:

> it captured **the onMessage** on render 1

- **that / which / whom** is often **omitted**, especially **that**
- If the clause already has a subject (`it`), the relative pronoun is likely an object

### Possessive relative clause

The relative pronoun shows **possession**.

> the component **whose state is stale**

Expanded:

> the component's state is stale

- **whose** is followed by a noun: **whose state**, **whose values**
- For things, formal style may use **of which**: the API, **the behavior of which** is tricky

## Relative clause comparison

| Type | Pronoun role | Omission | Example |
|------|--------------|----------|---------|
| **Subject** | subject | rarely omitted | the dev **who built it** |
| **Object** | object | often omitted | the hook **(that) I use** |
| **Possessive** | possession | not omitted | the file **whose name is long** |

## How to identify the type

Turn the relative clause into a standalone sentence:

- **Subject:** That **runs** on every message. → subject relative clause
- **Object:** The subscription calls **that**. → object relative clause
- **Possessive:** **Its** state is stale. → possessive relative clause

## Relative clauses are adjective clauses

A relative clause is a type of **adjective clause** because it **modifies a noun**.

- **Adjective:** a **red** car
- **Adjective clause:** a car **that is red**

| Clause type | Function | Example |
|-------------|----------|---------|
| **Noun clause** | acts as a noun | I know **that he left**. |
| **Adverb clause** | acts as an adverb | I left **when he called**. |
| **Adjective clause** | modifies a noun | The hook **that we use** is stable. |

A relative clause modifies a noun from **after** the noun, so it is also called a **relative adjective clause**.

### that-clause vs relative that

Do not confuse these two uses of **that**:

| | Function | Example |
|---|----------|---------|
| **Relative that (adjective clause)** | modifies a noun | The fact **that he left** surprised me. |
| **That-clause (noun clause)** | acts as a noun | I know **that he left**. |

If **that** modifies a preceding noun, it is a relative pronoun (adjective clause). If **that** fills a noun position in the larger sentence, it is a noun clause.

## Examples from this topic

| Fragment | Type | Expanded |
|----------|------|----------|
| the callback **that runs on mount** | subject | The callback runs on mount. |
| the values **(that) the effect reads** | object | The effect reads the values. |
| the hook **whose API is stable** | possessive | The hook's API is stable. |
| the onMessage **it captured on render 1** | object (that omitted) | It captured the onMessage on render 1. |
