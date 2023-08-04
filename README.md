# Webux Flow

Having fun experimenting and prototyping a workflow system using javascript.  
I always wanted to build a system like that.
It can be used with native bash command, custom javascript functions, and few helpers commands to speed up and manage so complexity.

I have a bunch of ideas to test and try... I do not have any target tho.

# Goal

We have 3 things, **input**, **output** and **processing**.

A workflow takes **inputs** (From the initial state or the context that will be mutated by other actions), define **one output**, and **process the inputs** using the step defined.
Then the output is saved in the global context and the value is available for other steps, this way it is possible to control the I/O flow of a program.

# Usage

1. Create a program
2. Define the workflow in JSON Format
3. Execute the Program.

# Support

Far from being tested, (There is 3 `test_X.js` files...)  
The naming of things must be completely reviewed as well !

**Supported Steps:**

- print (console print)
- command (CLI such as Bash)
- condition (Simple condition system)
- wait (setTimeout async)
- loop (for loop only)
- parallel (Promise.all)
- function (async and sync, retries, error handling)

**JSON Format:**

```json
{ "name": "", "metadata": {}, "initialState": {}, "states": {} }
```

**Step Format:**

TODO..

---

# Todos

- A bunch of stuff ..
