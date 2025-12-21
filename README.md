# Base44 App


This app was created automatically by Base44.
It's a Vite+React app that communicates with the Base44 API.

## Running the app

```bash
npm install
npm run dev
```

## Building the app

```bash
npm run build
```

## Como reconciliar versões

Se sua branch divergir do histórico remoto, siga estas etapas para alinhar o código com segurança:

1. Atualize referências remotas: `git fetch origin`
2. Compare o que mudou: `git log --oneline --graph --decorate origin/main..HEAD` e `git diff origin/main`
3. Rebase para manter histórico linear: `git rebase origin/main` (resolva conflitos com `git add` e continue com `git rebase --continue`)
4. Sincronize dependências se `package.json` mudar: `npm install`
5. Valide antes de publicar: `npm run lint` e `npm run build`
6. Publique o resultado alinhado: `git push origin HEAD` (use `--force-with-lease` se reescrever histórico)

Para detalhes e comandos explicados, consulte [VERSIONING.md](./VERSIONING.md).

For more information and support, please contact Base44 support at app@base44.com.