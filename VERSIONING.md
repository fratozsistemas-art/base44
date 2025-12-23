# Como reconciliar versões

Quando houver divergência entre a versão local e a versão remota do projeto, siga estes passos para reconciliar o código com segurança:

1. **Atualize as referências remotas**
   ```bash
   git fetch origin
   ```
   Isso traz os commits mais recentes sem alterar a sua árvore de trabalho.

2. **Verifique o que mudou**
   Compare o trabalho local com o branch de referência (por exemplo, `main`):
   ```bash
   git log --oneline --graph --decorate origin/main..HEAD
   ```
   e inspecione diferenças de arquivos:
   ```bash
   git diff origin/main
   ```

3. **Rebase antes de mesclar**
   Prefira rebase para manter o histórico linear e evitar merges ruidosos:
   ```bash
   git rebase origin/main
   ```
   - Se surgir conflito, edite os arquivos marcados com `<<<<<<<`, resolva manualmente e continue:
     ```bash
     git add <arquivos_resolvidos>
     git rebase --continue
     ```
   - Caso o rebase fique complexo, aborte e retente depois de alinhar as mudanças:
     ```bash
     git rebase --abort
     ```

4. **Sincronize dependências**
   - Se o `package.json` mudou, atualize dependências e valide o lockfile:
     ```bash
     npm install
     ```
   - Não edite a versão do Node definida pelo projeto; use a mesma versão para evitar divergências de build.

5. **Valide antes de publicar**
   Execute os checadores locais antes do push:
   ```bash
   npm run lint
   npm run build
   ```

6. **Envie o trabalho reconciliado**
   Após o rebase bem-sucedido, publique os commits:
   ```bash
   git push origin HEAD
   ```
   Se o rebase reescrever o histórico, use `--force-with-lease` para evitar sobrescrever trabalho alheio.

Seguir esta sequência reduz conflitos, mantém o histórico limpo e garante que dependências e builds fiquem consistentes entre versões.
