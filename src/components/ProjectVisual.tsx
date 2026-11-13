import type { ProjectKind } from './projects-data'
import {
  FormVisual,
  LumenVisual,
  MeridianVisual,
  NocturneVisual,
} from './project-visuals'

export function ProjectVisual({ kind }: { kind: ProjectKind }) {
  switch (kind) {
    case 'lumen':
      return <LumenVisual />
    case 'meridian':
      return <MeridianVisual />
    case 'form':
      return <FormVisual />
    case 'nocturne':
      return <NocturneVisual />
  }
}
