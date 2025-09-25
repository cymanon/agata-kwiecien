import { Component, inject, Output, EventEmitter, effect } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { DataService } from '../../../../core/services/data-service';

@Component({
  selector: 'app-post-filters-component',
  imports: [ReactiveFormsModule],
  templateUrl: './post-filters-component.html',
  host: {
    class:
      'w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-purple-100 mb-8',
  },
})
export class PostFiltersComponent {
  @Output() filterChange = new EventEmitter<{
    searchText: string;
    userId?: number;
    showOnlyFavorites: boolean;
  }>();

  private readonly dataService: DataService = inject(DataService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  users = this.dataService.users;

  userSearchControl = this.formBuilder.control('');

  form = this.formBuilder.group({
    search: [''],
    userId: [''],
    onlyFavorites: [false],
  });

  private formValues = toSignal(this.form.valueChanges, {
    initialValue: this.form.value,
  });

  constructor() {
    effect(() => {
      const values = this.formValues();
      this.filterChange.emit({
        searchText: values.search || '',
        userId: values.userId ? +values.userId : undefined,
        showOnlyFavorites: values.onlyFavorites || false,
      });
    });
  }
}
