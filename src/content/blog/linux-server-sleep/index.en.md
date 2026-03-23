---
title: "Linux Server Sleep"
description: "Troubleshooting and fixing unexpected auto-sleep shutdowns on a Linux server by disabling systemd sleep targets."
date: "2021-10-03T21:06:55.212Z"
tags: ["dev-tools"]
lang: en
translationOf: "linux-server-sleep"
draft: false
---

ref: https://www.unixtutorial.org/disable-sleep-on-ubuntu-server/

The ODROID I bought as a personal server started shutting down randomly after about a year of operation. I initially thought it was just a loose power cable, but the server kept going down frequently.

After googling:
- Most people recommended checking /var/log/messages, but that log file didn't exist on my system at all.
- The contents that should have been in /var/log/messages were in dmesg instead.

Looking at the system logs, a sleep command was being sent to NetworkManager and the system was shutting down.
```
NetworkManager[755]: <info>  [1633287633.3651] manager: sleep: sleep requested (sleeping: no  enabled: yes)
NetworkManager[755]: <info>  [1633287633.3661] manager: NetworkManager state is now ASLEEP
ModemManager[809]: <info>  [sleep-monitor] system is about to suspend
```

> General system log: /var/log/syslog



Fortunately it wasn't a hardware issue. I looked into Linux automatic sleep and followed the link above. Looking at how only the loaded part of the sleep.target service was changed, it seems like existing schedulers that were hooking into sleep.target got cleared out.

```shell
sudo systemctl mask sleep.target suspend.target hibernate.target hybrid-sleep.target
```

After running the command above, the unexpected server shutdowns haven't happened again so far.
