import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { CalInviteEditorComponent, O365_BASE_URL } from './cal-invite-editor.component';

const DEFAULT_TEST_QUERY_PARAMS = {
  subject: 'TEST SUBJECT IN QUERY PARAMS',
  to: 'john.doe@example.com',
  cc: 'johny@fakedomain.org',
  body: 'TEST QUERY PARAMS BODY <p>ščřžýáíé<a href="https://www.google.com">ĚŠČ</a>ŘŽÝÁÍÉ</p>',
  location: 'TEST LOCATION IN QUERY PARAMS',
  startdt: '2020-10-11T01:12',
  enddt: '2020-10-11T14:00',
  online: false,
  allday: false
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
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatNativeDateModule,
        MatCardModule,
        MatButtonModule,
        MatSlideToggleModule
      ],
      declarations: [CalInviteEditorComponent],
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
    expect(component.eventDetailsForm.value.to).toEqual(DEFAULT_TEST_QUERY_PARAMS.to);
    expect(component.eventDetailsForm.value.cc).toEqual(DEFAULT_TEST_QUERY_PARAMS.cc);
    expect(component.eventDetailsForm.value.body).toEqual(DEFAULT_TEST_QUERY_PARAMS.body);
    expect(component.eventDetailsForm.value.location).toEqual(DEFAULT_TEST_QUERY_PARAMS.location);
    expect(component.eventDetailsForm.value.startdt).toEqual(DEFAULT_TEST_QUERY_PARAMS.startdt);
    expect(component.eventDetailsForm.value.online).toEqual(DEFAULT_TEST_QUERY_PARAMS.online);
    expect(component.eventDetailsForm.value.allday).toEqual(DEFAULT_TEST_QUERY_PARAMS.allday);
  });

  it('should render input elements', () => {
    const compiled = fixture.debugElement.nativeElement;

    const subject = compiled.querySelector('input[id="subject"]');
    const to = compiled.querySelector('input[id="to"]');
    const cc = compiled.querySelector('input[id="cc"]');
    const body = compiled.querySelector('textarea[id="body"]');
    const location = compiled.querySelector('input[id="location"]');
    const startdt = compiled.querySelector('input[id="startdt"]');
    const enddt = compiled.querySelector('input[id="enddt"]');
    const online = compiled.querySelector('input[id="online-input"]');
    const allday = compiled.querySelector('input[id="allday-input"]');

    expect(subject).toBeTruthy();
    expect(to).toBeTruthy();
    expect(cc).toBeTruthy();
    expect(body).toBeTruthy();
    expect(location).toBeTruthy();
    expect(startdt).toBeTruthy();
    expect(enddt).toBeTruthy();
    expect(online).toBeTruthy();
    expect(allday).toBeTruthy();
  });

  it('should submit correct', () => {
    component.eventDetailsForm.value.subject = 'TEST SUBJECT';
    component.eventDetailsForm.value.to = 'doe@example.com';
    component.eventDetailsForm.value.cc = 'john@fakedomain.org';
    component.eventDetailsForm.value.body = 'TEST BODY <p>ščřžýáíé<a href="https://www.google.com">ĚŠČ</a>ŘŽÝÁÍÉ</p>';
    component.eventDetailsForm.value.location = 'TEST LOCATION';
    component.eventDetailsForm.value.startdt = '2021-12-18T12:34';
    component.eventDetailsForm.value.enddt = '2021-12-18T13:45';
    component.eventDetailsForm.value.online = false;
    component.eventDetailsForm.value.allday = false;
    component.onSubmit();

    expect(component.generatedURL).toEqual(O365_BASE_URL
      + '/compose'
      + '?subject=' + encodeURIComponent(component.eventDetailsForm.value.subject)
      + '&to=' + encodeURIComponent(component.eventDetailsForm.value.to)
      + '&cc=' + encodeURIComponent(component.eventDetailsForm.value.cc)
      + '&body=' + encodeURIComponent(component.eventDetailsForm.value.body)
      + '&location=' + encodeURIComponent(component.eventDetailsForm.value.location)
      + '&startdt=' + encodeURIComponent(component.eventDetailsForm.value.startdt)
      + '&enddt=' + encodeURIComponent(component.eventDetailsForm.value.enddt)
      + (component.eventDetailsForm.value.online ? '&online=true' : '')
      + (component.eventDetailsForm.value.allday ? '&allday=true' : '')
      + '&path=/calendar/action/compose&rru=addevent');

    expect(component.shareURL).toEqual(window.location.protocol + '//' + window.location.host + '/'
      + '?subject=' + encodeURIComponent(component.eventDetailsForm.value.subject)
      + '&to=' + encodeURIComponent(component.eventDetailsForm.value.to)
      + '&cc=' + encodeURIComponent(component.eventDetailsForm.value.cc)
      + '&body=' + encodeURIComponent(component.eventDetailsForm.value.body)
      + '&location=' + encodeURIComponent(component.eventDetailsForm.value.location)
      + '&startdt=' + encodeURIComponent(component.eventDetailsForm.value.startdt)
      + '&enddt=' + encodeURIComponent(component.eventDetailsForm.value.enddt)
      + (component.eventDetailsForm.value.online ? '&online=true' : '')
      + (component.eventDetailsForm.value.allday ? '&allday=true' : ''));

  });

  it('should erase string on reset', () => {
    component.eventDetailsForm.value.subject = 'TEST SUBJECT';
    component.eventDetailsForm.value.to = 'TO';
    component.eventDetailsForm.value.cc = 'CC';
    component.eventDetailsForm.value.body = 'TEST BODY <p>ščřžýáíé<a href="https://www.google.com">ĚŠČ</a>ŘŽÝÁÍÉ</p>';
    component.eventDetailsForm.value.location = 'TEST LOCATION';
    component.eventDetailsForm.value.startdt = '2021-12-18T12:34';
    component.eventDetailsForm.value.enddt = '2021-12-18T13:45';
    component.eventDetailsForm.value.online = true;
    component.eventDetailsForm.value.allday = true;

    component.onSubmit();

    component.onResetForm();

    expect(component.generatedURL).toEqual('');
    expect(component.shareURL).toEqual('');
  });
});
