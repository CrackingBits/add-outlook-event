import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Helper from './helper';

export const O365_BASE_URL = 'https://outlook.office.com/calendar/deeplink';
export const DEFAULT_QUERY_PARAMS = {
  subject: 'Title',
  to: 'john.doe@example.com, johny@fakedomain.org',
  cc: '',
  body: '<p>Body<br> <br> URL example: <a href="https://www.google.com">Google</a></p>',
  location: 'Location',
  startdt: Helper.convertToLocalIso(new Date()),
  enddt: Helper.convertToLocalIso(new Date(Date.now() + 60 * 60 * 1000)),
  online: false,
  allday: false
};

@Component({
  selector: 'app-cal-invite-editor',
  templateUrl: './cal-invite-editor.component.html',
  styleUrls: ['./cal-invite-editor.component.scss'],
})
export class CalInviteEditorComponent implements OnInit {
  generatedURL = '';
  shareURL = '';
  showOptional = false;
  eventDetailsForm = new UntypedFormGroup({
    subject: new UntypedFormControl(''),
    to: new UntypedFormControl(''),
    cc: new UntypedFormControl(''),
    body: new UntypedFormControl(''),
    location: new UntypedFormControl(''),
    startdt: new UntypedFormControl(''),
    enddt: new UntypedFormControl(''),
    online: new UntypedFormControl(''),
    allday: new UntypedFormControl('')
  });

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.cleanURLs();
    this.route.queryParams.subscribe((params) => {
      this.eventDetailsForm.patchValue({
        subject: (params.subject !== undefined) ? params.subject : DEFAULT_QUERY_PARAMS.subject,
        to: (params.to !== undefined) ? params.to : DEFAULT_QUERY_PARAMS.to,
        cc: (params.cc !== undefined) ? params.cc : DEFAULT_QUERY_PARAMS.cc,
        body: (params.body !== undefined) ? params.body : DEFAULT_QUERY_PARAMS.body,
        location: (params.location !== undefined) ? params.location : DEFAULT_QUERY_PARAMS.location,
        startdt: (params.startdt !== undefined) ? params.startdt : DEFAULT_QUERY_PARAMS.startdt,
        enddt: (params.enddt !== undefined) ? params.enddt : DEFAULT_QUERY_PARAMS.enddt,
        online: (params.online !== undefined) ? params.online : DEFAULT_QUERY_PARAMS.online,
        allday: (params.allday !== undefined) ? params.allday : DEFAULT_QUERY_PARAMS.allday,
      });

      this.showOptional = (this.eventDetailsForm.value.cc?.length > 0);
    });
  }

  onSubmit() {
    this.prepareURLs();
  }

  onResetForm() {
    this.cleanURLs();
    this.eventDetailsForm.patchValue({
      subject: '',
      to: '',
      cc: '',
      body: '',
      location: '',
      startdt: '',
      enddt: '',
      online: false,
      allday: false
    });
    this.router.navigate([]);
  }

  private prepareURLs() {
    const queryParams =
      '?subject=' + encodeURIComponent(this.eventDetailsForm.value.subject) +
      '&to=' + encodeURIComponent(this.eventDetailsForm.value.to) +
      '&cc=' + encodeURIComponent(this.eventDetailsForm.value.cc) +
      '&body=' + encodeURIComponent(this.eventDetailsForm.value.body) +
      '&location=' + encodeURIComponent(this.eventDetailsForm.value.location) +
      '&startdt=' + encodeURIComponent(this.eventDetailsForm.value.startdt) +
      '&enddt=' + encodeURIComponent(this.eventDetailsForm.value.enddt) +
      (this.eventDetailsForm.value.online ? '&online=true' : '') +
      (this.eventDetailsForm.value.allday ? '&allday=true' : '');

    this.generatedURL = O365_BASE_URL + '/compose' + queryParams + '&path=/calendar/action/compose&rru=addevent';
    this.shareURL = window.location.protocol + '//' + window.location.host + '/' + queryParams;
  }

  private cleanURLs() {
    this.generatedURL = '';
    this.shareURL = '';
  }
}
