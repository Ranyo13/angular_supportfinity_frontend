import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
  myForm: FormGroup;
  myControl = new FormControl();
  skills: string[] = ['C++', 'python', 'Java', 'Matlab', 'Git', 'VsCode', 'Data structures', 'Communications skills'];
  filteredOptions: Observable<string[]>;
  filteredOptionsTwo: Observable<string[]>;
  filteredOptionsThree: Observable<string[]>;
  constructor(private fb: FormBuilder) {
   }

  ngOnInit(): void {
    // let formValue = JSON.parse(localStorage.getItem('form-data'));
    // if(formValue)
    // {
    //   this.myForm = formValue;
    // }
    // else
    // {
     
      
      this.myForm = this.fb.group({
        firstName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(2), Validators.maxLength(20)])],
        lastName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(2), Validators.maxLength(20)])],
        skillOne: ['', this.skillValidator],
        skillTwo: ['', this.skillValidator],
        skillThree: ['', this.skillValidator]
      }, {validator: this.unmatchingSkills('skillOne', 'skillTwo', 'skillThree')})
    this.filteredOptions = this.myForm.get('skillOne').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    )
    this.filteredOptionsTwo = this.myForm.get('skillTwo').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    )
    this.filteredOptionsThree = this.myForm.get('skillThree').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    )
    let formValue = JSON.parse(localStorage.getItem('form-data'));
    if(formValue)
    {
      if(formValue.firstName)
        this.myForm.controls.firstName.setValue(formValue.firstName);
      if(formValue.lastName)
        this.myForm.controls.lastName.setValue(formValue.lastName);
      if(formValue.skillOne)
        this.myForm.controls.skillOne.setValue(formValue.skillOne);
      if(formValue.skillTwo)
        this.myForm.controls.skillTwo.setValue(formValue.skillTwo);
      if(formValue.skillThree)
        this.myForm.controls.skillThree.setValue(formValue.skillThree);
        
    }
    console.log(JSON.parse(localStorage.getItem('form-data')));
  }

  private _filter(value: string):string[]{
    const filterValue = value.toLowerCase();
    return this.skills.filter(skill => skill.toLowerCase().indexOf(filterValue) === 0);
  }

  unmatchingSkills(skillOneKey: string, skillTwoKey: string, skillThreeKey: string)
  {
      return (group: FormGroup): {[key: string]: any} => {
          let skillOne = group.controls[skillOneKey];
          let skillTwo = group.controls[skillTwoKey];
          let skillThree = group.controls[skillThreeKey];

          if(skillOne.value == skillTwo.value || skillOne.value == skillThree.value || skillTwo.value == skillThree.value){

              return {
                  matchingSkills: true
              }
          }
      }
  }

  skillValidator(control: FormControl): {[key: string]: any}
  {
          let channelArray: Array<string> = ['C++', 'python', 'Java', 'Matlab', 'Git', 'VsCode', 'Data structures', 'Communications skills'];
          if(!channelArray.includes(control.value))
          {
            return { invalidSkill: true};
          }
  }

  Submit()
  {
    localStorage.setItem('form-data', JSON.stringify(this.myForm.value));

  }
}
