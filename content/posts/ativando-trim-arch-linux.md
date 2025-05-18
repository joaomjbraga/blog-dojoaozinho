---
title: "Ativando o TRIM no Arch Linux"
description: "Como ativar o TRIM para SSDs no Arch Linux e manter o desempenho e a vida útil do disco."
date: 2025-05-18
tags: ["linux", "arch", "ssd", "trim", "desempenho"]
---

# 🚀 Ativando o TRIM no Arch Linux

O **TRIM** é uma funcionalidade essencial para quem utiliza **SSDs** no Linux. Ele permite que o sistema operacional informe ao SSD quais blocos de dados não são mais utilizados, ajudando a manter a performance e prolongar a vida útil do disco.

> 💡 Algumas distribuições Linux, como o Arch Linux, **não ativam o TRIM por padrão**. Por isso, é importante realizar esse processo manualmente.

---

## 🔧 Etapa 1: Ativando o Timer do TRIM

O `fstrim.timer` realiza o TRIM de forma automática semanalmente. Para ativá-lo imediatamente:

```bash
sudo systemctl enable fstrim.timer --now
```

---

## 🔍 Etapa 2: Verificando o Status do Timer

Após ativar, verifique se ele está ativo e funcionando corretamente:

```bash
systemctl status fstrim.timer
```

Você deve ver que o serviço está **ativo** e **agendado**.

---

## ⚙️ Etapa 3: Executando o TRIM Manualmente

Se quiser realizar a operação de TRIM manualmente:

```bash
sudo fstrim /
```

Substitua `/` por outras partições, se necessário (ex: `/home`).

---

## 📝 Etapa 4: Preset Personalizado (Opcional)

Para garantir que o `fstrim.timer` sempre seja ativado automaticamente:

### a. Criar o diretório de presets:

```bash
sudo mkdir -p /etc/systemd/system-preset/
```

### b. Editar o arquivo de preset:

```bash
sudo nano /etc/systemd/system-preset/90-custom.preset
```

### c. Adicionar o conteúdo:

```
enable fstrim.timer
```

### d. Aplicar os presets:

```bash
sudo systemctl preset-all
```

---

## ✅ Verificação Final

Para verificar se o timer está funcionando:

```bash
systemctl status fstrim.timer
```

Ou consulte os logs:

```bash
journalctl -u fstrim.timer
```

---

## 📌 Considerações Finais

Manter o TRIM ativado é uma excelente prática para prolongar a vida útil e manter a performance do seu SSD. No Arch Linux, por ser uma distribuição mais enxuta, essa configuração precisa ser feita manualmente.

Com esses passos simples, seu sistema estará otimizado para trabalhar melhor com SSDs!

---

📚 **Referência**:  
[Documentação oficial do systemd – fstrim.timer](https://github.com/joaomjbraga/AtivandoTRIM)

---
👍 Se gostou, compartilhe este post!

