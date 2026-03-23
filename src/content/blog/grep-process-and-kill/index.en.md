---
title: "Kill All Matching Processes with grep"
description: "One-liner to find and kill all matching processes using ps, grep, awk, and xargs."
date: "2021-10-29T08:57:49.695Z"
tags: ["dev-tools"]
lang: en
translationOf: "grep-process-and-kill"
draft: false
---

```shell
ps aux | grep python | awk '{print $2}' | xargs kill -9

```
Shared by Kim Ji-seong from Naver Boostcamp AI Tech 2nd cohort.

- The pipe ( | ) passes the output of the preceding command to the next.
- `ps aux` retrieves information about all running processes.
- `grep python` filters for lines containing "python".
- `awk '{print $2}'` extracts only the second column, which is the PID.
  - [awk blog](https://reakwon.tistory.com/163)
  - awk can select fields and records.
  - Here it prints the content of the 2nd field.
- `xargs kill -9` kills all the extracted PIDs.
  - [xargs blog](https://jm4488.tistory.com/60)
  - xargs uses piped input as arguments for the given command.
  - The awk output becomes the arguments for kill -9.
