---
title: "Ambiente Mobile Profissional: React Native + Docker no Pop!_OS"
excerpt: "Guia prático para configurar um ambiente de desenvolvimento mobile com React Native (Expo) e Docker no Pop!_OS, seguindo boas práticas e focando em produtividade."
date: 2026-01-17
category: "Mobile"
---

## Introdução

Configurar React Native no Linux não é difícil — difícil é fazer do jeito certo. Node fora do padrão, Java incompatível, SDK quebrado, Docker via Snap… o combo clássico do caos.

Este post mostra como montar um ambiente profissional para desenvolvimento mobile com React Native (Expo) + Android + Docker no Pop!_OS, usando apenas ferramentas oficiais e decisões que não viram dívida técnica amanhã.

---

## Stack utilizada

- Pop!_OS (base Ubuntu)
- Node.js (via NVM)
- npm (gerenciador padrão)
- Java 17
- Android SDK (Android Studio)
- Expo CLI
- EAS CLI (Expo Application Services)
- Docker Engine + Docker Compose Plugin

---

## Preparando o sistema

```bash
sudo apt update
sudo apt install -y \
  curl git unzip zip \
  build-essential \
  libc6:i386 libncurses5:i386 libstdc++6:i386 lib32z1 libbz2-1.0:i386
```

---

## Node.js do jeito certo (NVM)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc

nvm install --lts
nvm use --lts
```

**Versão atual do NVM**: v0.40.1 (janeiro 2026)

---

## Java 17

```bash
sudo apt install -y openjdk-17-jdk
```

Verifique a instalação:

```bash
java -version
```

---

## Android SDK

Configure via Android Studio (site oficial).
Instale API 34+, Build-Tools, Platform-Tools e Emulator.

---

## Variáveis de ambiente

Adicione ao `~/.bashrc` ou `~/.zshrc`:

```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Recarregue:

```bash
source ~/.bashrc
```

---

## Criando o projeto com Expo

```bash
npx create-expo-app@latest MyApp
cd MyApp
```

Para TypeScript:

```bash
npx create-expo-app@latest MyApp --template blank-typescript
```

---

## Instalando EAS CLI

```bash
npm install -g eas-cli
```

Faça login na sua conta Expo:

```bash
eas login
```

Configure o projeto:

```bash
eas build:configure
```

---

## Executando o projeto

```bash
npm start
```

Para rodar no Android:

```bash
npm run android
```

---

## Docker no Pop!_OS

Remova versões antigas:

```bash
sudo apt remove -y docker docker-engine docker.io containerd runc
```

Instale dependências:

```bash
sudo apt install -y ca-certificates curl gnupg lsb-release
```

Configure o repositório oficial:

```bash
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

```bash
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

Instale o Docker:

```bash
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

---

## Docker sem sudo

```bash
sudo usermod -aG docker $USER
newgrp docker
docker run hello-world
```

**Importante**: você pode precisar fazer logout/login para que as permissões sejam aplicadas completamente.

---

## Expo + Docker (API Backend)

No desenvolvimento Expo, use a URL do seu backend Docker:

**No emulador Android**:

```ts
const API_URL = "http://10.0.2.2:3333";
```

**No dispositivo físico** (mesmo WiFi):

```ts
const API_URL = "http://192.168.x.x:3333"; // IP da sua máquina
```

Para descobrir seu IP:

```bash
ip addr show | grep "inet "
```

---

## Comandos úteis do EAS

Build de desenvolvimento:

```bash
eas build --profile development --platform android
```

Build de produção:

```bash
eas build --profile production --platform android
```

Submit para Google Play:

```bash
eas submit -p android
```

---

## Conclusão

Ambiente previsível com Expo, builds facilitadas via EAS CLI e integração limpa entre mobile e backend Docker. A combinação Expo + EAS elimina muito da complexidade do React Native tradicional, mantendo a flexibilidade quando necessário.
