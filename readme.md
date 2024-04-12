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

## Rules

Есть 2 типа компонентов.

- Чистые `shared` и `entity`
- Грязные `features`, `widgets` и `pages`

### Чистые компоненты

Не зависят ни от чего из вне, кроме других чистых компонентов и функций. То есть никакие внешние изменения среды не
должны касаться работы этих компонентов. Внутри чистых компонентов можно использовать только чистые функции и другие
чистые компоненты.

#### Shared

- Это максимально переиспользуемый слой не относящийся к специфике приложение/бизнеса.
- Состоит только из самого себя, своих дочерних компонентов или одного другого `shared` при условии, что новый компонент
  является надстройкой или оберткой над ним.
- Не может использовать внутри себя ничего из вне и не может никак влиять ни на что во вне. (исключение `Link`)

#### Entities

- Это максимально переиспользуемый слой не относящийся к специфике приложение/бизнеса.
- Состоит только из `shared`, `entities` или своих дочерних компонентов
- Не может использовать внутри себя ничего из вне (кроме `shared` и других `entities`) и не может никак влиять ни на что
  во вне. (исключение `Link`)

### Грязные компоненты

Зависят от чего угодно из вне. Например от стейтменеджеров, роутеров, сервисов итд.

#### Features

- Простые компоненты состоящие из одного компонента `shared` или `entities` наделенные какой-то логикой.

#### Widgets

- Сложные компоненты состоящие из любых других компонентов и наделенные какой-то логикой

Иерархия компонентов выглядит так:

- `widgets` -> `widgets/features/entities/shared` + `logic`
- `features` -> `entities/shared` + `logic`
- `entities` -> `entities/shared`
- `shared` -> `self code`

#### Pages

Страницы это отдельный компонент и он может делиться на две части:

1. Компонент для получения данных и подгрузки view части.
2. Асинхронная view часть

или быть одной синхронной частью. Зависит от ситуации.

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

### `[Folder names]`

- `ui` - то что относится к отображению
- `lib` - чистые функции относящиеся именно к тому месту где они находятся
- `hooks` - хуки
- `config` - конфигурационные файлы или функции для создания конфигураций
- `types` - типы
- `decorators` - декораторы
- `services` - сервисы с чем-то внешним или бизнес-логика
- `_story` - storybook
- `_tests` - тесты
- `_e2e` - e2e тесты
- `its` - элементарные тесты
- `[accessory]` - принадлежность к чему `user`
- `[purpose]` - цель (задача) `getUserName`
- `[type]` - тип `modal`, `input`, `form`, `button`
- `[name]` - название `kit`, `material`

### `[ClearComponent]`, `[Component]` and `[Page]` Structure

- `ui`
    - `[Component].tsx`
    - `? [Component].module.scss`
    - `? [Component].async.scss` - _контентная часть которая подгружается асинхронно_
- `? lib` - _простые чистые функции от которых зависит этот компонент_
    - `[accessory]`
        - `? [purpose].ts`
- `? hooks` - _хуки которые используются **ВНУТРИ** этого компонента_
    - `[accessory]`
        - `? use[Purpose].ts`
- `? config` - _конфигурационные файлы которые используются **ВНУТРИ** этого компонента_
    - `? [accessory].ts`
    - `? [accessory].json`
- `? types` - _типы используемые **ВНУТРИ** этого компонента_
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
- `index.ts` - _публичный API компонента_

## TODO

- Пофиксить `export default meta`; у story у которых есть декораторы 