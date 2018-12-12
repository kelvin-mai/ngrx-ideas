import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Idea, IdeaDTO } from '@app/models/idea';
import { validateWhitespace } from '@app/utilities/validators';

@Component({
  selector: 'app-idea-editable',
  templateUrl: './idea-editable.component.html',
  styleUrls: ['./idea-editable.component.scss']
})
export class IdeaEditableComponent implements OnInit, OnChanges {
  @Input()
  idea: Idea;

  @Output()
  onSubmit: EventEmitter<IdeaDTO> = new EventEmitter<IdeaDTO>();

  ideaForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges() {
    this.buildForm();
  }

  buildForm() {
    this.ideaForm = this.fb.group({
      idea: this.fb.control((this.idea && this.idea.idea) || '', [
        Validators.required,
        validateWhitespace
      ]),
      description: this.fb.control((this.idea && this.idea.description) || '', [
        Validators.required,
        validateWhitespace
      ])
    });
  }

  submit() {
    const sumbission: IdeaDTO = this.ideaForm.getRawValue();
    this.onSubmit.emit(sumbission);
  }
}
