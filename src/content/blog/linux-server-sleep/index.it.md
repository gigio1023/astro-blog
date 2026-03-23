---
title: "Sleep del server Linux"
description: "Risoluzione dei problemi di spegnimento automatico imprevisto su un server Linux disabilitando i target sleep di systemd."
date: "2021-10-03T21:06:55.212Z"
tags: ["dev-tools"]
lang: it
translationOf: "linux-server-sleep"
draft: false
---

ref: https://www.unixtutorial.org/disable-sleep-on-ubuntu-server/

L'ODROID che avevo comprato come server personale ha iniziato a spegnersi casualmente dopo circa un anno di funzionamento. All'inizio pensavo fosse solo un cavo di alimentazione mal collegato, ma il server continuava a spegnersi frequentemente.

Dopo aver cercato su Google:
- La maggior parte delle persone consigliava di controllare /var/log/messages, ma quel file di log non esisteva affatto nel mio sistema.
- I contenuti che avrebbero dovuto essere in /var/log/messages si trovavano invece in dmesg.

Guardando i log di sistema, un comando sleep veniva inviato a NetworkManager e il sistema si spegneva.
```
NetworkManager[755]: <info>  [1633287633.3651] manager: sleep: sleep requested (sleeping: no  enabled: yes)
NetworkManager[755]: <info>  [1633287633.3661] manager: NetworkManager state is now ASLEEP
ModemManager[809]: <info>  [sleep-monitor] system is about to suspend
```

> Log di sistema generale: /var/log/syslog



Fortunatamente non era un problema hardware. Ho cercato informazioni sullo sleep automatico di Linux e ho seguito il link allegato sopra. Guardando come è stata modificata solo la parte loaded del servizio sleep.target, sembra che gli scheduler esistenti che interagivano con sleep.target siano stati rimossi.

```shell
sudo systemctl mask sleep.target suspend.target hibernate.target hybrid-sleep.target
```

Dopo aver eseguito il comando sopra, gli spegnimenti imprevisti del server non si sono più verificati.
