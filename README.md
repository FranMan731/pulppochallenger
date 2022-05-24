# Pulppo Code Challenge

Este es un proyecto hecho en next.js para candidatos a sumarse a Pulppo. **Este challenge está pensado para unas 2 horas. En caso de tardar más, ¡no te preocupes! Mandanos lo que hayas hecho en esas dos horas, es nuestra culpa y no queremos quitarte mucho de tu tiempo (estamos tratando de mejorar este challenge para que tenga la dificultad adecuada). No te juzgaremos por lo que no hayas llegado a hacer**

### Inicializar el proyecto

Primero, correr el servidor de desarrollo:

```bash
npm run dev
# or
yarn dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador para ver el resultado.

Para editar, puedes ir al archivo `pages/index.tsx` o `pages/search.tsx`. La página se actualizará sola al editar.

## Challenge

El challenge consistirá en hacer un buscador de inmuebles simple. Para eso, tendrás que editar la página `pages/search.tsx` para adaptarla a los siguientes requerimientos:

-   Cada vez que el usuario ingrese una letra, deberá consultar a la [API de pulppo de búsqueda](https://api.dev.pulppo.com/listings/search). Sin embargo, deberá implementar una estrategia de `debounce` de 300 ms. Esto quiere decir que, una vez que el usuario ingrese una letra deberá esperar 300ms. Si ninguna letra nueva es ingresada, deberá mandar la solicitud, en caso contrario, deberá esperar nuevamente 300 ms y repetir el proceso (esto es para no hacer llamadas inecesarias a la API cuando el usuario está tecleando rápidamente)
-   Para buscar, deberá pasar el valor por query params en el parámetro search (`?search={{termino_busqueda}}`). A su vez, podrá pasar tres parámtros más, `minPrice` y `maxPrice` para filtrar por precio y `propertyTypes` para filtrar por tipo de propiedad (Appartment, House, Office, Land y Fincas, se pasa más de uno separados por coma o uno solo). Se deberán implementar esos filtros de precio y tipo de propiedad al hacer click en el botón de filtros
-   Los resultados deberán mostrarse en el div con class results. Queda a discresión del postulante, la forma en que se mostrarán. **Sumará si se implementa paginación, pero no es obligatorio (en caso contrario mostrar sólo la primera página)**

Se tomará en cuenta estructura de archivos, manejo de css y de git y organización en general.

## Entrega

Se deberá enviar el link del repositorio de github a [hernan@pulppo.com](mailto:hernan@pulppo.com)
