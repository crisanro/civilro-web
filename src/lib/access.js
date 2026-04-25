export const NIVELES = {
  FREE: 0,
  COMUNIDAD: 1,
  UNIVERSIDAD: 2,
  PRO: 3,
};

export function tieneAcceso(planUsuario, planRequerido) {
  return NIVELES[planUsuario] >= NIVELES[planRequerido];
}