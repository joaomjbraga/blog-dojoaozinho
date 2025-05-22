---
title: "Transforme seu GIMP em um Mini-Photoshop com o PhotoGIMP"
description: "Aprenda como personalizar o GIMP para se assemelhar ao Adobe Photoshop usando o PhotoGIMP, facilitando a transição para o software livre."
date: "2025-05-22T09:30:00Z"
tags: ["GIMP", "PhotoGIMP", "Photoshop", "Design Gráfico", "Software Livre"]
coverImage: "https://raw.githubusercontent.com/Diolinux/PhotoGIMP/master/.config/GIMP/3.0/splashes/splash-screen-2025-v2.png"
author:
  name: "João Marcos"
  image: "https://avatars.githubusercontent.com/u/195451083?v=4"
  bio: "Estudante de Análise e Desenvolvimento de Sistemas e entusiasta de software livre."
category: "Tutoriais"
---

Se você está migrando do Adobe Photoshop para o GIMP e sente dificuldade com a nova interface ou os atalhos diferentes, o **PhotoGIMP** pode ser a solução ideal para facilitar essa transição.

## O que é o PhotoGIMP?

O **PhotoGIMP** é um patch desenvolvido pela equipe do DioLinux ![Diolinux](https://raw.githubusercontent.com/Diolinux/PhotoGIMP/master/.config/GIMP/3.0/splashes/splash-screen-2025-v2.png) que modifica a interface do GIMP para torná-la mais semelhante à do Photoshop. Essa modificação é especialmente útil para usuários que estão acostumados com o fluxo de trabalho do software da Adobe e desejam uma adaptação mais suave ao GIMP.

### Principais mudanças:

- **Organização das ferramentas**: As ferramentas são reorganizadas para imitar a posição no Adobe Photoshop, facilitando a localização e o uso.
- **Nova tela de abertura (Splash Screen)**: Uma nova imagem de abertura personalizada é exibida ao iniciar o GIMP.
- **Configurações padrão otimizadas**: As configurações iniciais são ajustadas para maximizar o espaço na tela de desenho.
- **Atalhos de teclado similares ao Photoshop**: Os atalhos são configurados para serem semelhantes aos do Photoshop no Windows, seguindo a documentação da Adobe.
- **Novo ícone e nome**: Um arquivo `.desktop` personalizado altera o ícone e o nome do aplicativo para refletir o PhotoGIMP.
- **Idioma do sistema por padrão**: O idioma do sistema é utilizado por padrão, mas pode ser alterado nas configurações, se desejado.

![Interface do PhotoGIMP](https://raw.githubusercontent.com/Diolinux/PhotoGIMP/master/screenshots/photogimp_3_-_diolinux.png)

## Como instalar o PhotoGIMP?

A instalação do PhotoGIMP envolve copiar os arquivos do patch para o diretório de configuração do GIMP no seu sistema. Aqui está um guia passo a passo:

### 1. Baixe o PhotoGIMP

Você pode clonar o repositório ou baixar o arquivo ZIP diretamente:

```bash
git clone https://github.com/Diolinux/PhotoGIMP.git
```

Ou baixe o ZIP [aqui](https://github.com/Diolinux/PhotoGIMP/archive/refs/heads/master.zip) e extraia o conteúdo.

### 2. Localize o diretório de configuração do GIMP

O caminho varia dependendo do sistema operacional e do método de instalação do GIMP:

- **Linux (Flatpak)**:
  ```
  ~/.var/app/org.gimp.GIMP/config/GIMP/3.0/
  ```
- **Linux (instalação padrão)**:
  ```
  ~/.config/GIMP/3.0/
  ```
- **Windows**:
  ```
  C:\Users\SeuUsuario\AppData\Roaming\GIMP\3.0\
  ```
- **macOS**:
  ```
  ~/Library/Application Support/GIMP/3.0/
  ```

> **Nota**: Substitua `3.0` pela versão correspondente do seu GIMP, se for diferente.

### 3. Copie os arquivos do PhotoGIMP

Copie o conteúdo das pastas `PhotoGIMP/.config/GIMP/3.0/` e `PhotoGIMP/.local/share/` para os diretórios correspondentes no seu sistema. Certifique-se de substituir os arquivos existentes, se necessário.

### 4. Reinicie o GIMP

Após copiar os arquivos, inicie o GIMP. Você deverá ver a nova tela de abertura e a interface modificada.

### Tutoriais em video
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/ZEZihylv04g?si=HN8-lfxpRpE1KjTL"
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerPolicy="strict-origin-when-cross-origin"
  allowFullScreen
></iframe>


## Considerações finais

O PhotoGIMP é uma ferramenta poderosa para quem deseja migrar do Photoshop para o GIMP sem enfrentar uma curva de aprendizado acentuada. Ele não altera as funcionalidades internas do GIMP, mas ajusta a aparência e os atalhos para proporcionar uma experiência mais familiar.

Para mais informações e suporte, visite o [repositório oficial no GitHub](https://github.com/Diolinux/PhotoGIMP.git).

Se você achou este guia útil, compartilhe com outros que possam se beneficiar dessa personalização. Até a próxima!
