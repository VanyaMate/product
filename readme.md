# Simple product-app

## Technologies

### Architecture

- ~~**FSD**~~
- **_UMA_** - [ссылка на статью](https://habr.com/ru/articles/824842/)

### Builder

- **~~Webpack~~** - `слишком с ним много проблем`
- **Vite**

### Tools

- **TypeScript**
- **React**
    - **React-Router-Dom**
    - ~~**Redux**~~ - `слишком много весит. ~45kb (15kb gzip)`
        - ~~**Redux Toolkit**~~
        - ~~**Redux ThunkError**~~
    - **@vanyamate/sec** - `вместо redux`
- **SCSS** + **CSS Modules**
- **I18N-Next**
- ~~**Shadcn UI**~~ - `слишком много весит. ~45kb (15kb gzip)`
    - ~~**Tailwind**~~
- ~~**Axios**~~ - `слишком много весит. ~70kb (25kb gzip) o.O`
- **@vanyamate/fetch-with-interceptors** - `вместо axios`

### DevTools

- **Vite**
    - **vite-bundle-visualizer**
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
    - **~~Loki~~** - `пока не поддерживает Storybook 8 ( wip )`
    - **Playwright**
    - **Cypress** - `пока что гораздо менее удобный чем pw`
        - **cypress-image-diff-js**
            - `плохо работает с cypress open`
            - `делает другой viewport`
            - `js config без настройки пути`
            - `если в тесте несколько подряд скриншотов, обновлять будет нужно их по очереди. как варинат - использовать 1 скриншот в 1 тесте`
    - **reg-cli**
    - **Husky**
- ~~**MockServer**~~ - `уже не нужен`
    - ~~**json-server**~~

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
- `context` - контекст и всё что с ним связано
- `_story` - storybook
- `_tests` - тесты
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
- `index.ts` - _публичный API компонента_

## TODO

1. Добавить "чтение" сообщений.
2. Добавить emoji
3. Добавить отображение количества новых сообщений (в PrivateDialogue)
4. Добавить новые уведомления
5. Добавить настройки для уведомлений
6. Добавить отображение уведомлений
7. Добавить подгрузку старых уведомлений
8. Добавить возможность отметить уведомление
9. Добавить посты
10. Добавить возможность создавать посты
11. Добавить посты на страницу пользователя
12. Добавить поиск в шапку сайта
13. Добавить возможность редактировать/удалять сообщения
14. ... и еще много много чего.