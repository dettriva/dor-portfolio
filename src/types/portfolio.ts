export interface ProjectCard {
  title: string
  description: string
  link: string
  tags?: string[]
}

export interface SkillCard {
  name: string
  description: string
  icon?: string          // PrimeIcons (pi pi-*)
  level: number          // 0..100 ← NÚMERO
  whereUsed?: string
  categories?: string[]  // Añadido para filtros
}
