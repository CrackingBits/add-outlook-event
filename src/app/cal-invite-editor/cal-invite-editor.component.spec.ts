import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { CalInviteEditorComponent, O365_BASE_URL } from './cal-invite-editor.component';

const DEFAULT_TEST_QUERY_PARAMS = {
  subject: 'TEST SUBJECT IN QUERY PARAMS',
  body: 'TEST QUERY PARAMS BODY <p>ščřžýáíé<a href="https://www.google.com">ĚŠČ</a>ŘŽÝÁÍÉ</p>',
  location: 'TEST LOCATION IN QUERY PARAMS',
  startdt: '2020-10-11T01:12',
  enddt: '2020-10-11T14:00'
};

describe('CalInviteEditorComponent', () => {
  let component: CalInviteEditorComponent;
  let fixture: ComponentFixture<CalInviteEditorComponent>;

  class ActivatedRouteMock {
    queryParams = new Observable(observer => {
       observer.next(DEFAULT_TEST_QUERY_PARAMS);
       observer.complete();
    });
 }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ],
      declarations: [ CalInviteEditorComponent ],
      providers: [
        ControlContainer,
         {
            provide: ActivatedRoute,
            useClass: ActivatedRouteMock
         }
      ]
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

  it('should read queryParams', () => {
    expect(component.eventDetailsForm.value.subject).toEqual(DEFAULT_TEST_QUERY_PARAMS.subject);
    expect(component.eventDetailsForm.value.body).toEqual(DEFAULT_TEST_QUERY_PARAMS.body);
    expect(component.eventDetailsForm.value.location).toEqual(DEFAULT_TEST_QUERY_PARAMS.location);
    expect(component.eventDetailsForm.value.startdt).toEqual(DEFAULT_TEST_QUERY_PARAMS.startdt);
    expect(component.eventDetailsForm.value.enddt).toEqual(DEFAULT_TEST_QUERY_PARAMS.enddt);
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
    component.eventDetailsForm.value.subject = 'TEST SUBJECT';
    component.eventDetailsForm.value.body = 'TEST BODY <p>ščřžýáíé<a href="https://www.google.com">ĚŠČ</a>ŘŽÝÁÍÉ</p>';
    component.eventDetailsForm.value.location = 'TEST LOCATION';
    component.eventDetailsForm.value.startdt = '2021-12-18T12:34';
    component.eventDetailsForm.value.enddt = '2021-12-18T13:45';

    component.onSubmit();

    expect(component.generatedURL).toEqual(O365_BASE_URL
        + '/compose'
        + '?subject=' + encodeURIComponent(component.eventDetailsForm.value.subject)
        + '&body=' + encodeURIComponent(component.eventDetailsForm.value.body)
        + '&location=' + encodeURIComponent(component.eventDetailsForm.value.location)
        + '&startdt=' + encodeURIComponent(component.eventDetailsForm.value.startdt)
        + '&enddt=' + encodeURIComponent(component.eventDetailsForm.value.enddt));

    expect(component.shareURL).toEqual('/'
        + '?subject=' + encodeURIComponent(component.eventDetailsForm.value.subject)
        + '&body=' + encodeURIComponent(component.eventDetailsForm.value.body)
        + '&location=' + encodeURIComponent(component.eventDetailsForm.value.location)
        + '&startdt=' + encodeURIComponent(component.eventDetailsForm.value.startdt)
        + '&enddt=' + encodeURIComponent(component.eventDetailsForm.value.enddt));
  });

  it('sould erase string on reset', () => {
    component.eventDetailsForm.value.subject = 'TEST SUBJECT';
    component.eventDetailsForm.value.body = 'TEST BODY <p>ščřžýáíé<a href="https://www.google.com">ĚŠČ</a>ŘŽÝÁÍÉ</p>';
    component.eventDetailsForm.value.location = 'TEST LOCATION';
    component.eventDetailsForm.value.startdt = '2021-12-18T12:34';
    component.eventDetailsForm.value.enddt = '2021-12-18T13:45';

    component.onSubmit();

    component.onResetForm();

    expect(component.generatedURL).toEqual('');
    expect(component.shareURL).toEqual('');
  });
});
