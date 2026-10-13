# Practice framework (Playwright + TypeScript)

Layered framework against the public demo site https://www.saucedemo.com.

## Layout

    src/config   urls.ts (flow -> URL, getUrl)
    src/data     types.ts, enums.ts, baseData.ts
    src/pages    locators.ts (selectors), steps.ts (actions)
    tests        *.spec.ts (one file per flow)

## First-time setup

    npm install
    npx playwright install chromium

## Run

    npx playwright test                              # everything
    npx playwright test tests/Login.spec.ts          # one spec file
    npx playwright test -g "valid user"              # one test by title
    npx playwright test --grep @smoke                # a tagged group
    npx playwright test --workers=1                  # watch one at a time
    npx playwright show-report                       # open the HTML report

## Add a test

1. New scenario, same page: add data in baseData.ts, add a test() in a spec.
2. New field: locators.ts, types.ts, baseData.ts, steps.ts, then the spec.
3. New flow: add the key in types.ts, the URL in urls.ts, locators, steps,
   data, and a new tests/NewFlow.spec.ts copying an existing spec's shape.

Work in the order types -> data -> locators -> steps -> spec and let the
TypeScript compiler point out anything missing.
