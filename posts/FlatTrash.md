---
title: "FlatTrash: Script Completo de Limpeza e Otimização para Linux"
excerpt: "Conheça o FlatTrash, um script bash poderoso que automatiza a limpeza do seu sistema Linux, liberando espaço em disco e otimizando o desempenho com segurança."
date: 2025-11-16
category: "Linux"
---

# FlatTrash: Script Completo de Limpeza e Otimização para Linux

Manter um sistema Linux limpo e otimizado pode ser uma tarefa repetitiva e trabalhosa. Por isso, desenvolvi o **FlatTrash**, um script bash completo que automatiza todo o processo de limpeza, removendo arquivos desnecessários, caches, logs antigos e liberando espaço em disco de forma segura e eficiente.

## O que é o FlatTrash?

O FlatTrash é um script de automação projetado para sistemas baseados em Debian/Ubuntu (desenvolvido e testado no Pop!\_OS). Ele executa 10 operações diferentes de limpeza e otimização, apresentando relatórios detalhados sobre o espaço liberado e mantendo logs completos de todas as operações.

## Principais Funcionalidades

### 📊 Relatórios em Tempo Real

O script apresenta estatísticas detalhadas durante toda a execução, mostrando exatamente quanto espaço está sendo liberado em cada etapa.

### 🔍 Análise Completa do Sistema

O FlatTrash verifica e limpa múltiplos aspectos do sistema:

1. **Atualização de Pacotes** - Sincroniza a lista de pacotes disponíveis
2. **Remoção de Dependências** - Elimina pacotes e dependências não utilizadas
3. **Limpeza de Cache APT** - Remove arquivos de cache do gerenciador de pacotes
4. **Remoção de Órfãos** - Identifica e remove pacotes órfãos usando deborphan
5. **Configurações Residuais** - Limpa configurações de pacotes desinstalados
6. **Limpeza Flatpak** - Remove aplicações Flatpak não utilizadas e repara instalações
7. **Otimização Snap** - Remove versões antigas de snaps desabilitados
8. **Logs do Sistema** - Limpa journalctl mantendo apenas os últimos 7 dias ou máximo de 100MB
9. **Cache de Usuário** - Limpa ~/.cache (arquivos com mais de 30 dias) e miniaturas
10. **Cache do Sistema** - Limpa /var/cache, /tmp, /var/tmp e caches Python/npm

### ✅ Segurança em Primeiro Lugar

O script foi projetado com diversas camadas de segurança:

- Verifica privilégios de root antes de executar
- Cria backup automático da lista de pacotes instalados
- Usa `set -euo pipefail` para tratamento robusto de erros
- Remove apenas arquivos temporários e caches seguros
- Mantém logs recentes para não prejudicar a análise do sistema
- Função `safe_remove` para evitar erros em diretórios inexistentes
- Verifica a existência de comandos antes de executá-los

### 💾 Sistema de Backup e Logs

Todo o processo é documentado:

- Logs detalhados salvos em `/var/log/flattrash_YYYYMMDD_HHMMSS.log`
- Backup da lista de pacotes em `/var/backups/flattrash_packages_backup_YYYYMMDD.txt`
- Timestamps de cada operação
- Status claro (SUCCESS, WARNING, ERROR)

## Como Instalar e Usar

A instalação é simples e direta:

```bash
# Clone o repositório
git clone https://github.com/joaomjbraga/flattrash.git

# Entre no diretório
cd flattrash

# Dê permissão de execução
chmod +x flattrash.sh

# Execute com privilégios de root
sudo ./flattrash.sh
```

O script irá automaticamente:

1. Verificar conexão com internet
2. Criar backup de segurança
3. Mostrar o espaço livre atual
4. Executar todas as operações de limpeza
5. Apresentar um relatório final com estatísticas
6. Perguntar se deseja reiniciar o sistema

## Exemplo de Saída

O script apresenta uma interface visual atrativa com cores e estatísticas em tempo real:

```
╔═══════════════════════════════════════════════════════════╗
║                     RELATÓRIO FINAL                       ║
╠═══════════════════════════════════════════════════════════╣
║ Espaço livre antes: 15.2G                               ║
║ Espaço livre agora: 18.7G                               ║
║ Espaço liberado: 3GB                                     ║
╚═══════════════════════════════════════════════════════════╝
```

## Personalização

Você pode facilmente customizar o comportamento do script editando algumas variáveis:

```bash
# Tempo de retenção de logs (padrão: 7 dias ou 100MB)
journalctl --vacuum-time=7d
journalctl --vacuum-size=100M

# Idade dos arquivos de cache a remover (padrão: 30 dias)
find "$HOME/.cache" -type f -atime +30 -delete

# Idade dos arquivos temporários
find /tmp -type f -atime +2 -delete
find /var/tmp -type f -atime +7 -delete
```

## Quando Usar?

Recomendo executar o FlatTrash:

- **Mensalmente** para manutenção preventiva
- **Quando o espaço em disco estiver baixo**
- **Após instalar/desinstalar muitos pacotes**
- **Depois de atualizações importantes do sistema**
- **Antes de criar backups do sistema**

## Requisitos

- Sistema Linux baseado em Debian/Ubuntu
- Acesso root (sudo)
- Bash 4.0 ou superior
- Conexão com internet (recomendada)

## Segurança e Precauções

Embora o script seja seguro e testado, algumas recomendações importantes:

- ⚠️ **Sempre faça backup** de dados importantes antes de executar
- 📋 Revise os logs em caso de dúvidas
- 🔍 Alguns avisos (warnings) são normais e não indicam falha
- 🧪 Teste em ambiente de desenvolvimento antes de usar em produção

## Roadmap

Estou trabalhando em melhorias futuras:

- Suporte para outras distribuições (Fedora, Arch, openSUSE)
- Modo interativo para escolher quais limpezas executar
- Opção de dry-run (simular sem executar)
- Relatórios em HTML ou JSON
- Agendamento automático via cron
- Interface gráfica opcional

## Contribua!

O FlatTrash é um projeto open source e contribuições são muito bem-vindas! Se você tem ideias, encontrou bugs ou quer adicionar funcionalidades:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Abrir um Pull Request

## Conclusão

O FlatTrash nasceu da necessidade de ter uma ferramenta confiável e automatizada para manter meu sistema Linux sempre otimizado. Com interface visual intuitiva, relatórios detalhados e foco em segurança, ele se tornou uma ferramenta essencial na minha rotina de manutenção do sistema.

Se você também busca uma solução completa e segura para manter seu Linux limpo e performático, experimente o FlatTrash!

## Links

- 🔗 [Repositório no GitHub](https://github.com/joaomjbraga/FlatTrash)
- 📄 [Documentação completa](https://github.com/joaomjbraga/FlatTrash#readme)
- ⭐ Dê uma estrela no projeto se ele foi útil!

---

**Nota**: Este projeto está sob a licença MIT e foi desenvolvido com foco em segurança e confiabilidade. Use sempre com consciência e mantenha backups de seus dados importantes.
