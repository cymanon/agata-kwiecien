# Plan Techniczny Implementacji - Mini Aplikacja Angular 20

## Przegląd projektu

Aplikacja do zarządzania postami z API jsonplaceholder.typicode.com z funkcjonalnościami filtrowania, szczegółów postów i ulubionych.

## Struktura katalogów

```
src/
├── app/
│   ├── core/                     # Podstawowe serwisy
│   │   └── services/
│   ├── shared/                   # Współdzielone komponenty
│   │   ├── components/
│   │   │   ├── loader/
│   │   │   └── ui/
│   │   └── models/
│   ├── features/                 # Moduły funkcjonalności (lazy loaded)
│   │   ├── posts/
│   │   │   ├── components/
│   │   │   └── services/
│   │   └── gantt/               # Bonus feature
│   │       ├── components/
│   │       └── services/
│   ├── app.config.ts
│   ├── app.routes.ts
│   └── app.component.ts
└── styles/
```

## Funkcjonalności

1. **Lista postów** - wyświetlanie z API, cache, loader
2. **Filtrowanie** - po treści (frontend), po użytkowniku (API), ulubione
3. **Szczegóły** - pełna treść, autor, komentarze
4. **Ulubione** - toggle, persystencja w serwisie
5. **Gantt** - timeline z mockowanymi datami (bonus)

## Plan implementacji

### Faza 1 - Setup (1-2h)

- TailwindCSS v4, struktura katalogów, modele, podstawowe serwisy

### Faza 2 - Lista postów (1-1.5h)

- PostListComponent, PostCardComponent, PostsStateService, filtrowanie

### Faza 3 - Szczegóły (1.5-2h)

- PostDetailComponent, komentarze, autor, ulubione

### Faza 4 - Polish (1h)

- Animacje, responsive design, error handling

### Faza 5 - Bonus (1-1.5h)

- Gantt chart z timeline

---

**Szacowany czas:** 6-8 godzin  
**Priorytet:** Lista postów → Szczegóły → Filtrowanie → Responsywność → Gantt
