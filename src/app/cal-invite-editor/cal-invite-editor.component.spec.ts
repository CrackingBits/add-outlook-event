import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { CalInviteEditorComponent, O365_BASE_URL } from './cal-invite-editor.component';

describe('CalInviteEditorComponent', () => {
  let component: CalInviteEditorComponent;
  let fixture: ComponentFixture<CalInviteEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ],
      declarations: [ CalInviteEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalInviteEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input elements', () => {
    const compiled = fixture.debugElement.nativeElement;

    const subject = compiled.querySelector('input[id="subject"]');
    const body = compiled.querySelector('input[id="body"]');
    const location = compiled.querySelector('input[id="location"]');
    const startdt = compiled.querySelector('input[id="startdt"]');
    const enddt = compiled.querySelector('input[id="enddt"]');

    expect(subject).toBeTruthy();
    expect(body).toBeTruthy();
    expect(location).toBeTruthy();
    expect(startdt).toBeTruthy();
    expect(enddt).toBeTruthy();
  });

  it('should submit correct', () => {
    component.eventDetailsForm.value.subject = "TEST SUBJECT";
    component.eventDetailsForm.value.body = "TEST BODY <p>ščřžýáíé<a href=\"https://www.google.com\">ĚŠČ</a>ŘŽÝÁÍÉ</p>";
    component.eventDetailsForm.value.location = "TEST LOCATION";
    component.eventDetailsForm.value.startdt = "2021-12-18T12:34";
    component.eventDetailsForm.value.enddt = "2021-12-18T13:45";

    component.onSubmit();

    console.log(component.generatedURL);

    //expect(component.generatedURL).toBeTruthy();

    expect(component.generatedURL).toEqual(O365_BASE_URL
        + "/compose"
        + "?subject=" + encodeURIComponent(component.eventDetailsForm.value.subject)
        + "&body=" + encodeURIComponent(component.eventDetailsForm.value.body)
        + "&location=" + encodeURIComponent(component.eventDetailsForm.value.location)
        + "&startdt=" + encodeURIComponent(component.eventDetailsForm.value.startdt)
        + "&enddt=" + encodeURIComponent(component.eventDetailsForm.value.enddt));

    // Alternative way in Angular
    //  const tree = this.router.createUrlTree(['compose'], { queryParams });
    // this.generatedURL = 'https://outlook.office.com/calendar/deeplink' + this.serializer.serialize(tree);
  });
});
