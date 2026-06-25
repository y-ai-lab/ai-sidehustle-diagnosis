# 初回コミット前チェックリスト

このプロジェクトをGit管理し始める前に確認する項目です。
Codexはユーザーから明示的に依頼されるまで、`git init` やコミット作成は行いません。

## Git管理を始める前に確認すること

- `.gitignore` がある
- `node_modules/` がコミット対象外になっている
- `dist/` がコミット対象外になっている
- `*.tsbuildinfo` がコミット対象外になっている
- `.env` 系ファイルがコミット対象外になっている
- 一時ログやデバッグファイルが混ざっていない

## 現在Git管理されているか確認する

Git管理を始める前に、まず現在の状態を確認します。

```bash
git status --short
```

`fatal: not a git repository` と出る場合は、まだGit管理されていません。
この場合でも、Codexはユーザー確認なしで `git init` を実行しません。

## 初回コミット前に実行すること

```bash
npm.cmd run build
npm.cmd test
```

build/testは並列実行せず、上から順番に実行します。

## 初回コミットに含めたいもの

- `src/`
- `docs/`
- `README.md`
- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `vite.config.ts`
- `index.html`
- `.gitignore`

## 初回コミットに含めないもの

- `node_modules/`
- `dist/`
- `*.tsbuildinfo`
- `.env`
- `*.log`
- OSやエディタの設定ファイル

## コミットメッセージ例

```text
Initial MVP for AI side hustle diagnosis
```

## 注意点

- Git操作を始める前に、ユーザーへ確認する
- 生成物をコミットしない
- 本番URLやアフィリエイトリンクを入れる場合は、別の確認ステップに分ける
- build/testが失敗している状態でコミットしない
