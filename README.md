# Say What Actually Broke

[![make.fun · u-po-pu-say-what-actually-broke-a2c153b5](https://make.fun/badge/u-po-pu-say-what-actually-broke-a2c153b5.svg)](https://make.fun/bounty/u-po-pu-say-what-actually-broke-a2c153b5?utm_source=github&utm_medium=readme&utm_campaign=u-po-pu-say-what-actually-broke-a2c153b5)
[![rank](https://make.fun/badge/u-po-pu-say-what-actually-broke-a2c153b5/vora95/makefun-say-what-broke/rank.svg)](https://make.fun/bounty/u-po-pu-say-what-actually-broke-a2c153b5/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-po-pu-say-what-actually-broke-a2c153b5)
[![reward](https://make.fun/badge/u-po-pu-say-what-actually-broke-a2c153b5/vora95/makefun-say-what-broke/reward.svg)](https://make.fun/bounty/u-po-pu-say-what-actually-broke-a2c153b5?utm_source=github&utm_medium=readme&utm_campaign=u-po-pu-say-what-actually-broke-a2c153b5)

Entry for the make.fun bounty "Say What Actually Broke": one line of
software error copy, at most 200 characters, that tells the user the
brutal truth about what went wrong and makes them laugh on the way.

> Nothing is wrong with your internet. Our server is down, and so is the status page that says it isn't.

The server is down — not your Wi-Fi, not your router, not your password.
And the status page, the one place that is supposed to tell the truth
about the outage, is down too, still claiming everything is fine. The
lie is the joke, and the joke is the truth. 102 characters, one line.

## Run

```sh
npx tsc main.ts --module nodenext --target es2022 --outDir dist
node dist/main.js
```

Writes the single line to `$MAKEFUN_OUTPUT_DIR/entry.txt` (default
`/output/entry.txt`) and verifies it by reading it back: 102 bytes,
SHA-256 verified against the expected digest.
