import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-body-map',
  standalone: false,
  templateUrl: './body-map.component.html',
  styleUrl: './body-map.component.css'
})
export class BodyMapComponent {
  @Output() muscleGroupSelected = new EventEmitter<string>();

  selectedGroup: string | null = null;

  // Definición de grupos musculares y sus partes relacionadas
  muscleGroups: { [key: string]: { name: string, parts: string[] } } = {
    'pectorals': {
      name: 'Pectorales',
      parts: ['chest-left', 'chest-right']
    },
    'shoulders': {
      name: 'Hombros',
      parts: ['shoulder-left', 'shoulder-right', 'armback-left', 'armback-right']
    },
    'arms': {
      name: 'Brazos',
      parts: ['arm-left', 'arm-right', 'forearm-left', 'forearm-right', 'elbow-left', 'elbow-right']
    },
    'abs': {
      name: 'Abdominales',
      parts: ['belly', 'belly-left', 'belly-right', 'ribs-left', 'ribs-right']
    },
    'back': {
      name: 'Espalda',
      parts: ['back-left', 'back-right', 'column', 'loin']
    },
    'legs': {
      name: 'Piernas',
      parts: ['thigh-left', 'thigh-right', 'calf-left', 'calf-right', 'knee-left', 'knee-right']
    },
    'glutes': {
      name: 'Glúteos',
      parts: ['buttock']
    },
    'cardio': {
      name: 'Cardio',
      parts: [] // No hay partes específicas para cardio
    },
    'full-body': {
      name: 'Full Body',
      parts: [] // Todas las partes
    }
  };
  // Verifica si una parte pertenece al grupo seleccionado
  isPartOfSelectedGroup(partId: string): boolean {
    if (!this.selectedGroup) return false;
    return this.muscleGroups[this.selectedGroup].parts.includes(partId);
  }

  viewExercises(): void {
    if (!this.selectedGroup) return;

    // Emitir el grupo seleccionado al componente padre
    this.muscleGroupSelected.emit(this.selectedGroup);

    // Aquí puedes implementar la navegación o lógica para mostrar ejercicios
    console.log(`Mostrar ejercicios para: ${this.muscleGroups[this.selectedGroup].name}`);

    // Ejemplo de cómo podrías implementarlo:
    // this.router.navigate(['/exercises'], { queryParams: { muscleGroup: this.selectedGroup } });
  }
  // Selecciona un grupo muscular
  selectMuscleGroup(groupId: string): void {
    this.selectedGroup = groupId;
    this.muscleGroupSelected.emit(groupId);

    // Aquí puedes añadir lógica adicional cuando se selecciona un grupo
    console.log(`Grupo muscular seleccionado: ${this.muscleGroups[groupId].name}`);
  }

  // Obtiene el nombre del grupo muscular
  getGroupName(groupId: string): string {
    return this.muscleGroups[groupId]?.name || groupId;
  }
}