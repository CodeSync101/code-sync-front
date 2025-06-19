import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/models/Task';
import { AuthorService } from 'src/app/services/author.service';
import { BranchService } from 'src/app/services/branch.service';
import { TaskService } from 'src/app/services/task.service';

interface Branch {
  id: number;
  name: string;
}

interface Author {
  id: number;
  name: string;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  repoName: string = '';
  tasks: Task[] = [];

  selectedTask: Task | null = null;


  showCreateTask: boolean = false;

  branches: Branch[] = [];
  authors: Author[] = [];




showDeleteConfirm = false;
taskToDelete: any = null;

  newTask = {
    title: '',
    description: '',
    branchName: '',
    authorId: 0,
    status: 'TO_DO'
  };


  constructor(private route: ActivatedRoute, private taskService: TaskService, private branchService: BranchService,private authorService: AuthorService) {}

  ngOnInit() {
    this.repoName = this.route.snapshot.paramMap.get('repoName')!;
    this.taskService.getTasksByRepo(this.repoName).subscribe({
      next: (data) => (this.tasks = data),
      error: (err) => console.error('Erreur chargement tâches', err)
    }); 
  }



  

    openCreateTask() {
    this.showCreateTask = true;

    // charger branches et authors à chaque ouverture pour être à jour
    this.branchService.getBranches(this.repoName).subscribe({
      next: (data) => this.branches = data,
      error: (err) => console.error('Erreur chargement branches', err)
    });

    this.authorService.getAllAuthors().subscribe({
      next: (data) => this.authors = data,
      error: (err) => console.error('Erreur chargement authors', err)
    });
  }

  closeCreateTask() {
    this.showCreateTask = false;
    // reset form
    this.newTask = {
      title: '',
      description: '',
      branchName: '',
      authorId: 0,
      status: 'TO_DO'
    };
  }

    

  createTask() {
    // Construire objet à envoyer (adapter selon entité backend)
  const selectedAuthor = this.authors.find(a => a.id === +this.newTask.authorId);


    const taskToCreate = {
      name: this.newTask.title,
      description: this.newTask.description,
      branchName: this.newTask.branchName,
      author: selectedAuthor ? selectedAuthor.name : '',  // envoi le nom, pas l'id
      status: this.newTask.status,
      repositoryName: this.repoName
    };

      console.log('Objet envoyé pour création de tâche:', taskToCreate); // <--- Ici

    this.taskService.createTask(taskToCreate).subscribe({
      next: (createdTask) => {
        this.tasks.push(createdTask); // ajout direct à la liste
      
        this.closeCreateTask();
      },
      error: (err) => console.error('Erreur création tâche', err)
    });
  }


  editTask(task: Task) {
  this.selectedTask = { ...task }; // clone
  this.showCreateTask = false;

  // charger données de formulaire
  this.branchService.getBranches(this.repoName).subscribe({
    next: (data) => this.branches = data
  });

  this.authorService.getAllAuthors().subscribe({
    next: (data) => this.authors = data
  });
}




updateTask() {
  if (!this.selectedTask) return;

  this.taskService.updateTask(this.selectedTask.id!, this.selectedTask).subscribe({
    next: (updated) => {
      const index = this.tasks.findIndex(t => t.id === updated.id);
      if (index !== -1) this.tasks[index] = updated;
      this.selectedTask = null;
    },
    error: (err) => console.error('Erreur mise à jour tâche', err)
  });
}
deleteTask() {
  if (!this.selectedTask) return;
  
  // Stocker la tâche à supprimer et afficher la confirmation
  this.taskToDelete = this.selectedTask;
  this.showDeleteConfirm = true;
}

// Nouvelle méthode pour confirmer la suppression
confirmDeleteTask() {
  if (!this.taskToDelete) return;

  this.taskService.deleteTask(this.taskToDelete.id!).subscribe({
    next: () => {
      this.tasks = this.tasks.filter(t => t.id !== this.taskToDelete?.id);
      this.selectedTask = null;
      this.cancelDelete(); // Fermer le popup
    },
    error: (err) => {
      console.error('Erreur suppression tâche', err);
      this.cancelDelete(); // Fermer le popup même en cas d'erreur
    }
  });
}

// Méthode pour annuler la suppression
cancelDelete() {
  this.showDeleteConfirm = false;
  this.taskToDelete = null;
}

getTasksByStatus(status: 'TO_DO' | 'IN_PROGRESS' | 'DONE'): Task[] {
  return this.tasks.filter(task => task.status === status);
}

}
