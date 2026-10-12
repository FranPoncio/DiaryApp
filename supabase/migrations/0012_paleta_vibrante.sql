-- Paleta nueva para las 8 categorías de fábrica: de tierras cálidas a colores
-- vivos y fríos, para acompañar el cambio de identidad de la app (ver
-- `src/styles.css`). Los valores nuevos son los mismos que `RUBROS` en
-- `src/lib/gastos`: si cambia uno, cambia el otro.
--
-- Solo toca una categoría si todavía tiene el color de fábrica de la 0008. Si
-- alguien la recoloreó a mano desde la app, se respeta: se compara por clave Y
-- por color, no solo por clave.
update rubros r
   set color = n.nuevo
  from (values
    ('casa',       '#B8541F', '#7C5CFF'),
    ('comida',     '#02836F', '#1FD6A4'),
    ('estudio',    '#B98418', '#3DA5FF'),
    ('tramites',   '#7A5091', '#C86BFF'),
    ('salidas',    '#7A9A2E', '#FF4FA3'),
    ('transporte', '#AD4F5E', '#22D3EE'),
    ('setup',      '#3A6FD1', '#5B7CFF'),
    ('otros',      '#A63D33', '#8B97B8')
  ) as n(clave, viejo, nuevo)
 where r.clave = n.clave
   and upper(r.color) = upper(n.viejo);

-- Control: cuántas quedaron con el color de fábrica viejo. Tiene que dar 0 salvo
-- que alguien las haya recoloreado a mano (en ese caso no se tocan a propósito).
select count(*) as con_color_viejo
  from rubros
 where (clave, upper(color)) in (
   ('casa','#B8541F'),('comida','#02836F'),('estudio','#B98418'),('tramites','#7A5091'),
   ('salidas','#7A9A2E'),('transporte','#AD4F5E'),('setup','#3A6FD1'),('otros','#A63D33'));
