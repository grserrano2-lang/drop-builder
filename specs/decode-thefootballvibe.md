# Decode — thefootballvibe.com (tienda de referencia)

> Salida de la skill `analizar-competidor`. Análisis con fuentes legítimas
> (navegación pública del propio sitio). Sin scraping ni evasión de ToS.

## Veredicto
`thefootballvibe.com` valida el playbook de Drop Builder casi punto por punto.
**Está construido sobre Base44** (la meta del sitio describe "managing 5 data
types including products… organize, track and share your work in 1 place" — es
la huella de una app Base44). Es decir: la tienda de referencia usa exactamente
el stack que tu prompt maestro propone. Replicamos el SISTEMA, no la tienda.

## Modelo decodificado
| Pieza | Lo que hace la referencia | Cómo lo replicamos |
|---|---|---|
| **Storefront** | Catálogo amplio de camisetas por liga/selección, retro, portero, mujer, chándales, botas, accesorios | Base44 storefront (skill `spec-base44`), parametrizado por nicho |
| **Programa de creadores** | Páginas individuales por colaborador: Ekaitz, Jotha, Karim, Lucas, Macias, Max, Patri, Tuti | Plataforma de afiliados en Base44 (skill `plataforma-afiliados`): registro→código→página pública→dashboard |
| **Motor SEO** | ~70+ artículos de blog long-tail: "Cómo lavar camiseta", "Detectar fakes", "Historia dorsal 10", "Tejido Vaporknit", "Cómo posar fotos" | Bot SEO de Cowork + skill de contenido; clusters por intención |
| **Multi-idioma** | URLs en español, estructura localizable | Parametrizar idioma por mercado de cada tienda |
| **Checkout** | Páginas de éxito/cancelado de pago presentes | Pasarela conectada por el humano (guardrail) |

## Ángulos de contenido SEO que funcionan (a replicar por nicho)
La referencia ataca 5 intenciones que cualquier nicho puede calcar:
1. **Cuidado/mantenimiento** del producto ("cómo lavar…").
2. **Autenticidad / detectar falsificaciones** (genera confianza + tráfico).
3. **Historia/cultura** alrededor del producto (engagement + long-tail).
4. **Estilo/uso** ("cómo combinar/posar/usar…").
5. **Educación de material/tecnología** del producto.
→ Estas 5 plantillas de artículo son reutilizables en CUALQUIER tienda.

## Lo que NO se pudo ver (rellenar al revisar el sitio en vivo)
Precios, bundles/upsells, señales de confianza (reseñas, garantías, promesas de
envío), captura de email/popups y proveedor de pago no eran visibles en el render
público analizado. **Acción:** revisar fichas de producto y checkout en vivo para
extraer rango de precio, mecánica de upsell y stack de pago antes de fijar el
modelo de margen (skill `research-producto`).

## Implicaciones para nuestro motor
1. **Base44 es la elección correcta** para storefront + afiliados: hay una tienda
   real facturando con ese stack.
2. El **programa de colaboradores con página propia por creador** es el corazón
   del canal de tráfico → priorizar `plataforma-afiliados` en el primer build.
3. El **blog SEO es un foso defensivo** barato → el bot de artículos de Cowork no
   es opcional, es parte del motor desde el día uno.
4. Nicho de la referencia (camisetas de fútbol) tiene **riesgo de IP/marca alto**
   (réplicas de clubes/marcas). Para NUESTRAS tiendas: gate `compliance-legal`
   obligatorio, solo producto legítimo sin infracción.
