# OrbitIQ — Onboarding

React + TypeScript onboarding flow. Currently a plain web app; a Chrome Extension side
panel wrapper (manifest, background worker) will be added in a later pass once the
onboarding, tutorial, and dashboard are all built out.

The page centers the flow in a ~440px card to preview it at the width it'll eventually
run at inside a Chrome side panel — see `src/components/PageShell.tsx`.

## Develop

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Structure

```
src/
  components/
    PageShell.tsx           dev-time page chrome (centers the panel-width card)
  onboarding/
    screens/                one component per onboarding screen
    components/              shared, reusable pieces (buttons, fields, checkboxes, layout)
    useOnboardingState.ts    step + form-data state
    types.ts                 step names, form data shape, option lists
    validation.ts
    OnboardingFlow.tsx        wires state to the active screen
  App.tsx
```
