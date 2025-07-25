# Posts Manager Frontend

Una aplicación React para gestión de posts construida con TypeScript, Redux Toolkit y Vite.

## Estructura Actual del Proyecto

El proyecto implementa una **arquitectura escalable basada en características (features)** donde los componentes se organizan por funcionalidad específica en lugar de por tipo de archivo. Esta estructura facilita el mantenimiento, mejora la colaboración en equipos y permite el crecimiento orgánico del proyecto, ya que cada feature (`posts/`, `forms/`) contiene sus propios componentes, con carpetas preparadas para hooks, tipos y utilidades específicas, mientras que los componentes reutilizables se centralizan en `common/`.


##  Estado Actual del Código

### Puntos Fuertes
- **Estructura escalable** organizada por características (features)
- **Redux Toolkit** bien implementado con slices y async thunks
- **Selectores memoizados** para optimización de rendimiento
- **TypeScript** con tipado fuerte
- **Organización por características** implementada y funcional
- **Hooks personalizados** para Redux ya implementados
- **Carpetas preparadas** para futuras expansiones

###  Áreas de Mejora Identificadas


### 1.  **Componentización Avanzada**

#### Problemas Actuales:
- `App.tsx` maneja múltiples responsabilidades (estado de formulario, scroll, etc.)
- `Posts.tsx` es muy extenso y maneja muchas funcionalidades
- `CreateEditForm.tsx` podría dividirse en subcomponentes

#### Solución Propuesta:
```
src/components/
├── Form/
│   ├── FormContainer/           # Container principal
│   ├── FormFields/             # Campos individuales
│   ├── FormActions/            # Botones de acción
│   └── FormToggle/             # Toggle del formulario
├── Posts/
│   ├── PostsList/              # Lista separada
│   ├── PostItem/               # Item individual optimizado
│   ├── PostActions/            # Acciones separadas
│   └── PostsContainer/         # Container principal
└── Layout/
    ├── AppHeader/              # Header separado
    ├── MainContent/            # Content wrapper
    └── Section/                # Componente de sección reutilizable
```

### 2. 🎣 **Hooks Personalizados**


#### Beneficios:
- **Separación de responsabilidades** entre lógica y UI
- **Reutilización** de lógica entre componentes
- **Testing más fácil** de la lógica de negocio
- **Componentes más limpios** y enfocados en rendering

### 3. 🎯 **Optimizaciones de Rendimiento**

#### Service:
 Se encuentra acoplado a posts, se puede desacoplar para permitir peticiones de otros features a futuro

#### Optimizaciones a nivel de React:
- **React.memo** para componentes puros (Post, Filter)
- **useCallback** para funciones de manejo de eventos
- **useMemo** para cálculos costosos si es necesario
- **Service Layer** mejorado y reutilizable para todas las features

