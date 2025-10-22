# Refleksion: Designudfordringer og CSS til Tailwind Migration

## Hovedudfordringer i Designprocessen

### 1. Komplekse Layout-strukturer

En af de største udfordringer var at implementere avancerede grid-layouts, især CSS Subgrid funktionalitet. I Team-komponenten (`src/components/team/Team.astro`) skulle jeg skabe et responsivt grid-system, hvor indholdet og billederne skulle dele samme grid-struktur.

**Standard CSS tilgang:**

```css
.team-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
}

.team-content {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: 1;
}
```

**Tailwind løsning:**
Da Tailwind ikke har native subgrid support, måtte jeg kombinere Tailwind classes med custom CSS i `overrides.css`:

```css
.team-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
    max-width: 64rem;
    margin: 0 auto;
    padding: 0 5rem;
}
```

Dette illustrerer en af Tailwind's begrænsninger - komplekse CSS features som subgrid kræver stadig custom CSS.

### 2. Komplekse Pseudo-elementer og Patterns

En særligt udfordrende del var at implementere de dekorative patterns med pseudo-elementer. I Contact-komponenten (`src/components/home/Contact.astro`) skulle jeg skabe et komplekst pattern med `::before` og `::after` pseudo-elementer.

**Standard CSS tilgang:**

```css
.pattern-bg::before {
    --square-count: 10;
    --square-size: 1.34rem;
    content: '';
    position: absolute;
    inset: -50px auto auto -50px;
    background: linear-gradient(135deg, #be965d, #976f40, ...);
    mask: var(--square-pattern) 0 0 / var(--_square-size) var(--_square-size);
}
```

**Tailwind løsning:**
Jeg måtte oversætte dette til en ekstremt lang Tailwind class-string:

```html
<div
    class="grid-cols-2 grid-rows-2 hidden md:grid w-[60%] h-full gap-5 place-self-center relative pattern-bg before:content-[''] before:absolute before:-z-10 before:-top-[30px] before:-right-[30px] before:w-[calc(10*1.34rem-0.67rem)] before:aspect-square before:bg-gradient-to-br before:from-[#BE965D] before:via-[#976F40] before:to-[#C99B61] before:via-[#F0BE7B] before:via-[#FFCB85] before:via-[#EEBC79] before:via-[#C0935B] before:to-[#976F40] after:content-[''] after:absolute after:-z-10 after:-left-4 after:-bottom-4 after:w-[150px] after:h-[100px] after:bg-green-500 after:rounded-[10px]"
></div>
```

Dette eksempel viser, hvordan komplekse designs kan resultere i ekstremt lange class-strings, hvilket kan gøre koden mindre læsbar.

### 3. Responsive Design og Breakpoints

Implementering af responsivt design var en balance mellem Tailwind's mobile-first tilgang og komplekse layout-krav. I Hero-komponenten (`src/components/home/Hero.astro`) skulle jeg skabe et layout, der fungerede på både mobile og desktop.

**Eksempel fra Hero-komponenten:**

```html
<section class="flex flex-col md:grid md:grid-cols-2 md:h-196 w-full">
    <div
        class="order-2 md:order-none md:col-span-1 grid-row-1 bg-neutral-900 text-white flex flex-row justify-center gap-5 items-center py-10 pb-25"
    ></div>
</section>
```

Her ser vi, hvordan jeg bruger Tailwind's responsive prefixes (`md:`) til at skabe forskellige layouts på forskellige skærmstørrelser.

### 4. Custom Properties og CSS Variabler

En udfordring var at integrere custom CSS properties med Tailwind. I `global.css` definerede jeg custom properties for fonts og patterns:

```css
@theme inline {
    --font-cabin: var(--font-cabin);
    --font-lato: var(--font-lato);
}

:root {
    --square-pattern: url('data:image/svg+xml,...');
}
```

Disse blev derefter brugt i komponenter gennem Tailwind's arbitrary value syntax:

```html
<div style="--square-pattern: url('data:image/svg+xml,...');"></div>
```

## Læringspunkter og Overvejelser

### Fordele ved Tailwind:

- Hurtigere udvikling af standard layouts
- Konsistent spacing og sizing system
- Responsive design er indbygget
- Utility-first tilgang reducerer CSS duplication

### Udfordringer ved Tailwind:

- Komplekse designs kan resultere i meget lange class-strings
- Nogle CSS features kræver stadig custom CSS
- Læsbarheden kan lide under lange class-lister
- Debugging kan være sværere end med traditionel CSS

## Konklusion

Migrationen fra standard CSS til Tailwind har været en proces med både fordele og udfordringer. Mens Tailwind excellerer i hurtig udvikling af standard layouts og responsive design, kræver komplekse designs stadig en hybrid tilgang, hvor custom CSS supplerer Tailwind's utility classes.
