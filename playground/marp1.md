---
marp: true
theme: uncover
class: invert
---

# Hello world!
```typescript
useEffect(() => {
  if (isPlaying) {
    let intervalId = setInterval(function () {
      onNeedReport()
    }, 1000);
    return () => {
      clearInterval(intervalId)
    }
  }
}, [isPlaying,])
```
---

# Magica to Madoka
Yuri 4 ever
$y=x+1$

