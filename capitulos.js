// Lista de capítulos. La leen index.html (portadas y lista) y leer.html (el lector).
// titulo / nombre: "Chapter 1" y el título del capítulo
// temporada: sirve para el filtro de la sección Read
// fecha: AAAA-MM-DD (si es de hace menos de 14 días sale NEW)
// proximo: true = todavía no publicado
// carpeta: carpeta con las páginas, por ejemplo "cap1" -> cap1/01.jpg, cap1/02.jpg...
// paginas: cuántas páginas hay (un número). Si no están numeradas, pon una lista: ["a.jpg","b.jpg"]
// ext: extensión de las páginas (jpg por defecto)
// enlace: leer.html?c=0 (el 0 es el primer capítulo, el 1 el segundo...). Si lo lees en otra web, pon su dirección
// img: portada del capítulo (opcional)
const capitulos = [
  {titulo:"Chapter 1", nombre:"Chapter title", temporada:"Season 1", fecha:"2026-09-12", enlace:"leer.html?c=0", carpeta:"cap1", paginas:0, ext:"jpg", img:"", sinopsis:"One or two spoiler-free sentences that make readers want to start."},
  {titulo:"Chapter 2", nombre:"Chapter title", temporada:"Season 1", fecha:"2026-09-26", enlace:"leer.html?c=1", carpeta:"cap2", paginas:0, ext:"jpg", img:"", sinopsis:"One or two spoiler-free sentences that make readers want to start."},
  {titulo:"Chapter 3", nombre:"Chapter title", temporada:"Season 1", fecha:"2026-10-07", enlace:"leer.html?c=2", carpeta:"cap3", paginas:0, ext:"jpg", img:"", sinopsis:"One or two spoiler-free sentences that make readers want to start."},
  {titulo:"Chapter 4", nombre:"Chapter title", temporada:"Season 1", fecha:"2026-10-21", enlace:"#", proximo:true}
];
