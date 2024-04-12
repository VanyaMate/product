# Simple product-app

## Technologies

### Architecture

- **FSD**

### Builder

- **~~Webpack~~** - `слишком с ним много проблем`
- **Vite**

### Tools

- **TypeScript**
- **React**
    - **React-Router-Dom**
    - **Redux**
        - **Redux Toolkit**
        - **Redux Thunk**
- **SCSS** + **CSS Modules**
- **I18N-Next**
- **Shadcn UI** - `только sonner`
    - **Tailwind**
- **Axios** - `возможно уберу. 25кб слишком много.`

### DevTools

- **Git**
    - **GitHub**
        - **GitHub Actions**
- **Lint**
    - **ESLint**
    - **StyleLint**
- **Test**
    - **Jest**
    - **React testing library**
    - **Storybook**
    - **~~Loki~~** - `слишком с ним много проблем (возможно из-за storybook ^8..`
    - **~~reg-cli~~** - `не нужен для pw`
    - **_Playwright_** - `под вопросом. не работает React.Context`
    - **Husky**
- **MockServer**
    - **json-server**

## Folder structure

- `src`
    - `shared`
        - `ui-[name]`
            - `[type]`
                - `[ClearComponent]`
        - `lib`
            - `[accessory]`
                - `[purpose].ts`
                - `index.ts`
            - `index.ts`
        - `index.ts` - `@/shared`
    - `entities`
        - `[accessory]`
            - `[type]`
                - `[ClearComponent]`
        - `index.ts` - `@/entities`
    - `features`
        - `[accessory]`
            - `[type]`
                - `[Component]`
        - `index.ts` - `@/features`
    - `widgets`
        - `[accessory]`
            - `[type]`
                - `[Component]`
                - `index.ts`
            - `index.ts`
        - `index.ts` - `@/widgets`
    - `pages`
        - `[PageName]Page`
            - `[Page]`
            - `index.ts`
        - `index.ts` - `@/pages`
    - `app`
        - `[accessory]`
            - `[Folder names]`
            - `index.ts`
        - `index.ts` - `@/app`

`src/[type]/[accessory][type]`

### `[Folder names]`

Внутри каждой папки допускается использование `[accessory]/[Folder names]`

- `ui` - то что относится к отображению
- `lib` - чистые функции
- `hooks` - хуки
- `config` - конфигурационные файлы или функции для создания конфигураций
- `types` - типы
- `api` - то что экспортируется во вне
- `decorators` - декораторы
- `services` - сервисы с чем-то внешним или бизнес-логика
- `_story` - storybook
- `_tests` - тесты
- `_e2e` - e2e тесты
- `its` - элементарные тесты
- `[accessory]` - принадлежность к чему `user`
- `[purpose]` - цель (задача) `getUserName`
- `[type]` - тип `modal`, `input`, `form`, `button`

### `[ClearComponent]`, `[Component]` and `[Page]` Structure

- `ui` - _всё что относится к отображению компонента (стили, jsx)_
    - `[Component].tsx`
    - `? [Component].module.scss`
    - `? [Component].async.scss` - _контентная часть которая подгружается асинхронно_
- `? lib` - _простые чистые функции от которых зависит этот компонент_
    - `? [purpose].ts`
- `? hooks` - _хуки которые используются **ВНУТРИ** этого компонента_
    - `? use[Purpose].ts`
- `? config` - _конфигурационные файлы которые используются **ВНУТРИ** этого компонента_
    - `? [accessory].ts`
    - `? [accessory].json`
- `? types` - _типы используемые **ВНУТРИ** этого компонента_
    - `? [Component].types.ts`
- `? api` - _хуки / типы которые используются **ВНЕ** этого компонента_
    - `? hooks`
        - `? [purpose].ts`
    - `? types`
        - `? [Component].types.ts`
- `_story`
    - `? decorators`
        - `? [accessory].ts`
    - `? config`
        - `? [accessory].ts`
        - `? [accessory].json`
    - `[Component].story.tsx`
- `_tests`
    - `its`
        - `[Component].it.tsx`
    - `? config`
        - `? [accessory].ts`
        - `? [accessory].json`
    - `? decorators`
        - `? [accessory].ts`
    - `[Component].test.ts`
- `_e2e`
    - `its`
        - `[Component].e2e-it.tsx`
    - `? config`
        - `? [accessory].ts`
        - `? [accessory].json`
    - `? decorators`
        - `? [accessory].ts`
    - `[Component].e2e-test.ts`
- `index.ts` - _публичный API этого компонента (экспорт из `ui` и `api`)_

## TODO

- Пофиксить `export default meta`; у story у которых есть декораторы 